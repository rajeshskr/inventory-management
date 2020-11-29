import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { getInvoices, setInvoices } from './index';
import DataContext from './DataContext';

const DataProvider = ({ children }) => {
  const [invoices, setInvoice] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [desc, setDesc] = useState('');
  const [dialogCb, setDialogCb] = useState(() => () => ({}));
  const [dialogCancelCb, setDialogCancelCb] = useState(() => () => ({}));

  useEffect(() => {
    getInvoices().then((data) => setInvoice(data));
  }, []);

  const createInvoice = useCallback(async (newInvoice = {}, isEdit) => {
    const editIndex = invoices.findIndex((obj) => obj.id === newInvoice.id);
    const newList = [...invoices];
    if (isEdit && editIndex !== -1) {
      newList[editIndex] = newInvoice;
    } else if (!isEdit) {
      newList.unshift({ id: uuid(), ...newInvoice });
    }
    setInvoice(newList);
    return setInvoices(newList);
  }, [invoices]);

  const deleteInvoices = useCallback(async (ids) => {
    const newList = invoices.filter((invoice) => !ids.includes(invoice.id));
    setInvoice(newList);
    return setInvoices(newList);
  });

  const openDialog = ({ description, onSuccess, onCancel }) => {
    setDesc(description);
    setDialogOpen(true);
    setDialogCb(() => onSuccess);
    setDialogCancelCb(() => onCancel);
  };

  const closeDialog = () => {
    setDesc('');
    setDialogOpen(false);
    setDialogCb(() => () => ({}));
  };

  return (
    <DataContext.Provider
      value={{
        invoices,
        createInvoice,
        deleteInvoices,
        dialogProps: {
          description: desc,
          closeDialog,
          dialogCb,
          isDialogOpen,
          dialogCancelCb
        },
        openDialog
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
