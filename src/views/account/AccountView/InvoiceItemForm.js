import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
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
    marginRight: theme.spacing(2)
  }
}));

const InvoiceItemForm = ({
  className,
  open,
  handleClose,
  addItem,
  ...rest
}) => {
  const classes = useStyles();
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const addInvoiceItem = () => {
    addItem(values);
    setValues({});
  };

  const { itemName = '', price = '', quantity = '' } = values;

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
              xs={12}
            >
              <TextField
                fullWidth
                label="Item Name"
                name="itemName"
                onChange={handleChange}
                required
                value={itemName}
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
                value={quantity}
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
                value={price}
                variant="outlined"
              />
            </Grid>
          </Grid>

        </form>
      </CardContent>
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={1}
      >
        <Button
          color="primary"
          className={classes.add}
          onClick={addInvoiceItem}
        >
          Add To List
        </Button>
      </Box>
    </Card>
  );
};

InvoiceItemForm.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  addItem: PropTypes.func
};

export default InvoiceItemForm;
