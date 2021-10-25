import React, { useEffect, useCallback, useMemo } from 'react';

export default function Forecast({ temp = [] }) {
  const arrangeData = useMemo(
    () => (keyItem) =>
      temp.reduce((acc, cur) => [...acc, +cur[keyItem].toFixed(1)], []),
    [temp]
  );
  useEffect(() => {
    const max_temp = arrangeData('max_temp');
    const min_temp = arrangeData('min_temp');
    const humidity = arrangeData('humidity');
    console.log(max_temp, min_temp, humidity);
  }, [temp, arrangeData]);

  return <div></div>;
}
