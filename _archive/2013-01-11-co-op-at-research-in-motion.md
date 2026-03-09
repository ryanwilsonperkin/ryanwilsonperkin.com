---
layout: post 
title: Co-op at Research In Motion
---

*This post was originally published on WordPress in January of 2013.*

When I was in the fifth grade, I bought a copy of Interplay's "Learn to
Program Basic" from a Scholastic magazine flier.

It was terrible.

The characters were confusing, the cut scenes increasingly maddening,
and yet, I fell in love with programming. This was the type of
interactive tutorial finally perfected by sites like CodeCademy that
held your hand while you learned all about the intricacies of variables
and functions. The animated tutor who had a CD-ROM for a face and a dog
for a companion would encourage you as you stepped through the levels,
creating games and animating sprites. Now I finally had a reason to use
the beast of a computer my parents had been so good to invest in, one of
those ridiculously expensive towers that had a couple megabytes of
memory and a processor that was still measured in megahertz. Over the
next few years I would try my hand at controlling my computer using
the-little-black-box, copy/pasting HTML, and (finally) Python.

Hello, World.
=============

Computer Science in university is what I was after all along. Here I can
spend long nights writing code with likeminded friends, making terrible
jokes, and delivering software that I'm proud of. This will mark the
start of my fifth semester at the University of Guelph, and having just
spent the last eight months on my first work term with Research In
Motion, I'll be coming back even more prepared.

RIM has taken a lot of grief in the news in recent years for largely
ignoring the increasing market for smartphones, as such I wasn't sure
what to expect of the general atmosphere upon arriving, but I was
impressed. The software developers I was working with were optimistic
about the new direction the company was heading, my manager Tony Bridges
was downright ecstatic at times about the new features being developed,
and it was infectious. While not working directly on these new features
ourselves, we were responsible for the Continuous Integration (CI) of
new work.

CI is crucial, the programmers are responsible for taking all of the
work R&D is doing and making sure that it's not going to go ahead and
break all of the existing code. Every time a developer submits something
new, its our job to take it, compile it, test it, and figure out what
breaks. RIM is a huge company, and starting my first real foray into the
world of software production seemed daunting: where could I find
definitions for all of the Three Letter Acronyms? who could I ask about
this specific line of code? how many servers does a company really need?

Sometimes, eight months didn't seem long enough.

Research In Motion
------------------

> "Research In Motion (RIM), a global leader in wireless innovation,
> revolutionized the mobile industry with the introduction of the
> BlackBerry&reg; solution in 1999.
>
> The BlackBerry product line includes the BlackBerry&reg; PlayBook&trade; tablet,
> the award-winning BlackBerry smartphone, software for businesses and
> accessories. BlackBerry products and services are used by millions of
> customers around the world to stay connected to the people and content
> that matter most throughout their day."
>
> Research In Motion

RIM can be thought of as divided into two main sections: Devices and
Enterprise. I worked for the latter half of the company. The Blackberry
line of products has been an industry standard for years now,
controlling a huge section of corporate devices that are trusted for
their reliability and their security.

RIM is spread out over a number of countries and towns, I undertook my
work term at the main headquarters in Waterloo, ON. There are over 20
RIM buildings scattered across Waterloo, congregated around RIM Park
(near Laurier University) and Northfield Campus (north of the city). One
of our team members even worked in Mississauga and video called every
morning for our daily meeting.

My official title was Software Developer for Continuous Integration. My
immediate team consisted of X people: myself, my manager Tony, coworkers
Mike, Bart, Yuhui, Richard, and Lawrence (a Guelph student as well, and
a friend). Beyond that we had help from others who had expertise in
specific areas such as machine configuration, build server maintenance,
web design, and proxy management. At RIM, if you don't know how to do
something, there seems to always be someone who does, and email rules
all.

What is Continuous Integration?
-------------------------------

Have you ever gotten exhausted tracking down a bug in your code when you
threw in a new module?

