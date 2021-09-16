---
layout: post
title: A simple ruby web server
---

Let's see just how easy it can be to build a simple web server in Ruby. This post is targeted at those who've spent a lot of their career building web applications using frameworks like Ruby on Rails and have been wondering how it works under the hood.

## Receiving HTTP

A web server needs to be able to receive [HTTP][http] requests and respond to them, often with a mix of HTML, CSS, and JavaScript. We'll build up to that, but lets first start with a server that can _just_ receive HTTP requests. At this point, it won't even respond with anything useful yet, so it will still look broken when we visit it in the web server.

```ruby
# web_server.rb
require 'socket'

class WebServer
  HOST = '127.0.0.1'
  PORT = 8000
  MAX_REQUEST_SIZE = 1024

  def serve
    server = TCPServer.new HOST, PORT
    puts "[INFO] Accepting connections at http://#{HOST}:#{PORT}"
    puts '[INFO] Exit this program with CTRL-C'

    loop do
      connection = server.accept
      request = connection.recv MAX_REQUEST_SIZE
      puts request
      connection.close
    end
  end
end

WebServer.new.serve
```

We've used Ruby's socket library to create a new [`TPCServer`][tcpserver-rdoc] instance that's listening on port `8000` for new requests. Right after that we enter an infinite loop that just "accepts" a new connection, "receives" a message from it, outputs that message, and then closes the connection.

You can try this out for yourself, it really works! Save that to a file called `web_server.rb` and run it in your terminal with `ruby web_server.rb`. The server will listen for requests at http://127.0.0.1:8000 If you visit this address in your browser, it still won't show you anything useful yet but what _is_ useful is the logs you'll see in your terminal.

Essentially we've created a server that doesn't care what you sent, it just immediately hangs up on you. Why would we want that? It's useful because it lets us _see_ exactly what an HTTP request looks like. Check it out in your terminal now, it'll look something like this:

```
GET / HTTP/1.1
Host: 127.0.0.1:8000
Connection: keep-alive
Cache-Control: max-age=0
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
```

That's HTTP! You can see some content in it that you might be familiar with from working on web applications. The "/" is the path, if you tried going to http://127.0.0.1:8000/hello instead, you'd see `/hello` in this place in the logs. We'll use this later in a method that will let us choose which response to send based on the path the user asked for.

You can also see some key-value pairs separated by colons, like `Connection: keep-alive`; these are headers. They'll provide additional information about the request like cookies, or which browser the user is using.

In order for any of this information to be useful we're going to have to parse it to extract the details, but first lets turn our attention to sending an HTTP _response_ so that the user actually gets some content back.

## Responding with HTTP

In order to send content back from our server, we're going to make use of `connection.puts`, just like how we used `connection.recv` to receive content from the user. We'll start by just responding with some static text: "Hello World", and we'll use the [HTTP Response spec][http-response-spec] to format it. We'll look at the code first and then break down the spec.

```ruby
# web_server.rb
require 'socket'

class WebServer
  HOST = '127.0.0.1'
  PORT = 8000
  MAX_REQUEST_SIZE = 1024

  def initialize
    @server = TCPServer.new HOST, PORT
  end

  def response
    response_body = 'Hello World!'
    <<~EOF
      HTTP/1.1 200 OK
      Content-Type: text/plain
      Content-Length: #{response_body.length}

      #{response_body}
    EOF
  end

  def serve
    puts "[INFO] Accepting connections at http://#{HOST}:#{PORT}"
    puts '[INFO] Exit this program with CTRL-C'

    loop do
      connection = @server.accept
      request = connection.recv MAX_REQUEST_SIZE
      puts request
      connection.puts response
      connection.close
    end
  end
end

WebServer.new.serve
```

We've broken up the `WebServer` class a little bit by storing the `TCPServer` instance in a `@server` instance variable, and we've introduced a new method called `response` which will just return a static string. Then in the `serve` method, we're sending the `response` value back on the connection.

Try replacing the previous `web_server.rb` with this one and run it again with `ruby web_server.rb`. Now when we visit http://127.0.0.1:8000 in the browser, we get content!

Let's break down the `response` method a bit:

