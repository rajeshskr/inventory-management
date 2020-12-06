import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
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
} from '@material-ui/core';
import { currency } from 'src/utils';

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

const Sales = ({ billCounts, totalSales, dates }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root)}
    >
      <CardHeader title="Total Sales - By Date" />
      {!dates.length ? (
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
                <TableCell>
                  Billing Date
                </TableCell>
                <TableCell>
                  Bill Count
                </TableCell>
                <TableCell>
                  Sales
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dates.map((date, index) => {
                return (
                  <TableRow
                    hover
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    className={classes.row}
                  >
                    <TableCell style={{ overflowWrap: 'break-word', maxWidth: 75 }}>
                      {date}
                    </TableCell>
                    <TableCell style={{ overflowWrap: 'break-word', maxWidth: 175 }}>
                      {`${billCounts[index] || 0}`}
                    </TableCell>
                    <TableCell style={{ overflowWrap: 'break-word', maxWidth: 125 }}>
                      {currency(totalSales[index])}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Card>
  );
};

Sales.propTypes = {
  billCounts: PropTypes.array.isRequired,
  totalSales: PropTypes.array.isRequired,
  dates: PropTypes.array.isRequired,
};

export default Sales;
