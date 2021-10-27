import BarChart from './BarChart';
import PieChart from './PieChart';
import './forecast.css';
import { applicableDate } from '../utils/helper';

export default function Forecast({ data = [] }) {
  const BASE_URL = 'https://www.metaweather.com';

  if (data.length === 0) {
    return <p>Please Type A City Name</p>;
  }
  return (
    <>
      {data.map((item) => (
        <div key={item.id} className='forecast'>
          <p>{applicableDate(item.applicable_date)}</p>
          <div>
            <img
              width={60}
              height={60}
              src={`${BASE_URL}/static/img/weather/${item.weather_state_abbr}.svg`}
              alt=''
            />
            <p>{item.weather_state_name}</p>
          </div>

          <BarChart max_temp={item.max_temp} min_temp={item.min_temp} />
          <div>
            <PieChart humidity={item.humidity} />
            <p>Humidity: {item.humidity}%</p>
          </div>
        </div>
      ))}
    </>
  );
}