Have you ever been flustered trying to find a revision of your program
that you know is going to work? That's where Continuous Integration (CI)
comes in.

As a CI developer I was responsible for three main things:

1.  Aggregate all of the developers code
2.  Compile and test the code
3.  Generate meaningful statistics from the test data

We went through quite a few systems at each of the three steps trying to
achieve a good balance while I worked at RIM. None of them perfect. When
it comes to CI it tends to be a matter of tradeoffs: do you want lots of
speed or lots of customizability?

### Aggregate Code

This step is commonly known as source control. At the university I
gained some experience with Subversion and the svn command line client,
at RIM they prefer Perforce. Perforce is the brute force revisioning
system, anything you could possibly think to do with it is possible.
Want to see a list of users that modified a file after it was branched
but before it was merged into another repository? No problem. Because of
these features perforce can get a little slow, especially when you have
a bunch of developers all syncing down the latest code for an entire
project, but the GUI more than makes up for it.

### Compile and Test

This is generally where things get tricky. When you have a large project
with lots of moving parts, you need to create a “build contract" to keep
track of how everything fits together. Sometimes a module in one piece
of the project will require a specific version of another piece, but
only at a certain step in the compilation. Build contracts come in many
different shapes and sizes, but they all accomplish the same thing: a
blueprint for compiling and testing code. Since we worked with a lot of
Java code, we had a lot of options to pick from.

Ant gives the user complete control, it's written in XML, and there's a
vast library of modules to support any function you can think of.
Written by Apache, at first glance it appears to be the best tool for
the job. But Ant has it's downfalls: while XML gives it a good
structure, it makes it much harder to read an maintain, a lot of the
libraries are buggy and missing features, and it tends to be much lower
level than other build solutions. Ant calls it's functions “targets" and
you can nest them however you like. They can invoke system commands,
move files, connect to remote servers, and - of course - compile your
program. Ant is best suited to projects that need to be highly
customizable.

The next option is Maven, also by Apache. Maven sought to do fix
everything that Ant did wrong, bringing a much more high-level approach
to build systems. Ant is to C, what Maven is to Python. Maven build
contracts are also made from XML but in a much more structured way.
Where Ant used XML tags to denote everything from variables to boolean
expressions, Maven has a rigid definition of which tags are expected at
each step. A maven contract is called a Project Object Model (POM) file,
and it generally will list: which repositories to grab source from,
dependencies for each module, needed plugins, and where to publish the
results. At the expense of it's shallow learning curve, Maven isn't
quite robust enough to easily work with low level processes, the only
way to customize your contract is to write an entire Java plugin to
accomodate your function. The documentation can be rather sparse.

Last and certainly not least, I got a chance to work with Gradle. Gradle
succeeds where the aforementioned fail by striking a harmonious balance
between high and low end. Gradle is - in fact - just an extension of the
Groovy programming language (which in turn, is an extension of Java).
The syntax that Groovy and Gradle use was completely new to me, there is
a great deal of emphasis on Lambda functions, closures, and associative
arrays. It is a wonderful Object Oriented tool and has a special focus
on collections of objects. The syntax isn't quite procedural, and at
times doesn't quite look like OO either, it definitely takes a while to
get used to but it is well worth the investment.

### Generate Stats

A part so crucial it required a team member's (mostly) undivided
attention. Bart was a wonderful colleague who was primarily responsible
for analysis of data coming out of test runs and finding new and
inventive ways to shape that data. Used properly it can show how a
project is progressing over time, and how various patches have effected
the stability. The data was then used to create numerous graphs that
demonstrate the project's state and made available on a local site.
Since a build is started whenever developers submit new code into the
repositories, we had the system automatically email them on completion
showing the effects of the new code.

Time Well Spent
---------------

In a continuous integration environment the main line of work is
responding to problems and finding fixes to broken software. That being
said, there were three additional projects amongst which I divided my
time while in Waterloo.

### Lab Machines

