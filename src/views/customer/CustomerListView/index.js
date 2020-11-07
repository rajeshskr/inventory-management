import React, { useContext, useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import DataContext from 'src/localforageUtils/DataContext';
import InvoiceListModal from 'src/views/account/AccountView/InvoiceListModal';
import Results from './Results';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const { invoices } = useContext(DataContext) || {};

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [billno, setBillNo] = useState('');

  const addInvoice = () => {
    handleOpen();
    setBillNo('');
  };

  const editInvoice = (no) => {
    handleOpen();
    setBillNo(no);
  };

  return (
    <Page
      className={classes.root}
      title="Furniture Point | Inventory Management System"
    >
      <Container maxWidth={false}>
        <Toolbar addInvoice={addInvoice} />
        <Box mt={3}>
          <Results customers={invoices} editInvoice={editInvoice} />
        </Box>
      </Container>
      <InvoiceListModal
        open={open}
        handleClose={handleClose}
        billno={billno}
        setBillNo={setBillNo}
      />
    </Page>
  );
};

export default CustomerListView;
