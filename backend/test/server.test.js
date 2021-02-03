const processOpenWeatherData = require('../server.js');
const assert = require('assert');

const sampleWeatherData = {
  "coord": {
    "lon": 12.4688,
    "lat": 55.8125
  },
  "weather": [
      {
        "id": 804,
        "main": "Clouds",
        "description": "overcast clouds",
        "icon": "04n"
      }
  ],
  "base": "stations",
  "main": {
    "temp": -2.21,
    "feels_like": -5.89,
    "temp_min": -2.78,
    "temp_max": -1.67,
    "pressure": 1005,
    "humidity": 92
  },
  "visibility": 10000,
  "wind": {
    "speed": 1.79,
    "deg": 3,
    "gust": 3.13
  },
  "clouds": {
    "all": 99
  },
  "dt": 1612312756,
  "sys": {
    "type": 3,
    "id": 2035645,
    "country": "DK",
    "sunrise": 1612335619,
    "sunset": 1612367252
  },
  "timezone": 3600,
  "id": 2621941,
  "name": "Holte",
  "cod": 200
};


describe('processOpenWeatherData', function() {
  it('returns a basic subset of weather data', function() {
    const basicWeatherData = processOpenWeatherData(sampleWeatherData);
    assert.strictEqual(basicWeatherData.temperature, -2.21);
    assert.strictEqual(basicWeatherData.humidity, 92);
    assert.strictEqual(basicWeatherData.wind.speed, 1.79);
    assert.strictEqual(basicWeatherData.wind.deg, 3);
  });
});
