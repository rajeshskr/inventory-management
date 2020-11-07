import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardHeader,
  Divider,
  makeStyles,
} from '@material-ui/core';
import data from 'src/views/customer/CustomerListView/data';
import InvoiceTable from './InvoiceTable';
import InvoiceItemForm from './InvoiceItemForm';

const useStyles = makeStyles(() => ({
  root: {}
}));

const InvoiceList = ({ className, ...rest }) => {
  const classes = useStyles();

  const [customers] = useState(data);

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          action={(
            <>
              <Button
                color="secondary"
                onClick={handleOpen}
              >
                Add Item
              </Button>
              <Button
                color="secondary"
              >
                Delete Items
              </Button>
            </>

        )}
          title="Invoice List"
        />
        <Divider />
        <InvoiceTable customers={customers} />
      </Card>
      <InvoiceItemForm open={open} handleClose={handleClose} />
    </form>
  );
};

InvoiceList.propTypes = {
  className: PropTypes.string
};

export default InvoiceList;
