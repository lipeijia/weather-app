import './svg.css';
export default function Chart({ children, height, width }) {
  const gap = height / 5;
  let renderTemps = Array.from(Array(5)).map((item, i) => (
    <text x='0' y={gap * (i + 1)}>
      {40 - 10 * i}
    </text>
  ));

  let renderLines = Array.from(Array(4)).map((item, i) => (
    <line
      x1='22'
      y1={gap * (i + 1)}
      x2={width + 20}
      y2={gap * (i + 1)}
      stroke='#b3d9ff'
      stroke-width='1'
    />
  ));

  return (
    <svg>
      <rect x={20} width={width} height={height} fill='#e6f2ff' />
      <line x1='20' y1='0' x2='20' y2={height} stroke='black' strokeWidth='2' />
      <line
        x1='20'
        y1={height}
        x2={width + 20}
        y2={height}
        stroke='black'
        stroke-width='2'
      />
      {renderLines}
      {renderTemps}
      <svg
        x={20}
        viewBox={`0 0 ${width} ${height}`}
        height={height}
        width={width}
      >
        {children}
      </svg>
    </svg>
  );
}

export const Bar = ({ x, y, height, width, text = 0 }) => (
  <>
    {text !== 0 && (
      <text x={x} y={y - 4} fontSize='11'>
        {text}
      </text>
    )}
    <rect x={x} y={y} height={height} width={width} />
  </>
);

export const greatestValue = (values, minHeight) =>
  values.reduce((acc, cur) => (cur > acc ? cur : acc), minHeight);
