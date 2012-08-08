import json
from datetime import datetime

template = u"""{%% extends "base.html" %%}
{%% block content %%}
%(content)s
{%% endblock content %%}"""

articles = json.load(open('articles.json'))

home = []
article_list = []

for article in articles[:3]:
    filename = article['slug'] + '.html'
    raw = open('site/templates/articles/%s' % filename)
    raw_content = raw.readlines()
    content = ''.join(raw_content[3:-1])
    title = '<h1><a href="/article/%s">%s</a></h1>' % (article['slug'], article['title'])
    content = title + content
    home.append(content)


home_content = '<hr/>\n'.join(home)
home_content += '<p><a href="/articles">View all articles</a></p>'

home_file = open('site/templates/home.html', 'w')
home_file.write(template % {'content': home_content})
home_file.close()

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
