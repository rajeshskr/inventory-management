import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardHeader,
  Divider,
  makeStyles,
} from '@material-ui/core';
import InvoiceTable from './InvoiceTable';

const useStyles = makeStyles(() => ({
  root: {}
}));

const InvoiceList = ({ className, items, ...rest }) => {
  const classes = useStyles();

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
            <Button
              color="secondary"
            >
              Delete Items
            </Button>
        )}
          title="Invoice Items List"
        />
        <Divider />
        <InvoiceTable customers={items} />
      </Card>
    </form>
  );
};

InvoiceList.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array
};

export default InvoiceList;
