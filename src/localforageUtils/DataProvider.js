import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { getInvoices, setInvoices } from './index';
import DataContext from './DataContext';

const DataProvider = ({ children }) => {
  const [invoices, setInvoice] = useState([]);
  const [dialogProps, setDialogProps] = useState({
    isDialogOpen: false,
    description: '',
    dialogCb: () => {},
    dialogCancelCb: () => {},
    confirmText: '',
    cancelText: ''
  });

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

  const openDialog = ({
    description, onSuccess, onCancel, confirmText, cancelText
  }) => {
    setDialogProps({
      description, dialogCb: onSuccess, dialogCancelCb: onCancel, isDialogOpen: true, confirmText, cancelText
    });
  };

  const closeDialog = () => {
    setDialogProps({ ...dialogProps, isDialogOpen: false });
    setTimeout(() => {
      setDialogProps({
        isDialogOpen: false,
        description: '',
        dialogCb: () => {},
        dialogCancelCb: () => {},
        confirmText: '',
        cancelText: ''
      });
    }, 500);
  };

  return (
    <DataContext.Provider
      value={{
        invoices,
        createInvoice,
        deleteInvoices,
        dialogProps: {
          ...dialogProps,
          closeDialog
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
