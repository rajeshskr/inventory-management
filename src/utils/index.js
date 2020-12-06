// eslint-disable-next-line import/prefer-default-export
export const float = (value) => parseFloat(value || 0);
export const currency = (value) => `₹${float(value).toFixed(2)}`;
