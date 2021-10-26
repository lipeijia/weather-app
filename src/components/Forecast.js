import BarChart from './BarChart';
import PieChart from './PieChart';
import { arrangeData, applicableDate } from '../utils/helper';

export default function Forecast({ data = [] }) {
  let dates = applicableDate(data, 'applicable_date');
  let max_temp = arrangeData(data, 'max_temp');
  let min_temp = arrangeData(data, 'min_temp');
  let humidity = arrangeData(data, 'humidity');

  return (
    <>
      <PieChart />
      <p>Max Temperature</p>
      <BarChart data={max_temp || []} dates={dates || []} />
      <BarChart data={min_temp || []} dates={dates || []} />
    </>
  );
}
