/* eslint-disable no-unused-expressions */
import localforage from 'localforage';
import { getJsonFromUrl } from 'src/utils';

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

export const getPrintInvoice = () => {
  const query = getJsonFromUrl();
  return localforage.getItem(keys.PRINT_INVOICE).then((map) => {
    (!map || !map.size) && (map = new Map());
    return (map.get(query.printId) || {});
  });
};

export const setPrintInvoice = (invoice) => {
  localforage.getItem(keys.PRINT_INVOICE).then((invoices) => {
    (!invoices || !invoices.size) && (invoices = new Map());
    invoices.set(invoice.id, invoice);
    localforage.setItem(keys.PRINT_INVOICE, invoices);
  });
  return Promise.resolve();
};

export const removePrintInvoice = () => {
  const query = getJsonFromUrl();
  localforage.getItem(keys.PRINT_INVOICE).then((invoices) => {
    (!invoices || !invoices.size) && (invoices = new Map());
    invoices.delete(query.printId);
    localforage.setItem(
      keys.PRINT_INVOICE,
      invoices
    );
  });
};

// eslint-disable-next-line import/prefer-default-export
export const initialize = () => {
  localforage.config({ name, storeName });
  return Promise.all([
    getKey().then((id) => {
      if (!id) {
        return setKey(100);
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
