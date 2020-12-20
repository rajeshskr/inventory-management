import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Button,
  Grid,
  TextField,
  makeStyles,
  CardContent,
  CardHeader,
  Card,
  Divider
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  add: {
    marginRight: theme.spacing(2),
    maxHeight: 56
  }
}));

const InvoiceItemForm = ({
  className,
  open,
  handleClose,
  addItem,
  isEdit,
  ...rest
}) => {
  const classes = useStyles();
  const [values, setValues] = useState({});
  const [err, setErr] = useState({ nameReqErr: '' });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const addInvoiceItem = () => {
    const { itemName, price = '0', quantity = '0' } = values;
    if (itemName) {
      addItem({ itemName, price, quantity });
      setValues({});
      setErr({ nameReqErr: '' });
    } else {
      setErr({ nameReqErr: 'Item Name is required' });
    }
  };

  const { itemName = '', price = '', quantity = '' } = values;
  const { nameReqErr } = err;
  const variant = isEdit ? 'filled' : 'outlined';

  return (
    <Card>

      <CardHeader title="Enter Item Information" />
      <Divider />

      <CardContent>
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
              xs={5}
            >
              <TextField
                fullWidth
                label="Item Name"
                name="itemName"
                onChange={handleChange}
                required
                value={itemName}
                variant={variant}
                InputLabelProps={{
                  shrink: true,
                }}
                error={Boolean(nameReqErr)}
                helperText={nameReqErr}
                InputProps={{
                  readOnly: isEdit
                }}
              />
            </Grid>
            <Grid
              item
              xs={2}
            >
              <TextField
                fullWidth
                type="number"
                label="Quantity"
                name="quantity"
                onChange={handleChange}
                value={quantity}
                variant={variant}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: isEdit
                }}
              />
            </Grid>
            <Grid
              item
              xs={3}
            >
              <TextField
                fullWidth
                label="Price"
                name="price"
                onChange={handleChange}
                type="number"
                value={price}
                InputLabelProps={{
                  shrink: true,
                }}
                variant={variant}
                InputProps={{
                  readOnly: isEdit
                }}
              />
            </Grid>
            <Grid
              item
              xs={2}
              style={{ display: 'flex', }}
            >
              <Button
                color="primary"
                className={classes.add}
                onClick={addInvoiceItem}
                disabled={isEdit}
                variant="outlined"
              >
                Add
              </Button>
            </Grid>

          </Grid>

        </form>
      </CardContent>
    </Card>
  );
};

InvoiceItemForm.propTypes = {
  isEdit: PropTypes.bool,
  className: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  addItem: PropTypes.func
};

export default InvoiceItemForm;
