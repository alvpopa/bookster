import React from 'react';
import { connect } from 'react-redux';
import { navigate } from 'hookrouter';
import PropTypes from 'prop-types';

import HomeSVG from '../../svgs/homepage.svg';

const Home = ({ isAuthenticated }) => {
  isAuthenticated && navigate('/dashboard');
  return (
    <div id="Home">
      <h1 className="display-4">Home</h1>
      <img src={HomeSVG} alt="homepage" />
    </div>
  );
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
  isAuthenticated,
});

export default connect(mapStateToProps)(Home);
