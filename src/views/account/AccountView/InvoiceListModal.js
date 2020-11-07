import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, Snackbar
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import { getInvoices } from 'src/localforageUtils';
import DataContext from 'src/localforageUtils/DataContext';
import { Alert } from '@material-ui/lab';
import Account from '.';

const useStyles = makeStyles((theme) => ({
  root: {},
  dialogheader: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  button: {
    marginLeft: theme.spacing(1)
  },
  bill: {
    marginRight: theme.spacing(3)
  }
}));

export default function InvoiceListModal({
  open, handleClose, billno, setBillNo
}) {
  const classes = useStyles();

  const [alertOpen, setAlertOpen] = useState(false);
  const handleAlertOpen = () => setAlertOpen(true);
  const handleAlertClose = () => setAlertOpen(false);

  const [totalbill, setTotalBill] = useState('0.00');
  const [isEdit, setIsEdit] = useState(false);
  const [invoice, setInvoice] = useState({});

  useEffect(() => {
    if (open) {
      getInvoices().then((invoices) => {
        const obj = invoices.find((item) => item.billno === billno);
        if (obj) {
          setTotalBill((obj.totalbill || 0).toFixed(2));
          setIsEdit(true);
          setInvoice(obj);
        } else {
          setIsEdit(false);
        }
      });
    } else if (!open && isEdit) {
      setInvoice({});
    }
  }, [open]);

  const addItem = (item) => {
    const { items = [] } = invoice;
    const newItems = [item, ...items];
    const newInvoice = { ...invoice, items: newItems };
    setInvoice(newInvoice);
  };

  const { createInvoice } = useContext(DataContext) || {};
  const saveInvoice = () => {
    createInvoice(invoice, isEdit);
    setBillNo(invoice.billno);
    if (!isEdit) {
      setIsEdit(true);
    }
    handleClose();
    handleAlertOpen();
  };

  const handleChange = (event) => {
    setInvoice({
      ...invoice,
      [event.target.name]: event.target.value
    });
  };

  return (
    <>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleAlertClose} severity="success" variant="filled">
          Invoice Saved !!
        </Alert>
      </Snackbar>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          <div className={classes.dialogheader}>
            <div className="MuiTypography-h4">Invoice Billing</div>
            <div>
              <Button
                color="primary"
                className={classes.button}
                startIcon={<PrintIcon />}
              >
                Print
              </Button>
              <Button
                color="primary"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={saveInvoice}
              >
                {isEdit ? 'Update Invoice' : 'Create Invoice'}
              </Button>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </div>
          </div>

        </DialogTitle>
        <DialogContent>
          <Account
            invoice={invoice}
            addItem={addItem}
            handleChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.bill}
          >
            {`Total Bill: Rs.${totalbill}`}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

InvoiceListModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  billno: PropTypes.string,
  setBillNo: PropTypes.func
};
