import fetch from 'node-fetch';
import { URL } from 'url';

const BASE_URL = 'https://api.football-data.org/v2/';

const headers = {
  'X-Auth-Token': 'cb0132f50b904abd8995514599f52b2b',
};

export const apiRequest = async (route = '', params = {}) => {
  const url = new URL(`${BASE_URL}${route}`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  const response = await fetch(url, { headers });

  return await response.json();
};

export const queryDate = (date = new Date()) => {
  const now = date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const arr = now.split('/');
  [arr[0], arr[1]] = [arr[1], arr[0]];

  const queryDate = arr.reverse().join('-');

  return queryDate;
};

export const yesterday = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);

  return queryDate(date);
};

export const resultsObject = (matches = []) => {
  return matches.reduce(
    (
      result,
      {
        id,
        score: {
          winner,
          fullTime: { homeTeam, awayTeam },
        },
      }
    ) => {
      result[id] = {
        winner,
        score: `${homeTeam}-${awayTeam}`,
      };
      return result;
    },
    {}
  );
};
