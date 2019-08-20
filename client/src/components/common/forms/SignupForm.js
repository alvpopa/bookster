import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Col, FormGroup, Label, Row } from 'reactstrap';
import { navigate } from 'hookrouter';

import CustomInput from './CustomInput';

import { registerUser } from '../../../actions/authAction';

const SignupForm = ({ auth: { isAuthenticated }, registerUser }) => {
  const signupHandler = async (values, { setSubmitting }) => {
    await registerUser(values);
    setSubmitting(false);
    navigate('/dashboard');
  };

  return (
    <Formik
      initialValues={{
        name: '',
        username: '',
        email: '',
        password: '',
        cPassword: '',
      }}
      onSubmit={signupHandler}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('No name provided')
          .min(3, 'Name needs 3 or more chars'),
        username: Yup.string()
          .required('No username provided')
          .min(3, 'Username needs 3 or more chars'),
        email: Yup.string()
          .email('This is not an valid email.')
          .required('No email provided.'),
        password: Yup.string()
          .required('No password provided')
          .min(3, 'Password needs 3 or more chars'),
        cPassword: Yup.string().oneOf(
          [Yup.ref('password'), null],
          'Passwords must match'
        ),
      })}
    >
      {props => {
        const { isSubmitting, handleSubmit } = props;

        return (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col sm="12">
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="form-control form-control-lg"
                    placeholder="Enter Name"
                    component={CustomInput}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="12" md="6">
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
              <Col sm="12" md="6">
                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="form-control form-control-lg"
                    placeholder="Enter Email"
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
            <Row>
              <Col sm="12">
                <FormGroup>
                  <Label htmlFor="cPassword">Confirm Password</Label>
                  <Field
                    type="password"
                    id="cPassword"
                    name="cPassword"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    component={CustomInput}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button
              id="btn-signup"
              type="submit"
              color="success"
              className="btn-lg"
              block
              disabled={isSubmitting}
            >
              Sign Up
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

SignupForm.propTypes = {
  auth: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(
  mapStateToProps,
  { registerUser }
)(SignupForm);
