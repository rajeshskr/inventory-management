import React, { useContext, useState } from 'react';
import {
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import DataContext from 'src/localforageUtils/DataContext';
import InvoiceListModal from 'src/views/account/AccountView/InvoiceListModal';
import moment from 'moment';
import Results from './Results';
import Sales from './Sales';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    // paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const { invoices } = useContext(DataContext) || {};

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [id, setId] = useState('');

  const addInvoice = () => {
    handleOpen();
    setId('');
  };

  const editInvoice = (uId) => {
    handleOpen();
    setId(uId);
  };

  let billCounts = new Map();
  let totalSales = new Map();
  let dates = new Map();
  invoices.forEach((invoice) => {
    const date = moment(invoice.billdate).format('DD MMM YYYY');
    dates.set(date, date);
    billCounts.set(
      date,
      (billCounts.get(date) || 0) + 1
    );
    let total = 0;
    // eslint-disable-next-line no-unused-expressions
    invoice.items && invoice.items.forEach((obj) => {
      total += obj.quantity * obj.price;
    });
    totalSales.set(
      date,
      (totalSales.get(date) || 0) + total
    );
  });
  billCounts = [...billCounts.values()];
  totalSales = [...totalSales.values()];
  dates = [...dates.values()];

  return (
    <Page
      className={classes.root}
      title="Furniture Point | Inventory Management System"
    >
      <Grid
        container
        spacing={3}
        maxWidth={false}
        style={{
          padding: '20px'
        }}
      >
        {/* <Toolbar /> */}
        <Grid item xs={12} mt={3}>
          <Results customers={invoices} editInvoice={editInvoice} addInvoice={addInvoice} />
        </Grid>
        <Grid item xs={6} mt={3}>
          <Sales billCounts={billCounts} totalSales={totalSales} dates={dates} />
        </Grid>
      </Grid>
      <InvoiceListModal
        open={open}
        handleClose={handleClose}
        id={id}
        setId={setId}
      />
    </Page>
  );
};

export default CustomerListView;
