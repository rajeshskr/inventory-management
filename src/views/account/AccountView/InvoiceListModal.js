/* eslint-disable radix */
/* eslint-disable no-unused-expressions */
import React, {
  useContext, useEffect, useMemo, useState
} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, Snackbar
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import {
  getInvoices, getKey, setKey, setPrintInvoice
} from 'src/localforageUtils';
import DataContext from 'src/localforageUtils/DataContext';
import { Alert } from '@material-ui/lab';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
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
  open, handleClose, id, setId
}) {
  const classes = useStyles();

  const [alertOpen, setAlertOpen] = useState(false);
  const handleAlertOpen = () => setAlertOpen(true);
  const handleAlertClose = () => setAlertOpen(false);

  const [isEdit, setIsEdit] = useState(false);
  const [invoice, setInvoice] = useState({});
  const [err, setErr] = useState({});
  const { createInvoice, openDialog } = useContext(DataContext) || {};
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (open) {
      Promise.all([getInvoices(), getKey()]).then(([invoices, billno]) => {
        const obj = invoices.find((item) => item.id === id);
        if (obj) {
          setIsEdit(true);
          setInvoice(obj);
        } else {
          setInvoice({
            billdate: moment().format('YYYY-MM-DDTHH:mm'),
            billno: (billno + 1) % 100,
            id: uuid()
          });
          setIsEdit(false);
        }
      });
    } else if (!open && isEdit) {
      setTimeout(() => setInvoice({}), 300);
    }
    if (!open) {
      setErr({});
      setIsChanged(false);
    }
  }, [open]);

  const addItem = (item) => {
    const { items = [] } = invoice;
    const newItems = [item, ...items];
    const newInvoice = { ...invoice, items: newItems };
    setInvoice(newInvoice);
    setIsChanged(true);
  };

  const deleteItems = (ids = []) => {
    const { items = [] } = invoice;
    const newItems = items.filter((item, index) => !ids.includes(index));
    const newInvoice = { ...invoice, items: newItems };
    setInvoice(newInvoice);
    setIsChanged(true);
  };

  const saveInvoice = () => {
    const {
      billno: no,
      billdate,
      fullName
    } = invoice;
    let error = {};
    !fullName && (error = { ...error, nameReq: 'Full Name is required' });
    !no && (error = { ...error, noReq: 'Bill Number is required' });
    !billdate && (error = { ...error, dateReq: 'Bill Date is required' });
    if (Object.keys(error).length) {
      setErr(error);
    } else {
      createInvoice(invoice, isEdit);
      setId(invoice.id);
      if (!isEdit) {
        setIsEdit(true);
        getKey().then((key) => {
          if (invoice.billno === ((key + 1) % 100)) {
            setKey(invoice.billno);
          }
        });
      }
      handleClose();
      handleAlertOpen();
    }
  };

  const onClose = () => {
    if (isChanged) {
      openDialog({
        description: 'There are some unsaved changes. Do you want to save the data?',
        onSuccess: saveInvoice,
        onCancel: handleClose,
        cancelText: 'Close',
        confirmText: 'Save & Close'
      });
    } else {
      handleClose();
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    if (name === 'billno' && (parseInt(value) < 0 || parseInt(value) > 100)) {
      return;
    }
    setInvoice({
      ...invoice, [name]: value
    });
    setIsChanged(true);
  };

  const totalbill = useMemo(() => {
    let total = 0;
    // eslint-disable-next-line no-unused-expressions
    invoice && invoice.items && invoice.items.forEach((obj) => {
      total += obj.quantity * obj.price;
    });
    return total.toFixed(2);
  }, [invoice]);

  const openPrint = () => {
    setPrintInvoice(invoice).then(() => {
      window.open('/print', '_blank');
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
        maxWidth="xl"
        open={open}
        onClose={onClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          <div className={classes.dialogheader}>
            <div className="MuiTypography-h4">Invoice Billing</div>
            <div>
              <Button onClick={onClose} color="primary">
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
            profileErr={err}
            deleteItems={deleteItems}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            // className={classes.bill}
          >
            {`Total Bill: Rs.${totalbill}`}
          </Button>
          <Button
            color="primary"
            className={classes.button}
            startIcon={<PrintIcon />}
            onClick={openPrint}
          >
            Print
          </Button>
          <Button
            color="primary"
            className={`${classes.button} ${classes.bill}`}
            startIcon={<SaveIcon />}
            onClick={saveInvoice}
          >
            {isEdit ? 'Update Invoice' : 'Create Invoice'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

InvoiceListModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  id: PropTypes.string,
  setId: PropTypes.func,
};
