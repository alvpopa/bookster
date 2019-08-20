import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';

const Alert = ({ alerts }) =>
  alerts.map(({ alertType, id, msg }) => (
    <Toast key={id} id="alert">
      <ToastHeader icon={alertType}>Bookster</ToastHeader>
      <ToastBody>{msg}</ToastBody>
    </Toast>
  ));

Alert.propTypes = {
  alerts: PropTypes.array,
};

const mapStateToProps = ({ alerts }) => ({
  alerts,
});

export default connect(mapStateToProps)(Alert);
