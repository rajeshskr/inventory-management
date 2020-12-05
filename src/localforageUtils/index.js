import localforage from 'localforage';

const name = 'inventory';
const storeName = 'inventoryStore';
const keys = {
  INVOICES: 'invoices',
  CURR_BILL_NO: 'auto_incr_id',
  PRINT_INVOICE: 'print-invoice'
};

export const getInvoices = () => localforage.getItem(keys.INVOICES);
export const setInvoices = (value) => localforage.setItem(keys.INVOICES, value);

export const getKey = () => localforage.getItem(keys.CURR_BILL_NO);
export const setKey = (id) => localforage.setItem(keys.CURR_BILL_NO, id);

export const getPrintInvoice = () => localforage.getItem(keys.PRINT_INVOICE);
export const setPrintInvoice = (invoice) => localforage.setItem(keys.PRINT_INVOICE, invoice);

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
