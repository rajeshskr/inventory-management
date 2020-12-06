import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
  CardContent,
  TableContainer,
} from '@material-ui/core';
import { currency, float } from 'src/utils';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  container: {
    maxHeight: 500,
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%',
    textAlign: 'left'
  },
  row: {
    cursor: 'pointer'
  },
  table: {
    // maxWidth: 710,
    maxHeight: 470
  }
}));

const InvoiceTable = ({
  className,
  customers,
  handleSelectAll,
  handleSelectOne,
  selectedCustomerIds,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      {customers.length ? (
        <>
          <PerfectScrollbar>
            <Box>
              <TableContainer className={classes.table}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedCustomerIds.length === customers.length}
                          color="primary"
                          indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                          onChange={handleSelectAll}
                        />
                      </TableCell>
                      <TableCell>
                        Item Name
                      </TableCell>
                      <TableCell>
                        Price
                      </TableCell>
                      <TableCell>
                        Quantity
                      </TableCell>
                      <TableCell>
                        Item Subtotal
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className={classes.container}>
                    {customers
                      .map((customer, index) => {
                        const { itemName, quantity, price } = customer;
                        return (
                          <TableRow
                            hover
                            key={index}
                            selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                            className={classes.row}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={selectedCustomerIds.indexOf(index) !== -1}
                                onChange={(event) => handleSelectOne(event, index)}
                                value="true"
                              />
                            </TableCell>
                            <TableCell align="left" style={{ overflowWrap: 'break-word', maxWidth: 250 }}>
                              {itemName}
                            </TableCell>
                            <TableCell align="left" style={{ maxWidth: 100, overflowWrap: 'break-word', }}>
                              {currency(price)}
                            </TableCell>
                            <TableCell align="left" style={{ maxWidth: 75, overflowWrap: 'break-word', }}>
                              {quantity}
                            </TableCell>
                            <TableCell align="left" style={{ maxWidth: 120, overflowWrap: 'break-word', }}>
                              {currency(float(quantity) * float(price))}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </PerfectScrollbar>
        </>
      )
        : (
          <CardContent>
            <Typography
              color="textPrimary"
              variant="h5"
              align="center"
            >
              No Data available
            </Typography>
          </CardContent>
        )}
    </Card>
  );
};

InvoiceTable.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired,
  handleSelectAll: PropTypes.func,
  handleSelectOne: PropTypes.func,
  selectedCustomerIds: PropTypes.array,
};

export default InvoiceTable;
