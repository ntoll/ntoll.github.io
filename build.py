#!/usr/bin/env python
"""
Given a simple articles.json file will generate the required homepage, articles
list and RSS file.
"""
import json
from jinja2 import Template
from datetime import datetime


template = u"""{%% extends "base.html" %%}
{%% block content %%}
%(content)s
{%% endblock content %%}"""


rss = Template(u"""<?xml version"1.0" ?>
<rss version="2.0">
<channel>
    <title>ntoll.org ~ everything I say is false</title>
    <link>http://ntoll.org/</link>
    <description>The personal website of Nicholas H.Tollervey</description>
    <image>
        <url>http://ntoll.org/static/images/logo.png</url>
        <link>http://ntoll.org/</link>
    </image>
    {% for item in items %}
    <item>
        <title>{{ item.title }}</title>
        <link>http://ntoll.org/article/{{ item.slug }}</link>
        <description>{{ item.content }}</description>
        <pubDate>{{ item.pub }}</pubDate>
    </item>
    {% endfor %}
</channel>
</rss>
""")


articles = json.load(open('articles.json'))


home = []
rss_list = []
article_list = []

# Generate the homepage and RSS feed. Use only the most recent three articles.
for article in articles[:3]:
    filename = article['slug'] + '.html'
    raw = open('site/templates/articles/%s' % filename)
    raw_content = raw.readlines()
    content = ''.join(raw_content[3:-1])
    title = '<h1><a href="/article/%s">%s</a></h1>' % (article['slug'], article['title'])
    content = title + content
    article['content'] = content
    date = datetime.strptime(article['date'], '%Y-%m-%d %H:%M:%S')
    pub = date.strftime('%a, %d %B %Y %H:%M:%S GMT')
    article['pub'] = pub
    rss_list.append(article)
    home.append(content)

rss_file = open('site/templates/rss.xml', 'w')
rss_file.write(rss.render(items=rss_list))
rss_file.close()

home_content = '<hr/>\n'.join(home)
home_content += '<p><a href="/articles">View all articles</a></p>'

home_file = open('site/templates/home.html', 'w')
home_file.write(template % {'content': home_content})
home_file.close()

# Generate the articles page.
for article in articles:
    date = datetime.strptime(article['date'], '%Y-%m-%d %H:%M:%S')
    pub = date.strftime('%A %d %B %Y (%I:%M%p)')
    a = '<p><a href="/article/%s">%s</a> ~ %s</p>' % (article['slug'], article['title'], pub)
    article_list.append(a)

article_content = '<h1>Article List</h1>'
article_content += ''.join(article_list)

article_file = open('site/templates/articles.html', 'w')
article_file.write(template % {'content': article_content})
article_file.close()
