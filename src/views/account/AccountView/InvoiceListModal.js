import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog, DialogActions, DialogContent, DialogTitle, makeStyles
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
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

export default function InvoiceListModal({ open, handleClose }) {
  const classes = useStyles();
  return (
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
            >
              Save
            </Button>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </div>
        </div>

      </DialogTitle>
      <DialogContent>
        <Account />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.bill}
        >
          Total Bill: 123124.23
        </Button>
      </DialogActions>
    </Dialog>
  );
}

InvoiceListModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
};
