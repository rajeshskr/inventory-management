import localforage from 'localforage';

const name = 'inventory';
const storeName = 'inventoryStore';
const key = 'invoices';
const idKey = 'auto_incr_id';

export const getInvoices = () => localforage.getItem(key);
export const setInvoices = (value) => localforage.setItem(key, value);

export const getKey = () => localforage.getItem(idKey);
export const setKey = (id) => localforage.setItem(idKey, id);

// eslint-disable-next-line import/prefer-default-export
export const initialize = () => {
  localforage.config({ name, storeName });
  return Promise.all([
    getKey().then((id) => {
      if (!id) {
        return setKey(0);
      }
      return Promise.resolve();
    }),
    getInvoices().then((invoices) => {
      if (!invoices) {
        return setInvoices([]);
      }
      return Promise.resolve();
    })]);
};
