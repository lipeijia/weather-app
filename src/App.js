import React, { useMemo, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { throttle } from 'lodash';

function App() {
  const BASE_URL = 'https://www.metaweather.com/api';
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);

  const fetchLocation = useMemo(
    () =>
      throttle(async (query, callback) => {
        if (query && query.length > 0) {
          const res = await axios.get(
            `${BASE_URL}/location/search/?query=${query}`
          );
          console.log(res.data);
          return callback(res.data);
        } else {
          return [];
        }
      }, 1000),
    []
  );

  // const debouncedFetchData = throttle((query, callback) => {
  //   fetchLocation(query, callback);
  // }, 1000);

  // useEffect(() => {
  //   debouncedFetchData(inputValue);
  // }, [inputValue, debouncedFetchData]);

  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetchLocation(inputValue, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetchLocation]);

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
      <p>value: {value}</p>
      {/* <p>options: {options}</p> */}
    </Container>
  );
}

export default App;
