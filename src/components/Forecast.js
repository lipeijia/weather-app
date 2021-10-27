import BarChart from './BarChart';
import PieChart from './PieChart';
import { applicableDate } from '../utils/helper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './forecast.css';

export default function Forecast({ data = [] }) {
  const BASE_URL = 'https://www.metaweather.com';

  if (data.length === 0) {
    return <p>Please Type A City Name</p>;
  }
  return (
    <>
      <div className='forecast_header'>
        <Typography variant='subtitle1'>Date</Typography>
        <Typography variant='subtitle1'>Clouds</Typography>
        <Typography variant='subtitle1'>Temperature</Typography>
        <Typography variant='subtitle1'>Humidity</Typography>
      </div>
      {data.map((item) => (
        <div key={item.id} className='forecast'>
          <Typography variant='h6' component='p'>
            {applicableDate(item.applicable_date)}
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <img
              width={60}
              height={60}
              src={`${BASE_URL}/static/img/weather/${item.weather_state_abbr}.svg`}
              alt=''
            />
            <Typography variant='body1' sx={{ paddingTop: '1rem' }}>
              {item.weather_state_name}
            </Typography>
          </Box>

          <BarChart max_temp={item.max_temp} min_temp={item.min_temp} />
          <Box sx={{ textAlign: 'center' }}>
            <PieChart humidity={item.humidity} />
            <Typography variant='body1' sx={{ paddingTop: '1rem' }}>
              {item.humidity}%
            </Typography>
          </Box>
        </div>
      ))}
    </>
  );
}
