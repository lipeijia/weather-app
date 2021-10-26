import { useState, useEffect } from 'react';
import Chart, { Bar, greatestValue } from './Chart';

export default function BarChart({ data = [], dates = [] }) {
  const barWidth = 20;
  const barMargin = 12;
  const width = data.length * (barWidth + barMargin) || 180;
  const height = greatestValue(data, 150);
  const [isData, setIsData] = useState(false);
  useEffect(() => {
    if (data.length !== 0) setIsData(true);
  }, [data]);

  const renderBar = data.map((item, i) => (
    <Bar
      key={i}
      x={i * (barWidth + barMargin) + 6}
      y={height - Math.round(item * 3)}
      width={barWidth}
      height={Math.round(item * 3)}
      text={item}
    />
  ));

  // const renderDate = dates.map((day, i) => (
  //   <text x={i * (barWidth + barMargin) + 3} y={height + 15} fontSize={10}>
  //     {day}
  //   </text>
  // ));
  return (
    <>
      <Chart height={height} width={width}>
        {isData ? renderBar : ''}
      </Chart>
    </>
  );
}
