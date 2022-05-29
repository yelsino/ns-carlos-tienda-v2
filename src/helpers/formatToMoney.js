export const formatToMoney = value => {
  const format = (
    (Math.round(((Math.round(value * 100) / 5) * 5) / 5) * 5) /
    100
  ).toFixed(2);

  return format;
};
