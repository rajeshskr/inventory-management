import React from 'react';
import {
  Container,
  Grid,
  makeStyles,
} from '@material-ui/core';
import Page from 'src/components/Page';
import ProfileDetails from './ProfileDetails';
import InvoiceList from './InvoiceList';

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

const Account = () => {
  const classes = useStyles();

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
            <ProfileDetails />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          className={classes.list}
        >
          <InvoiceList />
        </Grid>
      </Container>
    </Page>
  );
};

export default Account;
