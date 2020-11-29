import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
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
  CardHeader,
  Button,
} from '@material-ui/core';
import DataContext from 'src/localforageUtils/DataContext';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  deleteButton: {
    marginLeft: theme.spacing(2)
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
  }
}));

const Results = ({
  className, customers, editInvoice, addInvoice, ...rest
}) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const { deleteInvoices, openDialog } = useContext(DataContext);

  const deleteInvoiceEntries = () => {
    openDialog({
      description: 'Are you sure you want to remove the selected bills?',
      onSuccess: () => {
        deleteInvoices(selectedCustomerIds);
        setSelectedCustomerIds([]);
      }
    });
  };

  const deleteAll = () => {
    openDialog({
      description: 'Are you sure you want to remove all the bills?',
      onSuccess: () => {
        deleteInvoices(customers.map((obj) => obj.id));
        setSelectedCustomerIds([]);
      }
    });
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={(
          <>
            <Button
              color="secondary"
              onClick={addInvoice}
            >
              Add invoice
            </Button>
            <Button
              className={classes.deleteButton}
              color="secondary"
              onClick={deleteInvoiceEntries}
              disabled={!selectedCustomerIds.length}
            >
              Delete
            </Button>
            <Button
              className={classes.deleteButton}
              color="secondary"
              onClick={deleteAll}
              disabled={!customers.length}
            >
              Delete All
            </Button>
          </>
      )}
        title="Billing List"
      />
      {
      !customers.length ? (
        <CardContent>
          <Typography
            color="textPrimary"
            variant="h5"
            align="center"
          >
            No Data available
          </Typography>
        </CardContent>
      ) : (
        <TableContainer style={{ maxHeight: 525 }}>
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
                  Bill No.
                </TableCell>
                <TableCell>
                  Customer Name
                </TableCell>
                <TableCell>
                  Phone 1
                </TableCell>
                <TableCell>
                  Phone 2
                </TableCell>
                <TableCell>
                  Customer Address
                </TableCell>
                <TableCell>
                  Total Bill
                </TableCell>
                <TableCell>
                  Billed Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => {
                let billtotal = 0;
                // eslint-disable-next-line no-unused-expressions
                customer && customer.items && customer.items.forEach((obj) => {
                  billtotal += obj.quantity * obj.price;
                });
                return (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                    className={classes.row}
                    onClick={() => editInvoice(customer.id)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                        onChange={(event) => handleSelectOne(event, customer.id)}
                        onClick={(e) => e.stopPropagation()}
                        value="true"
                      />
                    </TableCell>
                    <TableCell style={{ overflowWrap: 'break-word', maxWidth: 75 }}>
                      {customer.billno}
                    </TableCell>
                    <TableCell style={{ overflowWrap: 'break-word', maxWidth: 175 }}>
                      {customer.fullName}
                    </TableCell>
                    <TableCell style={{ overflowWrap: 'break-word', maxWidth: 125 }}>
                      {customer.phone1 || 'NA'}
                    </TableCell>
                    <TableCell style={{ overflowWrap: 'break-word', maxWidth: 125 }}>
                      {customer.phone2 || 'NA'}
                    </TableCell>
                    <TableCell style={{ overflowWrap: 'break-word', maxWidth: 200 }}>
                      {customer.address || 'NA'}
                    </TableCell>
                    <TableCell style={{ overflowWrap: 'break-word', maxWidth: 75 }}>
                      {`Rs. ${(billtotal || 0).toFixed(2)}`}
                    </TableCell>
                    <TableCell style={{ overflowWrap: 'break-word', maxWidth: 120 }}>
                      {moment(customer.billdate).format('DD MMM YYYY HH:mm A')}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )
}
    </Card>
  );
};

Results.propTypes = {
  addInvoice: PropTypes.func,
  className: PropTypes.string,
  customers: PropTypes.array.isRequired,
  editInvoice: PropTypes.func
};

export default Results;
