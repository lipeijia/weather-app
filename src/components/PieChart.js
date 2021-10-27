export default function PieChart({ humidity }) {
  const circumference = 31.4;
  const strokeDash = Math.round((humidity * circumference) / 100);
  return (
    <svg id='pie' height='20' width='20' viewBox='0 0 20 20'>
      <circle
        r='10'
        cx='10'
        cy='10'
        fill='white'
        stroke='#00697D'
        strokeWidth='0.4'
      />
      <circle
        r='5'
        cx='10'
        cy='10'
        fill='transparent'
        stroke='#00697D'
        strokeWidth='10'
        strokeDasharray={`${strokeDash} ${circumference}`}
        transform='rotate(-90) translate(-20)'
      />
    </svg>
  );
}
