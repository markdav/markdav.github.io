---
layout: post
category: blog
tagline: Supporting tagline
tags: 
  - go
published: true
---

Sadly I haven't gotten back to finishing the monasca agent setup on redhat below - got distracted looking at some other stuff, I'll get back to it!


I really need to start learning Docker properly, I've done a few tutorials and the concept intrigues me but still need a little more hands on to truly grok it.  The **go** language is also an interesting one, the language looks very clean and reminisent of c of old.  Tom at work today showed me a nice example of how Google cAdvisor can be used to monitor containers running in a docker cluster.  It's actually time I learnt both of those things.


![gopher](http://algotradexperts.com/static/uploads/goimg1910.png)


In the interests of hitting two birds with one stone (learning docker and go), I'm thinking of attempting to add a statsd storage sink to cAdvisor.  cAdvisor already supports InfluxDB which is a powerful option, so the statsD thing would be mainly for fun.


Heading to Germany this week so won't get a whole lot of time but have forked and downloaded the cadvisor code there and next stop is to bang through a few golang tutorials.  This might die a death, but.. you never know!