import React from 'react';

import {
  faCheckCircle,
  faTimesCircle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Status = ({ status }) => {
  return status == null ? (
    <FontAwesomeIcon icon={faSpinner} spin />
  ) : status ? (
    <FontAwesomeIcon icon={faCheckCircle} />
  ) : (
    <FontAwesomeIcon icon={faTimesCircle} />
  );
};

export default Status;
