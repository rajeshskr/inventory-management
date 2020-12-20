import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  button: {
    marginLeft: 'auto',
    marginRight: theme.spacing(1)
  }
}));

const ProfileDetails = ({
  className,
  values = {},
  handleChange,
  profileErr,
  isEdit,
  ...rest
}) => {
  const classes = useStyles();
  const {
    fullName = '',
    address = '',
    phoneno = '',
    gstin = '',
    billno = '',
    billdate = ''
  } = values;

  const { noReq = '', dateReq = '', nameReq = '' } = profileErr;
  const variant = isEdit ? 'filled' : 'outlined';

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          title="Customer Invoice Information"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={6}
              lg={6}
            >
              <TextField
                fullWidth
                label="Bill Number"
                name="billno"
                onChange={handleChange}
                type="number"
                value={billno}
                variant={variant}
                required
                InputProps={{
                  readOnly: isEdit
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={Boolean(noReq)}
                helperText={noReq}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={6}
              lg={6}
            >
              <TextField
                id="date"
                label="Bill Date"
                type="date"
                name="billdate"
                onChange={handleChange}
                value={billdate}
                className={classes.billdate}
                InputLabelProps={{
                  shrink: true,
                }}
                required
                error={Boolean(dateReq)}
                helperText={dateReq}
                InputProps={{
                  readOnly: isEdit
                }}
                variant={variant}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={6}
            >
              <TextField
                autoFocus
                fullWidth
                label="Full name"
                name="fullName"
                onChange={handleChange}
                required
                value={fullName}
                variant={variant}
                InputLabelProps={{
                  shrink: true,
                }}
                error={Boolean(nameReq)}
                helperText={nameReq}
                InputProps={{
                  readOnly: isEdit
                }}
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={6}
            >
              <TextField
                fullWidth
                label="Address"
                name="address"
                onChange={handleChange}
                value={address}
                variant={variant}
                multiline
                rows={2}
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
              md={6}
              xs={6}
              lg={6}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneno"
                onChange={handleChange}
                value={phoneno}
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
              md={6}
              xs={6}
              lg={6}
            >
              <TextField
                fullWidth
                label="GSTIN"
                name="gstin"
                onChange={handleChange}
                value={gstin}
                variant={variant}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: isEdit
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func,
  values: PropTypes.object,
  profileErr: PropTypes.object,
  isEdit: PropTypes.bool
};

export default ProfileDetails;
