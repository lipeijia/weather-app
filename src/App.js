import React, { useMemo, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { throttle, debounce } from 'lodash';
import Forecast from './components/Forecast';

function App() {
  const BASE_URL = 'https://www.metaweather.com/api';
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const [weather, setWeather] = React.useState([]);

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

  useEffect(() => {
    let active = true;

    if (!value) return;
    if (active) {
      fetchWeather(value.woeid, (data) => {
        setWeather(data);
        console.log(data);
      });
    }

    return () => {
      active = false;
    };
  }, [value, fetchWeather]);

  return (
    <Container maxWidth='sm'>
      <Typography variant='h3'>Weather App</Typography>
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
          <TextField {...params} label='Search input' fullWidth />
        )}
      />
      <p>inputValue: {inputValue}</p>
      <Forecast data={weather.consolidated_weather} />
    </Container>
  );
}

export default App;
