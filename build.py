#!/usr/bin/env python
"""
Given a simple articles.json file will generate the required homepage, articles
list and RSS file.
"""
import json
import html
from jinja2 import Template
from datetime import datetime


template = u"""{%% extends "base.html" %%}
{%% block content %%}
<div class="article">
%(content)s
</div>
{%% endblock content %%}"""


rss = Template(u"""<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
    <title>ntoll.org ~ everything I say is false</title>
    <link>http://ntoll.org/</link>
    <atom:link href="http://ntoll.org/rss.xml" rel="self" type="application/rss+xml" />
    <description>The personal website of Nicholas H.Tollervey</description>
    <image>
        <url>http://ntoll.org/static/images/logo.png</url>
        <link>http://ntoll.org/</link>
        <title>ntoll.org ~ everything I say is false</title>
    </image>
    {% for item in items %}
    <item>
        <title>{{ item.title }}</title>
        <link>http://ntoll.org/article/{{ item.slug }}</link>
        <guid>http://ntoll.org/article/{{ item.slug }}</guid>
        <description>{{ item.content}}</description>
        <pubDate>{{ item.pub }}</pubDate>
    </item>
    {% endfor %}
</channel>
</rss>
""")


python = Template(u"""<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
    <title>ntoll.org ~ everything I say is false</title>
    <link>http://ntoll.org/</link>
    <atom:link href="http://ntoll.org/python.xml" rel="self" type="application/rss+xml" />
    <description>Pythonic aricles by Nicholas H.Tollervey</description>
    <image>
        <url>http://ntoll.org/static/images/logo.png</url>
        <link>http://ntoll.org/</link>
        <title>ntoll.org ~ everything I say is false</title>
    </image>
    {% for item in items %}
    <item>
        <title>{{ item.title }}</title>
        <link>http://ntoll.org/article/{{ item.slug }}</link>
        <guid>http://ntoll.org/article/{{ item.slug }}</guid>
        <description>{{ item.content}}</description>
        <pubDate>{{ item.pub }}</pubDate>
    </item>
    {% endfor %}
</channel>
</rss>
""")

articles = json.load(open('articles.json'))


home = []
rss_list = []
python_list = []
article_list = []

# Generate the homepage and RSS feed. Use only the most recent three articles.
for article in articles[:3]:
    filename = article['slug'] + '.html'
    raw = open('site/templates/articles/%s' % filename)
    raw_content = raw.readlines()
    content = ''.join(raw_content[3:-1])
    title = '<h1><a href="http://ntoll.org/article/%s">%s</a></h1>' % (article['slug'], article['title'])
    content = title + content
    article['content'] = html.escape(content)
    date = datetime.strptime(article['date'], '%Y-%m-%d %H:%M:%S')
    pub = date.strftime('%a, %d %b %Y %H:%M:%S GMT')
    article['pub'] = pub
    rss_list.append(article)
    home.append(content)

# Generate Python articles
pythons = []
for article in articles:
    if article.get('python', False):
        pythons.append(article)

for article in pythons[:3]:
    filename = article['slug'] + '.html'
    raw = open('site/templates/articles/%s' % filename)
    raw_content = raw.readlines()
    content = ''.join(raw_content[3:-1])
    title = '<h1><a href="http://ntoll.org/article/%s">%s</a></h1>' % (article['slug'], article['title'])
    content = title + content
    article['content'] = html.escape(content)
    date = datetime.strptime(article['date'], '%Y-%m-%d %H:%M:%S')
    pub = date.strftime('%a, %d %b %Y %H:%M:%S GMT')
    article['pub'] = pub
    python_list.append(article)

rss_file = open('site/templates/rss.xml', 'w')
rss_file.write(rss.render(items=rss_list))
rss_file.close()
py_file = open('site/templates/python.xml', 'w')
py_file.write(python.render(items=python_list))
py_file.close()

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
