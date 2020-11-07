import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Grid,
  makeStyles,
} from '@material-ui/core';
import Page from 'src/components/Page';
import ProfileDetails from './ProfileDetails';
import InvoiceList from './InvoiceList';
import InvoiceItemForm from './InvoiceItemForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  list: {
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = ({
  billno,
  invoice,
  addItem,
  handleChange
}) => {
  const classes = useStyles();

  const { items = [] } = invoice || {};

  return (
    <Page
      className={classes.root}
      title="Furniture Point | Inventory Management System"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
          justify="center"
        >
          <Grid
            item
            xs={12}
          >
            <ProfileDetails
              billno={billno}
              values={invoice}
              handleChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <InvoiceItemForm addItem={addItem} />
          </Grid>
          <Grid item xs={6} />

          <Grid
            item
            xs={12}
            className={classes.list}
          >
            <InvoiceList items={items} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

Account.propTypes = {
  billno: PropTypes.string,
  invoice: PropTypes.object,
  addItem: PropTypes.func,
  handleChange: PropTypes.func
};

export default Account;
