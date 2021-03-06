import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardHeader,
  Divider,
  makeStyles,
} from '@material-ui/core';
import DataContext from 'src/localforageUtils/DataContext';
import InvoiceTable from './InvoiceTable';

const useStyles = makeStyles(() => ({
  root: {}
}));

const InvoiceList = ({
  className, items, deleteItems, isEdit, ...rest
}) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = items.map((customer, index) => index);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };
  const { openDialog } = useContext(DataContext) || {};
  const deleteSelected = () => {
    openDialog({
      description: 'Are you sure you want to delete selected items?',
      onSuccess: () => {
        deleteItems(selectedCustomerIds);
        setSelectedCustomerIds([]);
      },
      cancelText: 'No',
      confirmText: 'Yes'
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          action={!isEdit ? (
            <Button
              color="secondary"
              onClick={deleteSelected}
              disabled={!selectedCustomerIds.length}
            >
              Delete Items
            </Button>
          ) : undefined}
          title="Invoice Particulars"
        />
        <Divider />
        <InvoiceTable
          customers={items}
          handleSelectAll={handleSelectAll}
          handleSelectOne={handleSelectOne}
          selectedCustomerIds={selectedCustomerIds}
          isEdit={isEdit}
        />
      </Card>
    </form>
  );
};

InvoiceList.propTypes = {
  isEdit: PropTypes.bool,
  className: PropTypes.string,
  items: PropTypes.array,
  deleteItems: PropTypes.func
};

export default InvoiceList;
