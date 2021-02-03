require('dotenv').config();
const axios = require('axios');
const express = require('express');

const server = express();

const weatherAPI = axios.create({
  baseURL: 'https://api.openweathermap.org',
  params: {
    appid: process.env.API_KEY_OPENWEATHERMAP,
    units: 'metric'
  }
});

// allow cors to avoid setting up proxy in demo
server.use(function(_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const processOpenWeatherData = (data) => {
  if (!data || !data.main) 
    throw Error("Could not extract required weather information from response data");
  return {
    temperature: data.main.temp,
    humidity: data.main.humidity,
    wind: data.wind,
  }
}

const getWeatherReportHTML = (city, temperature, humidity, wind) => {
  return `
    <div style="margin: 10px; width: 300px;">
      <div>
          <div>Weather in: <b>${city}</b></div>
          <div>Temperature: <b>${temperature}</b></div>
          <div>Humidity: <b>${humidity}</b></div>
          <div>Wind: <b>${wind.speed}</b></div>
          <form action="http://localhost:5000/nojs/weather" style="display: flex;">
            <input type="text" name="city" placeholder="City">
            <button type="submit">Search</button>
          </form>
        </ul>
      </div>
    </div>
  `
}

server.get("/nojs/weather", (req, res) => {
  const city = req.query.city;
  // res.redirect(`/weather/html?city=${city}`);
  weatherAPI.get('/data/2.5/weather', {
    params: {
      q: `${city},dk` // append country id
    }
  }).then(resp => {
    const {temperature, humidity, wind} = processOpenWeatherData(resp.data);
    res.send(getWeatherReportHTML(city, temperature, humidity, wind))
  });
});

server.get("/weather", (req, res) => {
  const city = req.query.city;
  
  weatherAPI.get('/data/2.5/weather', {
    params: {
      q: `${city},dk` // append country id
    }
  }).then(resp => {
    try {
      const {temperature, humidity, wind} = processOpenWeatherData(resp.data);
      res.json({
        status: "success",
        msg: "Fetched basic weather data",
        data: {
          temperature,
          humidity,
          wind
        }
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        msg: error.message
      })
    }
  }).catch(error => {
    res.status(error.response.data.cod).json({
      status: "error",
      msg: error.response.data.message
    })
  });
});

if (!module.parent) {
  server.listen(process.env.PORT, () => {
    console.log(`Listening at ${process.env.HOST}:${process.env.PORT}`)
  });
}

module.exports = processOpenWeatherData;
