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
  space: {
    margin: theme.spacing(1)
  }
}));

const Account = ({
  id,
  invoice,
  addItem,
  handleChange,
  profileErr,
  deleteItems
}) => {
  const classes = useStyles();

  const { items = [] } = invoice || {};

  return (
    <Page
      className={classes.root}
      title="Furniture Point | Inventory Management System"
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
          justify="center"
        >
          <Grid
            container
            item
            xs={6}
          >
            <Grid
              item
              xs={12}
              className={classes.space}
            >
              <ProfileDetails
                id={id}
                values={invoice}
                handleChange={handleChange}
                profileErr={profileErr}
              />
            </Grid>

            <Grid item xs={12} className={classes.space}>
              <InvoiceItemForm addItem={addItem} />
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={6}
          >
            <Grid
              item
              xs={12}
              className={classes.space}
            >
              <InvoiceList items={items} deleteItems={deleteItems} />
            </Grid>
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
};

Account.propTypes = {
  id: PropTypes.string,
  invoice: PropTypes.object,
  addItem: PropTypes.func,
  handleChange: PropTypes.func,
  profileErr: PropTypes.object,
  deleteItems: PropTypes.func
};

export default Account;
