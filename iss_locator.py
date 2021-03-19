import requests
import datetime as dt


class ISSLocator:
    def __init__(self):
        self.iss_latitude = 0.0
        self.iss_longitude = 0.0

    def get_lat_long(self):
        """ Returns a tuple with the current time in IST and a dictionary with the current latitude and longitude of the ISS."""
        response = requests.get(url='http://api.open-notify.org/iss-now.json')
        return (dt.datetime.now().strftime("%H:%M:%S"),
                response.json()['iss_position'])
