import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import { dawaAPI } from '../apiClients.js';

/**
 * Extracts the city information from reponses returned
 * from the DAWA /stednavne2 API.
 * @param {Object[]} data - JSON response data from the API.
 * @returns {Object[]} An array of city objects.
 */
const _extractCityInfo = (data) => {
  return data ? data.map(city => ({
    name: city.navn,
    counties: city.sted.kommuner.map(county => county.navn),
  })) : [];
}

/**
 * Fetches city information based on query strings.
 * Lookups are made via the DAWA API client.
 * @param {string} query - Lookup string used to search for cities 
 */
const lookUpCities = async (query) => {
  try {
    const resp = await dawaAPI.get('/stednavne2/autocomplete', {
      params: {
        q: query
      }
    });
    return _extractCityInfo(resp.data);

  } catch (error) {
    console.log(error);
    return [];
  }
}

function CitySearch({onSelect}) {
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [cityOptions, setCityOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCityChange = (city) => {
    if (!city) return;
    onSelect(city.name);
  }
  
  // debounce search input before performing query updates
  useEffect(() => {
    if (searchInput.length === 0) return;

    const debounce = setTimeout(() => {
      setCityQuery(searchInput);
    }, 400);

    return () => {
      clearTimeout(debounce);
    }
  }, [searchInput]);

  // set loading whenever a new city is queried
  useEffect(() => {
    setLoading(true);
  }, [cityQuery])

  useEffect(() => {
    // remove options when search is no longer open
    if (!open) {
      setCityOptions([]);
      setLoading(false);
    }
  }, [open]);

  // API lookup whenever a load is initiated
  useEffect(() => {
    if (!loading) return;

    lookUpCities(cityQuery).then(cities => {
      if (loading) {
        setCityOptions(cities);
      }
    }).finally(() => {
      setLoading(false);
    });

  }, [loading]);

  return (
    <Autocomplete
      id="city-search"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => `${option.name} (${option.counties.join(", ")})`}
      options={cityOptions}
      loading={loading}
      onChange={(event, value) => handleCityChange(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Enter city"
          variant="outlined"
          onChange={(e) => setSearchInput(e.target.value)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  )
}

export default CitySearch;
