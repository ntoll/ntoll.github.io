"""
A simple script to migrate articles from the old hand crafted website, to the
new Nikola based one.
"""
import os
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


OLD_SITE = os.path.join(BASE_DIR, "old_site")
OLD_ARTICLES = os.path.join(OLD_SITE, "site", "templates", "articles")
OLD_CONF = os.path.join(OLD_SITE, "articles.json")
POSTS = os.path.join(BASE_DIR, "posts")


# Load metadata about the old articles.
with open(OLD_CONF) as f:
    articles = json.load(f)


heading = """---
title: {}
slug: {}
date: {} UTC
description: {}
author: Nicholas H.Tollervey
---
"""


for article in articles:
    title = article.get("title")
    slug = article.get("slug")
    date = article.get("date")
    description = article.get("description", "")

    h = heading.format(title, slug, date, description)

    # load the old raw html content.
    filename = "{}.html".format(slug)
    path = os.path.join(OLD_ARTICLES, filename)
    with open(path) as f:
        raw = f.readlines()
        body = raw[4:-1]
    output = os.path.join(POSTS, filename)
    content = h + ''.join(body)
    with open(output, "w") as f:
        f.write(content)
    print("Written out, ", output) 
