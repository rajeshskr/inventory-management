import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Grid,
  TextField,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const InvoiceItemForm = ({
  className, open, handleClose, ...rest
}) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    itemName: 'alabama',
    quantity: '12',
    price: '1234'
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">
        Enter Item Information
      </DialogTitle>
      <DialogContent>
        <form
          autoComplete="off"
          noValidate
          className={clsx(classes.root, className)}
          {...rest}
        >

          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                label="Item Name"
                name="itemName"
                onChange={handleChange}
                required
                value={values.itemName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              <TextField
                fullWidth
                type="number"
                label="Quantity"
                name="quantity"
                onChange={handleChange}
                value={values.quantity}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              <TextField
                fullWidth
                label="Price"
                name="price"
                onChange={handleChange}
                type="number"
                value={values.price}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Box
              display="flex"
              justifyContent="flex-end"
              p={1}
            >
              <Button
                color="primary"
                variant="contained"
              >
                Save
              </Button>
            </Box>
          </DialogActions>

        </form>
      </DialogContent>
    </Dialog>
  );
};

InvoiceItemForm.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func
};

export default InvoiceItemForm;
