import Box from '@material-ui/core/Box';

import CitySearch from './CitySearch';
import WeatherReport from './WeatherReport';
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import utils from '../utils.js';

function WeatherWidget() {
  const [city, setCity] = useState();
  let history = useHistory();

  const updateCity = (newCity='Copenhagen') => {
    if (city === newCity) return;

    const searchParams = new URLSearchParams(history.location.search);
    searchParams.set("city", newCity);
    history.push({
      pathname: history.location.pathname,
      search: searchParams.toString(),
      state: {
        ...history.location.state,
        city: newCity
      }
    });
  }

  useEffect(() => {
    // register the history unlistener with the cleanup function.
    // history.listen() conveniently returns its own unlistener
    return history.listen(location => {
      // read city from url if the state has yet to be defined
      const locationCity = location.state ? location.state.city || 'Copenhagen' : utils.readParamFromUrl("city");

      if (locationCity !== city) {
        setCity(locationCity);
      }
    })
  }, [history]);

  // update city on mount
  useEffect(() => {
    updateCity(utils.readParamFromUrl("city"));
  }, []);

  return (
    <Box m={5}>
      <WeatherReport city={city} />
      <CitySearch onSelect={updateCity} />
    </Box>
  )
}

export default WeatherWidget;
