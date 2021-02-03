import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { weatherAPI } from '../apiClients.js';
import utils from '../utils.js';

// styled typography component; root flex
const FlexText = withStyles({
  root: {
    display: "flex"
  },
})(Typography);

// styled typography component; root flex
const ErrorText = withStyles({
  root: {
    color: "crimson",
    fontWeight: "bold"
  },
})(Typography);

// const getBasicWeatherData = (data) => {
//   const weatherData = {};
//   if (data) {
//     weatherData = {
//       temperature: data.temperature,
//       humidity: data.humidity,
//       windSpeed: data.wind.speed,
//       windDirection: utils.compassDirNameDK(utils.degToDir(weatherData.wind.deg))
//     }
//   }
//   return weatherData;
// }

/**
 * Component which fetches and displays a weather report
 * @param {string} city - Danish city for which to look up the weather
 */
function WeatherReport({city}) {
  const [cityName, setCityName] = useState();
  const [temperature, setTemperature] = useState();
  const [humidity, setHumidity] = useState();
  const [windSpeed, setWindSpeed] = useState();
  const [windDirection, setWindDirection] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    let mounted = true;
    setErrorMessage();

    weatherAPI.get('/weather', {
      params: {
        city: city
      }
    }).then(resp => {
      if (!mounted) return;

      const weatherData = resp.data.data;
      setCityName(city);
      setTemperature(weatherData.temperature);
      setHumidity(weatherData.humidity);
      setWindSpeed(weatherData.wind.speed);
      setWindDirection(utils.compassDirNameDK(utils.degToDir(weatherData.wind.deg)));

    }).catch(error => {
      let errorMsg = "Unexpected error occured";
      if (error.response) {
        errorMsg = error.response.status === 404 // expected for some cities
          ? `No weather data was found for ${city}`
          : utils.capitalize(error.response.data.msg, 1); // use server msg on unexpected status code
      }
      setErrorMessage(errorMsg);
    });

    return () => {
      mounted = false;
    }
  }, [city]);
  
  return (
    <Box mb={2}>
      {errorMessage && (
        <ErrorText>{errorMessage}</ErrorText>
      )}
      {!errorMessage && cityName && (
        <Box>
          <FlexText component="div">Weather in:&nbsp;<Box fontWeight="bold">{cityName}</Box></FlexText>
          <FlexText component="div">Temperature:&nbsp; <Box fontWeight="bold">{temperature}&deg;C</Box></FlexText>
          <FlexText component="div">Humidity:&nbsp;<Box fontWeight="bold">{humidity}</Box></FlexText>
          <FlexText component="div">Wind:&nbsp;<Box fontWeight="bold">{windSpeed} m/s {windDirection}</Box></FlexText>
        </Box>
      )}
    </Box>
  )
}

export default WeatherReport;
