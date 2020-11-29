import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  search: {
    maxWidth: 400,
    marginLeft: theme.spacing(2)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box mt={3}>
        <Card>
          <CardContent style={{ padding: 20 }}>
            <Typography
              align="center"
              // color="textPrimary"
              component="h3"
              variant="h3"
              style={{ fontWeight: 400 }}
            >
              Furniture Point
            </Typography>
            <Typography
              align="center"
              // color="textPrimary"
              component="h5"
              variant="h5"
              style={{ fontWeight: 200 }}
            >
              Billing Software
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
