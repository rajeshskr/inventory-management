/* eslint-disable no-unused-expressions */
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
  TextField,
} from '@material-ui/core';
import DataContext from 'src/localforageUtils/DataContext';
import { currency } from 'src/utils';
import { removePrintInvoice, setPrintInvoice } from 'src/localforageUtils';

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
  },
}));

const Results = ({
  className, customers, editInvoice, addInvoice, ...rest
}) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const showAllDates = () => {
    setFilterDate('');
  };

  const filtered = filterDate ? customers.filter((obj) => {
    return filterDate === moment(obj.billdate).format('YYYY-MM-DD');
  }) : customers;
  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = filtered.map((customer) => customer.id);
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
      },
      cancelText: 'No',
      confirmText: 'Yes'
    });
  };

  const deleteAll = () => {
    openDialog({
      description: 'Are you sure you want to remove all the bills?',
      onSuccess: () => {
        removePrintInvoice();
        deleteInvoices(customers.map((obj) => obj.id));
        setSelectedCustomerIds([]);
        setFilterDate('');
      },
      cancelText: 'No',
      confirmText: 'Yes'
    });
  };

  const isAdmin = window.location.pathname === '/admin';

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
            {isAdmin ? (
              <>
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
            ) : undefined}

            <Button
              className={classes.deleteButton}
              color="secondary"
              onClick={showAllDates}
              disabled={!filterDate}
            >
              Show All Dates
            </Button>
            <TextField
              id="date"
              type="date"
              style={{
                margin: '3px 15px 0 15px'
              }}
              InputLabelProps={{
                shrink: true,
              }}
              value={filterDate}
              onChange={(e) => {
                setFilterDate(e.target.value);
                setSelectedCustomerIds([]);
              }}
            />
          </>
      )}
        title="Billing List"
      />
      {
      !filtered.length ? (
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
        <TableContainer style={{ maxHeight: 525, padding: '0 25px' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {isAdmin ? (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.length === filtered.length}
                      color="primary"
                      indeterminate={
                        selectedCustomerIds.length > 0
                        && selectedCustomerIds.length < filtered.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                ) : undefined}
                <TableCell>
                  Bill No.
                </TableCell>
                <TableCell>
                  Customer Name
                </TableCell>
                <TableCell>
                  Phone No.
                </TableCell>
                <TableCell>
                  GSTIN
                </TableCell>
                {/* <TableCell>
                  Customer Address
                </TableCell> */}
                <TableCell>
                  Total Bill
                </TableCell>
                <TableCell>
                  Billed Date
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((customer) => {
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
                    {isAdmin ? (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                          onChange={(event) => handleSelectOne(event, customer.id)}
                          onClick={(e) => e.stopPropagation()}
                          value="true"
                        />
                      </TableCell>
                    ) : undefined}

                    <TableCell style={{ overflowWrap: 'break-word', maxWidth: 75 }}>
                      {customer.billno}
                    </TableCell>
                    <TableCell style={{ overflowWrap: 'break-word', maxWidth: 175 }}>
                      {customer.fullName}
                    </TableCell>
                    <TableCell style={{ overflowWrap: 'break-word', maxWidth: 125 }}>
                      {customer.phoneno || 'NA'}
                    </TableCell>
                    <TableCell style={{ overflowWrap: 'break-word', maxWidth: 125 }}>
                      {customer.gstin || 'NA'}
                    </TableCell>
                    {/* <TableCell style={{ overflowWrap: 'break-word', maxWidth: 200 }}>
                      {customer.address ? addr(customer.address) : 'NA'}
                    </TableCell> */}
                    <TableCell style={{ overflowWrap: 'break-word', maxWidth: 100 }}>
                      {currency(billtotal)}
                    </TableCell>
                    <TableCell style={{ overflowWrap: 'break-word', maxWidth: 140 }}>
                      {moment(customer.billdate).format('DD MMM YYYY')}
                    </TableCell>
                    <TableCell style={{ width: 75 }}>
                      <Button
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation && e.stopPropagation();
                          e.stopImmediatePropagation && e.stopImmediatePropagation();
                          setPrintInvoice(customer).then(() => {
                            window.open(`/print?printId=${customer.id}`, '_blank', 'noopener');
                          });
                        }}
                      >
                        Preview
                      </Button>
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
