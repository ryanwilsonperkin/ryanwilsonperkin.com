---
layout: post 
title: Matasano Crypto Challenges
---

Recently, I started working through the [Matasano Crypto Challenges][1].
I'm about to graduate from university, and for my last semester I chose to
treat these challenges as an independent research project. It's even worth
credit thanks to my wonderful advisor [Dan Gillis][2].

Motivation
---

I was first introduced to the challenges through Thomas Ptacek's posts online.
Thomas has been working in the computer security field for [several decades
now][3] and founded Matasano security. He's also sitting at the top of the list
of contributors on [Hacker News][4]. Spending any significant amount of time on
the site will cause you to run across some of his posts which typically focus
on security, intrusion detection, and law. When I saw him post about the
challenges, I followed the link and found myself reading through all the
problem sets. 

The challenges are introduced by [Maciej Ceglowski][5] who stumbled upon them
in the same way that I did. In his introduction, he elaborates on some of the
common fears, such as not having a strong enough background in math (not
required) or having the code be out of his depth (they're surprisingly
shallow).

Goals
---

With this in mind, I decided to work through as many challenges as possible
during the course of my final semester. Along the way, I will document the
challenges and talk about the complexities that are encountered in some of the
sets. By the end of the semester, I will be able present a proof of concept for
one of the exploits at the [Guelph Coding Community (GCC)][6] presentations.

The main goal of this project is to learn more about applied cryptography and
cryptanalysis. I've given several presentations on security before, including
the bitcoin block chain, and the history of codebreaking, but I don't get my
hands dirty writing code as much as I'd like to. Hopefully, writing a ton of
code for small challenges will reverse the trend.

Implementation
---

Every good project needs a public repository, so all of the code I'm writing
for this project is available [on GitHub][7]. It's a python project, as
that's what I live and breathe these days, and the directory structure will
likely change in the coming months as I adopt saner conventions. If I'm really
feeling adventurous, it may even become a true, installable python package;
though I'll try to [avoid pushing to PyPi][8]. 

The challenges are broken down into seven sets of eight problems each. The
first set focuses on "the basics" and those are what I've been working through
so far. This set is simply a warm-up for the problems to come; with hints that
the code will be re-used at a later point. For each challenge I create a new
python program, and endeavor to modularize things wherever possible.

In addition to being a module, each file also serves as a proof-of-concept
script that performs some minor example associated with the task. As an
example, the fourth challenge in the first set is concerned with detecting a
line in a file that has been encoded using a 'Single-byte XOR' cipher. The code
for encrypting/decrypting Single-byte XOR was developed in the challenge
previous, so the fourth challenge imports this code rather than trying to
re-invent the wheel. The code for the fourth challenge then uses this code to
decipher the contents of a file and determine which line had been encrypted,
and what the key to the encryption was.

Challenges
---

So far the challenges have been simple enough that the only real roadblock has
been finding the time to work on them. My intent was to have finished 3
challenge sets by this point, yet I'm only at the end of the first challenge
set. In the coming weeks, I intend to make up the lost time so that I can get
to the end of the third challenge set before my presentation to the GCC.

As it turns out, the biggest programming challenge so far has also been the
most humbling: I just couldn't get base64 to hex conversion to work properly.
It seemed like it should be a trivial problem; convert base64 to a series of
bytes, convert the bytes to hexadecimal for printing. Yet every time I printed
my results I would have errors. Worse yet, the errors were intermittent,
meaning that some of the output was encoded properly and some was
incomprehensible. After at least an hour of bug hunting, in a single ~50 line
module, I finally realized that I was encoding 'a's as 01 instead of 10.

Timeline
---

The first challenge set is almost finished, and I've already begun plans for
the second. Given a reasonable estimate of increase in complexity of the
problems, it seems fair to suggest that I could get to set 5 before the end of
the semester.

At set 5, there is a notice that the set is __significantly harder__ than the
last set. I intend to pick one or two problems from the fifth set to work on,
and include in the final report that I present to my advisor. After all, this
will be the stage where things actually start to get interesting.

[1]: http://cryptopals.com "Matasano Crypto Challenges"
[2]: https://danielgillis.wordpress.com/ "Dr. Daniel Gillis on WordPress"
[3]: https://www.linkedin.com/in/thomasptacek "Thomas Ptacek | LinkedIn"
[4]: https://news.ycombinator.com/leaders "Leaders | Hacker News"
[5]: https://blog.pinboard.in/2013/04/the_matasano_crypto_challenges/
[6]: https://www.facebook.com/groups/guelphcodingcommunity/ 
[7]: https://github.com/ryanwilsonperkin/matasano
[8]: http://blog.aclark.net/2012/05/23/a-simple-printer-of-nested-lists/
