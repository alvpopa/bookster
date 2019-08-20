import React from 'react';
import { connect } from 'react-redux';
import { navigate } from 'hookrouter';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Col, FormGroup, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types';

import { loginUser } from '../../../actions/authAction';

import CustomInput from './CustomInput';

const LoginForm = ({ auth: { isAuthenticated }, loginUser }) => {
  isAuthenticated && navigate('/');

  const loginHandler = async (values, { setSubmitting }) => {
    await loginUser(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={loginHandler}
      validationSchema={Yup.object().shape({
        username: Yup.string()
          .required('No username provided')
          .min(3, 'Username needs 3 or more chars'),
        password: Yup.string()
          .required('No password provided')
          .min(3, 'Password needs 3 or more chars'),
      })}
    >
      {props => {
        const { handleSubmit, isSubmitting } = props;

        return (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col sm="12">
                <FormGroup>
                  <Label htmlFor="username">Username</Label>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    className="form-control form-control-lg"
                    placeholder="Enter Username"
                    component={CustomInput}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="form-control form-control-lg"
                    placeholder="Enter Password"
                    component={CustomInput}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button
              id="btn-login"
              type="submit"
              color="primary"
              className="btn-lg"
              block
              disabled={isSubmitting}
            >
              Sign In
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

LoginForm.propTypes = {
  auth: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(
  mapStateToProps,
  { loginUser }
)(LoginForm);
