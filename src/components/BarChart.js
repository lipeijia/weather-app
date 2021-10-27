import Chart, { Bar } from './Chart';

export default function BarChart({ max_temp, min_temp }) {
  const barWidth = 36;
  const barMargin = 20;
  const width = 150;
  const height = 120;
  return (
    <Chart height={height} width={width}>
      <Bar
        x={40}
        y={height - Math.round(max_temp * 2)}
        width={barWidth}
        height={Math.round(max_temp * 2)}
        text={max_temp.toFixed(1)}
        fill='#C88C32'
      />
      <Bar
        x={40 + barWidth + barMargin}
        y={height - Math.round(min_temp * 2)}
        width={barWidth}
        height={Math.round(min_temp * 2)}
        text={min_temp.toFixed(1)}
        fill='#02AFBE'
      />
    </Chart>
  );
}
