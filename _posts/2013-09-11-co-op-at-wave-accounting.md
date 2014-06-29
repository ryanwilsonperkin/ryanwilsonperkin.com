---
layout: post
title: Co-op at Wave Accounting
---

It had been barely two months since my job at Research In
Motion had ended and I was already looking for new work. I
had decided that for my next work term I would want to work at a small
company that put an emphasis on shipping code quickly so that my efforts
would go towards meaningful change.

In an effort to be more proactive with my searching, I drove out to
Montreal with a van full of geeky programmers to attend
[CUSEC](http://2013.cusec.net/), the annual Canadian University Software
Engineering Conference. I spent every day listening to talks, exploring
Montreal, and handing out dozens of resumes.

Getting the Job
---------------

Oddly enough, the payoff would come in the form of a friendship made at
CUSEC, rather than any immediate responses to my resume. Juan, one of
the geeky programmers that had been packed into the van, happened to
know a guy at a Toronto-based startup called [Wave
Accounting](https://www.waveapps.com/). With a recommendation from Juan
and my foot securely wedged in the door, I was able to quickly schedule
a Skype interview.

On the call, I spoke with [Nick Presta](https://twitter.com/NickPresta),
a recent Guelph graduate who had started working at Wave right out of
school. We talked about the university, and my experience programming;
it made for a nice relaxed chat more than a grilling technical
interview. I later learned that this was more to look for cultural fit
and get a brief idea of my technical qualifications.

The interview happened just before I went on a vacation to Florida.
Shortly afterwords, I heard from the recruiter that the response was
very positive and I'd likely be hearing back within the next couple of
days about scheduling a second interview. Pleased with myself, I packed
up the car and headed out on my planned vacation with some friends. Then
the best kind of disaster struck: I got another offer.

I say disaster only because co-op scheduling would require me to make a
decision very quickly about whether I would accept my job offer. It was
from [Morgan Stanley](http://www.morganstanley.com/), a financial
services company of good repute that would have me working in a large
beautiful office space in Montreal.

I sent a message to the recruiter at Wave explaining my situation and we
were able to work out a deal, if I could meet for a second Skype call
the next day they would try to give me an immediate decision. That is
how I found myself sitting cross-legged in the middle of a [Floridian
hotel](https://plus.google.com/116354508228503124267/about), borrowing
the wifi in order to take an international video chat about my technical
qualifications.

True to their word, I received an offer later that same day.

Startup Culture
---------------

Working at Wave was a blessing. I had entered the magical nirvana that
is **Startup Culture**. The emphasis is necessary (as any [Hacker
News](http://news.ycombinator.com/) junkie could tell you), after all
Startup Culture is what will free us all from the workplace grind, tear
down the hierarchy of traditional business, and make us all love our
jobs.

But of course, [startup
culture](http://www.paulgraham.com/13sentences.html) isn't actually the
solution to life, the universe, and everything. What it actually is, is
a trend of small companies focussing on the people they hire as much as
the product they build.

I spent the summer learning as much as I could about what it means to
work at a small company that ships code, iterates quickly, and focuses
on people. Wave is large by startup standards (at around 70 people) but
still manages to retain the friendly group vibe that is indicative of a
well run small business.

All the developers worked together in a large open concept office where
we were in constant contact. [Hipchat](https://www.hipchat.com/) was
used for communicating between rooms (or for those uncomfortable with
human contact), and a whole slew of tools encouraged inter-office
communication.

The whole company would meet up once a week in the largest room we had
to demo small projects we were working on, and listen to the co-founders
bring us in on the business side of things. The word
[transparency](http://www.forbes.com/sites/bradsvrluga/2013/02/01/openness/)
was used frequently and carried with it a sense of connectedness,
knowing that even the interns were being let in on company secrets
usually privy to only the upper echelons of management.

Learning Something
------------------

When I received an offer from Wave, it was based on my technical
qualifications in [Python](http://www.python.org/). The idea was that if
I knew Python, it should be trivial to pickup the intricacies of the
derivative web framework [Django](https://www.djangoproject.com/).
Looking back, I may have been a bit presumptuous in thinking that my
scripting skills would immediately translate to a robust understanding
of
[MVC](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller),
but I'm also glad that I was naive enough to try.

In the time spent there, I would learn tons about Django, [object
relational models](https://docs.djangoproject.com/en/dev/topics/db/),
[javascript frameworks](http://backbonejs.org/),
[LESS](http://lesscss.org/) compilation to css, [HTML
templating](http://handlebarsjs.com/),
[RESTful](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)
design, and [server-side
administration](http://docs.opscode.com/chef_why.html). I took any jobs
that I felt would teach me something new and allow me to build up my
knowledge of web application design.

Never forget: documentation is your friend. I'm occasionally tempted to
tattoo RTFM on my wrist as a constant reminder that somewhere, someone,
has written documentation on whatever I'm trying to learn.

Giving Back
-----------

As if all of the things I'd learned wasn't enough, Wave even provided me
with an opportunity to fulfill a dream and publish some open source
software. When asked to give a demo on [Vero](https://www.getvero.com/)
(a service provider we frequently used) I programmed a small Python
library that would interface with their web application. Knowing that
Vero had other clients that used Python, Nick offered to help me publish
the source code to get some recognition.

Fearing that publishing the code would give away some company secret, I
consulted with one of our lead developers and was happy to find out
that, on the contrary, the company would be ecstatic to publish. With a
lot of help from others to package the product and work out the bugs, we
were able to [release the code later that
week](https://github.com/waveaccounting/vero-python). To date, it has
been downloaded [over 500 times](https://pypi.python.org/pypi/vero).

Ship It
-------

When I worked at Research In Motion I worked behind the scenes. Much
like the wizard in The Wizard of Oz, I was behind a curtain pulling
levers and making sure that everything worked, but I wasn't seeing the
fruits of my labour. I was able to make a lot of headway on creating a
large library to provision an entire build system, but when people asked
me "What did you do at work?" there was nothing external facing that I
could point to. People's eyes have a tendency to glaze over when you
start talking excitedly about your *new perl module for metadata-based
build monitoring*.

At Wave I got to satisfy my ego and make numerous contributions to the
front end that was in use every single day by thousands of small
business owners. The first modification I had made (fixing a tooltip
error) came as a shock to me. Sure, I had fixed the error, documented
it, and written tests to cover the issue, but that can't be all can it?
Doesn't it still have to go through five or six layers of management? It
was incredible to see that the fix I had written the day before was
already live in production and being served out to our entire customer
base.

This means that stuff breaks. Shipping code quickly and constantly means
that you're bound to introduce a few bugs and have a few missteps. I was
guilty one day when I came in and realized that I had introduced a small
bug that caused part of our app to crash. I was devastated, thinking
that I would surely be scheduled for a meeting with my project manager
to discuss my mistakes, but instead no one worried. They were thankful
that I had acknowledged (and fixed!) my error, and that was the most
important part. The fix would be sent out right away.

Above and Beyond
----------------

Working at Wave was so much more than just working at Wave. The company
functioned like a community and there were always events going on. I
played on the company flag football team where we took the
[Toronto-wide](http://www.torontossc.com/) championship title. I had
beers on the rooftop patio at the semi-regular parties. I went to a
[DevOps](http://www.meetup.com/DevOpsTO/) and a [Django
Toronto](http://www.djangotoronto.com/) meetup, both of which were
hosted in house in the space we would normally be using as our offices.
I went out to happy hour on Fridays with dozens of coworkers and talked
about everything from work, to school, to future jobs, and made a lot of
friends.

I'm incredibly grateful for the opportunity.

I've managed to say all of this, without saying much about the people I
was involved with at Wave, and I'd like to end on that.

Thank you to Chris Wu, who interviewed me while I sat on the gritty
floor of a Florida hotel and would later talk to me about life,
learning, and being appropriately cynical. Chris had a huge impact on my
understanding of the tech community and I'm beyond grateful for having
met him this summer.

Thank you to Daniel Langer, for being a great dev-lead and pseudo
father-figure to the Sloth team throughout the summer. Dan constantly
went above and beyond his responsibilities by dropping everything to
come work me through a particularly dense section of the code base and
to make sure that I understood everything.

Thank you to Katie Hrycak, one of our customer support heroes, who
helped me with my extracurricular studying by meeting up with me every
single week to go over what I had been learning in my Coursera class.
Having beers in the sun with Katie and talking about user experience was
always an awesome excuse to ditch the laptop for half an hour.

Thank you to Adam Rotman, for showing me everything he knows about
Bootstrap, giving me feedback on a side project, and valuing my input on
the design of the Wave invoicing app. I worked side by side Adam to put
together a new interface and was constantly learning new things.

Thank you to Mitch Gillespie, yet-another-Guelph-grad and project
manager for the Sloth team for spending sleepless nights making sure
that we were always organized and on track. And for being the most laid
back manager I've ever met, strolling into a meeting with Birkenstocks
and a seashell necklace. Mitch is a great guy who cares a lot about
making a great product.

Thank you to James Lochrie and Kirk Simpson, for putting together a
meaningful product with a vision to help people, and for staffing it
with a team of incredible people. Without their efforts as cofounders,
and the constant headaches which must accompany flying back and forth to
the valley for meetings, Wave would not exist.

Thank you to Wai Chung Hon, Jack Hsu, and Michelle Xie, who made the
Sloth team the greatest it could be and were constantly helping me
through my projects. Wai is a wonderful programmer and football player,
Jack has entirely too much knowledge of Javascript (it boggles the mind)
and Michelle is a hardcore QA. All of them were friendly, knowledgeable,
and helpful.

Finally, thank you to Nick Presta, who was responsible for making sure
that the co-ops who came to work at Wave were well taken care of and
were constantly learning new things. Nick helped me out with everything
from the very first day I arrived, and twice a month we'd go out for
coffee and discuss my career goals, gossip about technology, and
generally geek out. He's a great programmer, and a great friend, and is
entirely too humble about both.

Wave was the most fun I've ever had at work and it's because of the
people that are there every single day. Thank you all so much for your
kindness, patience, and willingness to take on co-op students. I wish
you all the best.
