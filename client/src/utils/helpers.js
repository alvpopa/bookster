export const toDate = date => {
  return new Date(date).toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  });
};

export const getHour = date => {
  return new Date(date).toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

const random = (min, max) => {
  return min + Math.random() * (max - min);
};

const randomFill = () => {
  const arr = [];
  let total = 0;

  // fill an array with random numbers
  for (let i = 0; i < 3; i++) arr.push(random(4, 7));

  // add up all the numbers
  for (let i = 0; i < 3; i++) total += arr[i];

  // normalize so numbers add up to 1
  for (let i = 0; i < 3; i++) arr[i] = Number(arr[i] / total).toFixed(2);

  return arr.map(value => Number(1 / value).toFixed(2));
};

export const oddMaker = ({ numberOfMatches, homeTeam }) => {
  const percentages = Object.values(homeTeam).map(value => {
    return Number((value * 100) / numberOfMatches).toFixed(2);
  });
  return percentages.some(value => +value === 0 || isNaN(value))
    ? randomFill()
    : percentages.map(value => Number(100 / value).toFixed(2));
};

export const eventColor = (status = 3) => {
  if (typeof status === 'object') return 'info';
  if (status) return 'success';
  if (!status) return 'danger';
};
