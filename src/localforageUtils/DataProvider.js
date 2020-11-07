import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getInvoices, setInvoices } from './index';
import DataContext from './DataContext';

const DataProvider = ({ children }) => {
  const [invoices, setInvoice] = useState([]);
  useEffect(() => {
    getInvoices().then((data) => setInvoice(data));
  }, []);

  const createInvoice = useCallback(async (newInvoice = {}, isEdit) => {
    const editIndex = invoices.findIndex((obj) => obj.billno === newInvoice.billno);
    const newList = [...invoices];
    if (isEdit && editIndex !== -1) {
      newList[editIndex] = newInvoice;
    } else if (!isEdit) {
      newList.unshift(newInvoice);
    }
    setInvoice(newList);
    return setInvoices(newList);
  }, [invoices]);

  return (
    <DataContext.Provider
      value={{
        invoices,
        createInvoice
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataProvider;
