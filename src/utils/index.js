import React from 'react';
// eslint-disable-next-line import/prefer-default-export
export const float = (value) => parseFloat(value || 0);
export const currency = (value) => `₹${float(value).toFixed(2)}`;
export const addr = (value = '') => value.split('\n').map((line, index) => (
  <div key={index}>{line}</div>
));
