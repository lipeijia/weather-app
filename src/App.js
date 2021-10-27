import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { throttle, debounce } from 'lodash';
import Autocomplete from '@mui/material/Autocomplete';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Forecast from './components/Forecast';
import Loader from './components/Loader';

function App() {
  const BASE_URL = 'https://www.metaweather.com/api';
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLocation = useMemo(
    () =>
      throttle(async (query, callback) => {
        if (query && query.length > 0) {
          const res = await axios.get(
            `${BASE_URL}/location/search/?query=${query}`
          );
          if (res.data.length !== 0) {
            return callback(res.data);
          } else {
            return [];
          }
        } else {
          return [];
        }
      }, 500),
    []
  );

  const fetchWeather = useMemo(
    () =>
      debounce(async (id, callback) => {
        const res = await axios.get(`${BASE_URL}/location/${id}`);
        return callback(res.data);
      }, 0),
    []
  );

  // Show city options when user input some text.
  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return;
    }

    fetchLocation(inputValue, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }
        if (results) {
          newOptions = [...results];
        }
        setOptions(newOptions);
        console.log(newOptions);
      }
    });
    return () => {
      active = false;
    };
  }, [value, inputValue, fetchLocation]);

  // When user selected a city, then fetch weather of the city
  useEffect(() => {
    let active = true;

    if (!value) return;
    if (active) {
      setLoading(true);
      fetchWeather(value.woeid, (data) => {
        setWeather(data);
        setLoading(false);
      });
    }
    return () => {
      active = false;
    };
  }, [value, fetchWeather]);

  useEffect(() => {
    if (inputValue === '') setWeather([]);
  }, [inputValue]);

  return (
    <Container maxWidth='sm' sx={{ marginBottom: '5rem' }}>
      <Typography
        variant='h3'
        align='center'
        sx={{ marginTop: '5rem', marginBottom: '1rem' }}
      >
        Weather Forecast
      </Typography>
      <Autocomplete
        freeSolo
        disableClearable
        id='weather-app'
        filterOptions={(x) => x}
        filterSelectedOptions
        value={value}
        options={options}
        getOptionLabel={(option) => option.title}
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label='Search A City' fullWidth />
        )}
      />
      {loading ? (
        <Loader />
      ) : weather.length === 0 ? (
        ''
      ) : (
        <>
          <br />
          <Typography
            variant='h4'
            component='h4'
            align='center'
            sx={{ marginTop: '2rem', background: '#fff' }}
          >
            {value.title}
          </Typography>
          <Forecast data={weather.consolidated_weather} />
        </>
      )}
    </Container>
  );
}

export default App;
