from flask import Flask, render_template, url_for, request
from iss_locator import ISSLocator

app = Flask(__name__)

locator = ISSLocator()

# main page
@app.route('/')
def index():
    iss_lat_long = locator.get_lat_long()
    return render_template('index.html', iss_lat = iss_lat_long['latitude'], iss_long = iss_lat_long['longitude'])

@app.errorhandler(404)
def request_page_not_found(error):
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=True, threaded=True)
