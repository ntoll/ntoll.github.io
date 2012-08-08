from bs4 import BeautifulSoup
from bs4.element import Comment, Tag
from os import listdir
from os.path import isfile, join
import json
from datetime import datetime

path_old = 'old_articles'
path_new = 'site/templates/articles'

files = [f for f in listdir(path_old) if isfile(join(path_old, f))]

articles = []

for f in files:
    raw = open(join(path_old, f))
    html = raw.read()
    soup = BeautifulSoup(html)
    tags = []
    content = []
    for item in soup.contents:
        if isinstance(item, Comment):
            tags.append(item)
        elif isinstance(item, Tag):
            content.append(item)
    title = tags[0].replace('#title:', '')
    slug = f.replace('.html', '')
    raw_date = tags[1].replace('#date:', '')
    article = {}
    article['title'] = title
    article['slug'] = slug
    article['date'] = raw_date
    articles.append(article)

articles = sorted(articles, key=lambda article: article['date'], reverse=True)

output = open('articles.json', 'w')
json.dump(articles, output, indent=2)
output.close()

template = u"""{%% extends "base.html" %%}
{%% block content %%}
<h1>%(title)s</h1>
<p class="published_on">%(published)s</p>
%(content)s
{%% endblock content %%}"""
for art in articles:
    filename = art['slug'] + '.html'
    raw = open(join(path_old, filename))
    html = raw.readlines()
    content = '\n'.join([str(line) for line in html[3:]])
    date = datetime.strptime(art['date'], '%Y-%m-%d %H:%M:%S')
    art['published'] = date.strftime('%A %d %B %Y (%I:%M%p)')
    content = content.replace('&rsquo;', "'")
    content = content.replace('&lsquo;', "'")
    content = content.replace('&ldquo;', '"')
    content = content.replace('&rdquo;', '"')
    content = content.replace('&#8220;', '"')
    content = content.replace('&#8221;', '"')
    content = content.replace('&#8217;', "'")
    content = content.replace('&ndash;', '-')
    content = content.replace('/images/', '/static/images/')
    content = content.replace('/files/', '/static/files/')
    art['content'] = content
    x = open(join(path_new, filename), 'w')
    try:
        x.write(template % art)
    except Exception, ex:
        import pdb; pdb.set_trace()
        print art['slug']
    x.close()