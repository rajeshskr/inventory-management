import localforage from 'localforage';

const name = 'inventory';
const storeName = 'inventoryStore';
const key = 'invoices';

export const getInvoices = () => localforage.getItem(key);

export const setInvoices = (value) => localforage.setItem(key, value);

// eslint-disable-next-line import/prefer-default-export
export const initialize = () => {
  localforage.config({ name, storeName });
  return localforage.getItem(key).then((invoices) => {
    if (!invoices) {
      return localforage.setItem(key, []);
    }
    return Promise.resolve();
  });
};
