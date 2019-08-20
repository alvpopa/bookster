import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navigate } from 'hookrouter';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => {
  !isAuthenticated && !loading && navigate('/sign-in');
  return <Component {...rest} />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
