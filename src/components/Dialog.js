import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DataContext from 'src/localforageUtils/DataContext';

export default function AlertDialog() {
  const { dialogProps } = useContext(DataContext) || {};
  const {
    description,
    closeDialog,
    dialogCb,
    isDialogOpen,
    dialogCancelCb
  } = dialogProps;
  const onConfirm = () => {
    dialogCb();
    closeDialog();
  };
  const onCancel = () => {
    dialogCancelCb();
    closeDialog();
  };
  return (
    <Dialog
      open={isDialogOpen}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