```ruby
def response
  response_body = 'Hello World!'
  <<~EOF
    HTTP/1.1 200 OK
    Content-Type: text/plain
    Content-Length: #{response_body.length}

    #{response_body}
  EOF
end
```

We're creating the actual body of the response as "Hello World!" and then we're packaging it up in this larger string. It starts with `HTTP/1.1 200 OK`, then there's a line about "content type", then "content length" makes use of the length of our body, and then we put the body itself at the very end.

This is the [HTTP Response spec][http-response-spec] at work. As far as specs go, it's relatively short and straightforward and says that a response looks like this:

```
Response      = Status-Line
                *(( general-header
                | response-header
                | entity-header ) CRLF)
                CRLF
                [ message-body ]

Status-Line = HTTP-Version SP Status-Code SP Reason-Phrase
```

In plain English, this is telling us that every response looks something like this:

- A status line consisting of:
  - The HTTP version, eg. `HTTP/1.1`
  - The status code, eg. `200`
  - The "reason phrase", eg. "OK" for 200 or "Not Found" for 404
- 0 or more "Header" lines that look like `Key: Value`
- A blank line
- The message body itself

That's all it takes to send a valid HTTP response. In ours we also acted as good citizens by telling the browser which content type to expect, in this case "text/plain" indicating that we're just sending it plain text. We also told it how long the content was, and we were a little clever here because we came up with the number dynamically instead of hard-coding it. This means that you can change up that `Hello World!` string, restart the server, and you'll see your new content being displayed.

Now that we can receive HTTP and we can send it in response, we've officially got a web server! It's that easy. Of course it's not particularly useful yet, for that we're going to need to understand what the user actually _wanted_.

## Parsing HTTP

The users are sending us HTTP requests, and if we want to be able to return any kind of meaningful content we're going to have to know what they wanted, and for that we're going to need to parse HTTP requests. The [HTTP Request spec][http-request-spec] looks a lot like the response spec that we looked at previously. It looks like this:

```
Request       = Request-Line
                *(( general-header
                  | request-header
                  | entity-header ) CRLF)
                CRLF
                [ message-body ]

Request-Line   = Method SP Request-URI SP HTTP-Version CRLF
```

Just like the response, it also starts with a special line (this one called the "Request Line"), some optional header lines, a blank line, and then the message body. Simple requests like the one that our web browser is sending don't contain a message body, so we can ignore that part for the moment. We'll focus mainly on the "Request Line" which is composed of method, URI, and HTTP Version.

We saw the version previously (`HTTP/1.1`) and the method and URI will both likely look familiar. In the case of the logs we've been seeing from our `web_server.rb`, the method is `GET` and the URI is `/`. URI stands for ["Uniform Resource Identifier"][uri-definition] and we'll usually refer to it colloquially as the "path".

Let's parse it and store the stuff that we get in a hash.

```ruby
# web_server.rb
require 'socket'

class WebServer
  HOST = '127.0.0.1'
  PORT = 8000
  MAX_REQUEST_SIZE = 1024

  def initialize
    @server = TCPServer.new HOST, PORT
  end

  def parse_request(request_http)
    lines = request_http.split("\n")

    request_line = lines.shift
    method, path, version = request_line.split

    headers = {}
    loop do
      line = lines.shift
      break if line =~ /^\s*$/

      key, value = line.split(':', 2)
      headers[key] = value.strip
    end

    body = lines.join("\n")

    {
      'method' => method,
      'path' => path,
      'version' => version,
      'headers' => headers,
      'body' => body,
    }
  end

  def prepare_response(request)
    response_body = "Hello World!\n#{request}"
    <<~EOF
      HTTP/1.1 200 OK
      Content-Type: text/plain
      Content-Length: #{response_body.length}

      #{response_body}
    EOF
  end

  def serve
    puts "[INFO] Accepting connections at http://#{HOST}:#{PORT}"
    puts '[INFO] Exit this program with CTRL-C'

    loop do
      connection = @server.accept
      request_http = connection.recv MAX_REQUEST_SIZE
      request = parse_request(request_http)
      puts request
      connection.puts prepare_response(request)
      connection.close
    end
  end
end

WebServer.new.serve
```

The important part here is the `parse_request` method, but it's also worth noting that we've changed the `response` method to `prepare_response` and we give it the `request` hash that we've parsed out of the HTTP.

