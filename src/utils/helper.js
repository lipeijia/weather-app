export const arrangeData = (data, keyItem) =>
  data.reduce((acc, cur) => [...acc, +cur[keyItem].toFixed(1)], []);

export const applicableDate = (data, keyItem) =>
  data.reduce(
    (acc, cur) => [...acc, cur[keyItem].slice(5).replace('-', '/')],
    []
  );
