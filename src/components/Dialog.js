/* eslint-disable no-unused-expressions */
import React, { useContext } from 'react';
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
    dialogCancelCb,
    cancelText,
    confirmText
  } = dialogProps;
  const onConfirm = () => {
    dialogCb && dialogCb();
    closeDialog();
  };
  const onCancel = () => {
    dialogCancelCb && dialogCancelCb();
    closeDialog();
  };
  return (
    <Dialog
      open={isDialogOpen}
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
          {cancelText || 'Cancel'}
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          {confirmText || 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