This parsing method lets us break down the HTTP textual format into the main parts that we've been talking about like paths, headers, and body. It lets us create something of a "request object" that we can actually start to use within our code. When you've built web applications in the past you've likely made use of a similar request object when getting at the headers or query parameters that were sent.

By passing the request object to our `prepare_response` method it's starting to look more like the web applications that you've worked with in the past that can _do_ something based on which request was sent. In this next step, we're going to split our web server into two parts to make this move towards web applications even clearer.

## Introducing a Web Application

This will be the biggest step yet: we'll split `web_server.rb` and pull out a bit of the behaviour into a new `web_application.rb` script. We'll still call it the same way with `ruby web_server.rb` but now the `WebServer` will only be concerned with parsing requests and formatting responses, while we're going to make the new `WebApplication` responsible for figuring out what to _do_ with those requests.

```ruby
# web_server.rb
require 'socket'
require_relative 'web_application'

class WebServer
  HOST = '127.0.0.1'
  PORT = 8000
  MAX_REQUEST_SIZE = 1024
  STATUS_REASON_PHRASES = {
    200 => 'OK',
    404 => 'Not Found'
  }

  def initialize
    @server = TCPServer.new HOST, PORT
    @web_application = WebApplication.new
  end

  def parse_request(request_http)
    lines = request_http.split("\n")

    request_line = lines.shift
    method, path, version = request_line.split

    headers = {}
    loop do
      line = lines.shift
      break if line =~ /^\s*$/

      key, value = line.split(':', 2)
      headers[key] = value.strip
    end

    body = lines.join("\n")

    {
      'method' => method,
      'path' => path,
      'version' => version,
      'headers' => headers,
      'body' => body,
    }
  end

  def prepare_response(status, headers, body)
    status_reason_phrase = STATUS_REASON_PHRASES[status]
    header_lines = headers.map { |key, value| "#{key}: #{value}" }
    <<~EOF
      HTTP/1.1 #{status} #{status_reason_phrase}
      #{header_lines.join("\n")}

      #{body}
    EOF
  end

  def serve
    puts "[INFO] Accepting connections at http://#{HOST}:#{PORT}"
    puts '[INFO] Exit this program with CTRL-C'

    loop do
      connection = @server.accept
      request_http = connection.recv MAX_REQUEST_SIZE
      request = parse_request(request_http)
      puts request
      status, headers, body = @web_application.process(request)
      connection.puts prepare_response(status, headers, body)
      connection.close
    end
  end
end

WebServer.new.serve
```

```ruby
# web_application.rb
class WebApplication
  def process(request)
    case request['path']
    when '/'
      index_route(request)
    when %r{/\d+}
      number_route(request)
    else
      not_found_route(request)
    end
  end

  private

  def index_route(request)
    status = 200
    body = "Hello World!\n#{request}"
    headers = { 'Content-Type': 'text/plain', 'Content-Length': body.length }
    [status, headers, body]
  end

  def number_route(request)
    number = request['path'].delete_prefix('/')
    status = 200
    body = "You asked for the number #{number}"
    headers = { 'Content-Type': 'text/plain', 'Content-Length': body.length }
    [status, headers, body]
  end

  def not_found_route(request)
    status = 404
    body = "No route found for #{request['path']}. Try '/' or a number like '/123'."
    headers = { 'Content-Type': 'text/plain', 'Content-Length': body.length }
    [status, headers, body]
  end
end
```

This new `WebApplication` is pretty simple, but it demonstrates exactly how easily we can create a "router" for requests. Think of it like the `routes.rb` in a Rails application: we're telling the web application which function we want it to call based on what the path was.

If the user asks for `/` we'll send them the old "Hello World!" response, but now if they go to a path that is a number like `/123` we'll call a different function and return a response. We even have a "fallback" for not found routes, and we're setting the status code to `404` to let the browser know that we couldn't find a proper response for that request.

In order for this to work both our WebServer and WebApplication have to agree on the shape of the request and response object. We already defined the request object as a hash with certain specific keys. Now we also define a response format as an array of three values: an integer status code, a hash of headers, and a string body.

As a result, the `prepare_response` method in our `WebServer` has now evolved a bit as well. When it receives those three values, it now knows how to take all three of them and turn them into a proper HTTP response message. It even has a mapping of status codes to their "Reason Phrases" so that we don't have to pass them ourselves!