In build system management, a collection of computers that is required
to compile, analyze, or test software is referred to as a 'Lab' (or a
'Pool'). These labs are composed of any number of devices, each with
specific functions that can be used. A typical lab might consist of 3
machines used to compile 3 different modules of a program, a repository
that has a source code management (SCM) system for developers to push
code to, and an artifact repository (such as Artifactory or Nexus) to
push the completed code to. Devices might also be needed (for RIM this
would include phones and tablets) to test functionality of certain
modules.

All of these lab devices need to be configured in special ways so that a
'Master' device can distribute tasks amongst them. That's where I come
in. My job was to configure each of the machines in a lab including (but
not limited to): setting up public/private authentication keys, adding
new software, managing configuration files, and ensuring network
connectivity. Throughout this I learned a great deal about windows
services, network connection protocols (RDP and SSH), and batch file
editing (korn shell and batch).

### Build Time Versioning

Tech companies will often have an 'internal' name for products before
they are officially named by the marketing division and released into
the wild. This, however, can raise some problems when writing the
software itself - what if the product name is required on a splash
screen? do we have to change code at the last minute?

One thing I was surprised at working in a big company was how frequently
product names can change. Managers are constantly changing their mind or
trying to re-name a product to fit with new designations. With that
being said, we need a way to rapidly re-name or re-number a product. My
task for this was to come up with a way to keep a very small file,
containing only the product name and version number, and be able to
inject this into the compilation process to have it show up in the final
product. I worked closely with the installer team to create a very small
XML file that resides in an SCM branch (for version tracking) and can be
edited by a select few managers. When the product we were working on was
being compiled, a script I wrote in Groovy would be called with the XML
as a parameter. The script would then generate a number of data files
that could be compiled with the source code and would properly update
the new name/version in all the right places.

RIM's products are massive and have a huge number of pieces involved, so
trying to track down all the places where I would need to inject the
right values was exhausting, but in the process I learned about some
great shell tools for code analysis that I'll never forget. Among them,
my new favourite tools: xargs, sed, awk, and grep.

Learn them. Use them. You won't regret it.

### Logging Library

The projects I have coded in university classes tend to be relatively
small - they don't take more than a couple minutes to test and can
generally be compiled in mere seconds.

Big software takes a bit longer.

Some of the projects we were responsible for compiling had upwards of 10
sub-projects (think of them as really big modules) and could take over
10 hours to compile, test, and publish. Bearing that in mind, sometimes
a project might fail the very first test but keep going until all are
finished, but a developer shouldn't have to wait till the very end to
find out. This called for some innovation, and a way of tracking build
status in real time. Our solution was to create a library of logging
functions that would communicate with an SQL database (via a logging
proxy) that fed a status-monitoring website.

I was in charge of the logging functions. Given a set of specifications
of what the proxy server expected, I was able to create a Perl module of
functions that would send an XML query to the server, notifying it of
the current build status. This could mean telling it that a brand new
project was being compiled, a specific module just passed a specific
test suite, or that a recently launched build is failing (or has failed
completely!) Having never worked much with Perl before, this library had
a but of a learning curve, but I found that my knowledge of Python was
quite transferrable and didn't hit too many roadblocks. The big time
sink on the project was the constantly changing requirements for what
the library should be able to do. After it was written and communicating
well with the server I had to sprinkle the compilation code with the
appropriate new logging functions.

New Tools
---------

* * * * *

**polyglot**

Noun: A person who knows many languages.

* * * * *

Polyglot is my new favourite word, and I think all programmers should
strive to be one. Different programming languages offer different
features, each with their ups and downs, but the more you learn the more
tools you have available for any software job.

> If all you have is a hammer, everything looks like a nail.

### Perl

