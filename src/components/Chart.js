import './svg.css';
export default function Chart({ children, height, width }) {
  const gap = (height - 20) / 5;
  let renderTemps = Array.from(Array(5)).map((item, i) => (
    <text key={i} x='0' y={gap * (i + 1) + 3} fontSize={10} fill='#aaaaaa'>
      {40 - 10 * i}
    </text>
  ));

  let renderLines = Array.from(Array(4)).map((item, i) => (
    <line
      key={i}
      x1='22'
      y1={gap * (i + 1)}
      x2={width + 20}
      y2={gap * (i + 1)}
      stroke='#dcdcdc'
      strokeWidth='1'
    />
  ));

  return (
    <svg width={width} height={height}>
      <rect x={20} width={width} height={height - 20} fill='#f8f8ff' />
      <line
        x1='20'
        y1='0'
        x2='20'
        y2={height - 20}
        stroke='#aaaaaa'
        strokeWidth='2'
      />
      <line
        x1='20'
        y1={height - 20}
        x2={width + 20}
        y2={height - 20}
        stroke='#aaaaaa'
        strokeWidth='2'
      />
      {renderLines}
      {renderTemps}

      <svg
        x={0}
        viewBox={`0 0 ${width} ${height}`}
        height={height}
        width={width}
      >
        {children}
        <text x='48' y={height - 5} fontSize={12} fill='#C88C32'>
          Max
        </text>
        <text x='105' y={height - 5} fontSize={12} fill='#02AFBE'>
          Min
        </text>
      </svg>
    </svg>
  );
}

export const Bar = ({ x, y, height, width, text, fill }) => {
  return (
    <>
      <text x={x + 5} y={y - 28} fontSize='14'>
        {text}
      </text>
      <rect x={x} y={y - 20} height={height} width={width} fill={fill} />
    </>
  );
};

export const greatestValue = (values, minHeight) =>
  values.reduce((acc, cur) => (cur > acc ? cur : acc), minHeight);
