---
layout: page
title: "-- At The Borders --"
tagline: At the borders
published: true
---

{% include JB/setup %}


{% for post in site.posts %}
  <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
  <p class="author">
    <span class="date">{{ post.date | date: '%B %d, %Y' }}</span>
  </p>
  <div class="content">
    <p>{{ post.excerpt }}
    <a href="{{ post.url }}"><b>read more..</b></a></p>
  </div>
{% endfor %}