Let's focus a minute longer on our `WebApplication`. As the basis for all of our routing and response creation we're going to want to make sure we have some really good internal objects for managing requests and responses.

## Improved Request & Response objects

A good Request object will encapsulate the basic hash that we received from our `WebServer` and allow us to extend it with useful methods. A good Response object will allow us to send content back in an intuitive way. Let's create classes now for each of these and update our `web_application.rb` to leverage them. Nothing changes at all in the `WebServer`, but we get some nicer interfaces to work with when thinking in terms of web applications.

```ruby
# web_application.rb
class WebApplication

  class Request
    def initialize(request_hash)
      @request_hash = request_hash
    end

    def version; @request_hash['version'].freeze; end
    def method; @request_hash['method'].freeze; end
    def path; @request_hash['path'].freeze; end
    def headers; @request_hash['headers'].freeze; end
    def body; @request_hash['body'].freeze; end

    def to_s
      <<~EOF
        Version: #{version}
        Method: #{method}
        Path: #{path}
        Headers: #{headers}
        Body: #{body}
      EOF
    end
  end

  class Response
    attr_reader :body, :status

    def initialize(body, status: 200)
      @body = body
      @status = status
    end

    def headers
      {
        'Content-Length' => @body.length,
        'Content-Type' => 'text/plain'
      }
    end

    def to_ary
      [status, headers, body]
    end
  end

  def process(request_hash)
    request = Request.new(request_hash)
    case request.path
    when '/'
      index_route(request)
    when %r{^/sleep/\d+$}
      sleep_route(request)
    else
      Response.new(
        "No route found for #{request.path}. Try '/' or '/sleep/3'.",
        status: 404
      )
    end
  end

  private

  def index_route(request)
    Response.new("Hello World!\n#{request}")
  end

  def sleep_route(request)
    seconds = request.path.delete_prefix('/sleep/').to_i
    sleep seconds
    Response.new("It took #{seconds}s to respond to this request!")
  end
end
```

The `Request` class doesn't do anything fancy yet, just takes a hash and gives us some methods that we can use. The `Response` class adds something that's very helpful: the `headers` method. In the example where we first introduced `web_application.rb` we had to manually calculate these headers for _every_ request, even though it always worked the same way. Now we can avoid that duplication.

The `Response` class also implements the `to_ary` method for a bit of Ruby magic.

<details>
<summary>Quick aside on to_ary</summary>

When you have an instance of an object that implements `to_ary` you can do this:

```ruby
class Example
  def to_ary
    ["apple", "banana", "pear"]
  end
end

first, second, third = Example.new
puts first, second, third
# Prints:
# apple
# banana
# pear
```

Ruby will automatically invoke `to_ary` on the object when you "destructure" it by assigning it to multiple values. For more on this topic, see my colleague Kevin Newton's excellent piece on [Ruby Type Conversion][ruby-type-conversion].

</details>

We've also changed the `number_route` slightly and its now called `sleep_route`. When given a numbered path like `/5`, this route will sleep for that many seconds before returning a response. This is a great segue into the limitations of the web server we've built so far. Try opening one tab to http://127.0.0.1:8000/sleep/5 and then – while that's waiting for a response – open another tab to http://127.0.0.1:8000

Interesting eh? The first tab sleeps for 5 seconds, but the second tab is _also_ blocked and doesn't complete until after the first tab does. What's happening here?

[http]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview
[tcpserver-rdoc]: https://ruby-doc.org/stdlib-2.5.3/libdoc/socket/rdoc/TCPServer.html
[http-response-spec]: https://www.w3.org/Protocols/rfc2616/rfc2616-sec6.html
[http-request-spec]: https://www.w3.org/Protocols/rfc2616/rfc2616-sec5.html
[uri-definition]: https://developer.mozilla.org/en-US/docs/Glossary/URI
[ruby-to-ary]: https://docs.ruby-lang.org/en/master/doc/implicit_conversion_rdoc.html
[ruby-type-conversion]: https://kddnewton.com/2021/09/09/ruby-type-conversion.html
[thread-rdoc]: https://ruby-doc.org/core-2.5.0/Thread.html
