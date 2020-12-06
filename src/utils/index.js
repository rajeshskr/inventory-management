import React from 'react';
// eslint-disable-next-line import/prefer-default-export
export const float = (value) => parseFloat(value || 0);
export const currency = (value) => `₹${float(value).toFixed(2)}`;
export const addr = (value = '') => value.split('\n').map((line, index) => (
  <div key={index}>{line}</div>
));

export function getJsonFromUrl(url) {
  if (!url) url = window.location.search;
  const query = url.substr(1);
  const result = {};
  query.split('&').forEach((part) => {
    const item = part.split('=');
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}