Perl is the eminent scripting language of old that Unix gurus and
script-kiddies alike have been using to parse, replace, and refine their
code for years now. It's found a niche in almost every conventional code
usage and, once you get comfortable with some of it's more obscure
syntax (\$|=1 anyone?) its really quite simple. Perl modules are similar
to C's pre-compiled dll's and can be handy in adding extra functionality
to small scripts, the support for some object oriented functionality was
vital in my work to create a logging library. I also began using perl
for everyday work to automate certain batch processes intelligently and
scan vast file repositories for code segments.

### Groovy

Groovy is Java's cool new grandchild. First appearing in 2003, Groovy
sought to add new scripting functionality to Java to allow for awesome
concepts like closures and dynamic collections. I used Groovy for
generating code templates from an XML data file but it's uses are
virtually limitless when you consider that any existing Java libraries
can instantly be included to expand functionality. There are also
libraries written exclusively for Groovy itself but - be forewarned -
the documentation is sparse and oftentimes incomplete.

### Korn Shell

Having only worked with Bash (Bourne Again SHell) before, I was confused
when I started seeing the .ksh extension scattered throughout some
builds. I need not have worried, the syntax is almost exactly the same
for the basic functions. Where Korn Shell really shines is when it comes
to variable management and regular expressions, a place where shell
scripting has traditionally fallen short. A long article found here,
shows the vast scope of manipulative methods that Korn Shell affords
it's users to quickly find and replace patterns. I've never come across
a system that uses Korn Shell by default, but I've since installed it on
a Linux box of my own for scripting at home.

### Ant

Ant is Apache's tool for re-inventing the makefile on a Java platform.
It's a swiss army knife for automatic software builds, but keep in mind,
even a swiss army knife has pointy bits to accidentally stick yourself
with. The first issue is the inherent issues associated with XML - the
markup in which Ant is written. More often than not the invoking process
will fail not on bad code, but due to an improper structure or missing
right bracket. For all of it's quirks though Ant is a fun example to
learn with for scientifically-oriented minds as the focus of XML forces
the user to structure things logically. Beware when using Ant for larger
projects, you may get lost in the spaghetti code.

### Maven

Maven exists on the other end of the spectrum for Apache's build tools.
It is explicitly high level definitions of a projects structure,
trusting to the built-in compile, test, run tools that Maven provides to
handle the actual compilation. This allows for greater abstraction of
the actual compilation and testing process, while making it obvious
which modules depend on which. If you really want to emulate the swiss
army knife behaviour of Ant, Maven will at least force you to create
your new functionality in a Java class and include it as a plugin, in
the hopes that this will put an onus on the developer to write good
re-usable plugins. RIM utilized a variety of homemade plugins for Maven
tooling and I became familiar with a few of them. Maven is the best tool
for leviathan software projects.

### Gradle

I didn't spend as much time with Gradle as I would have liked to, and
only managed to write one or two scripts, but I feel that it would serve
my current software purposes well. Independent of Apache, this tool is
the average of Ant and Maven, quirks and all. The structure is more akin
to a makefile than any other build languages that I've worked with
before and attributes this to it's core of interpretation using Groovy
syntax. This is largely left up to personal preferences, as there are a
thousand different ways to tackle any given job using Gradle, and
sometimes not enough ways to handle something that seems simple.
Underlying it all is the concept of a project lifecycle and a developer
would do well to have a firm understanding of that before attempting any
of the more obscure commands.

Acknowledgements
----------------

I would like to personally thank my manager Tony Bridges and close
coworker Mike Dobrindt. You were both imperative to my understanding of
how our division fit into the organization.

Thank you to Bart whose patience and thinly veiled threats were crucial
in keeping me on track with the logging library development.

Thank you to Richard, a fellow coop whose terrible sense of humour
always helped to lighten the mood when the workload got heavy.

Thank you to Yuhui, a fellow coop whose unfailing friendliness was
always appreciated.

Thank you to Lawrence for making the carpool more bearable.

Thank you to both Cheryl Hulme and Laura Gatto for their help in all
things coop related and helping to arrange for the position.

And of course, thank you to everyone else at RIM.
