from flask import Flask, render_template, abort, make_response
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/rss.xml')
def rss():
    response = make_response(render_template('rss.xml'))
    response.mimetype = "application/rss+xml"
    return response

@app.route('/python.xml')
def python():
    response = make_response(render_template('python.xml'))
    response.mimetype = "application/rss+xml"
    return response

@app.route('/about/')
def about():
    return render_template('about.html')

@app.route('/cv/')
def cv():
    return render_template('cv.html')

@app.route('/presentations/')
def presentations():
    return render_template('presentations.html')

@app.route('/contact/')
def contact():
    return render_template('contact.html')

@app.route('/articles/')
def articles():
    return render_template('articles.html')

@app.route('/article/<title>')
def article(title='home'):
    try:
        result = render_template('articles/%s.html' % title)
        return result
    except Exception as ex:
        abort(500)

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def error(error):
    return render_template('oops.html'), 500

@app.route('/oops/')
def error(error):
    return render_template('oops.html'), 500

if __name__ == '__main__':
    app.run()
