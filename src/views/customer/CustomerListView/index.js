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

  return (
    <Page
      className={classes.root}
      title="Furniture Point | Inventory Management System"
    >
      <Container maxWidth={false}>
        {/* <Toolbar /> */}
        <Box mt={3}>
          <Results customers={invoices} editInvoice={editInvoice} addInvoice={addInvoice} />
        </Box>
      </Container>
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
