import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { auth } from '../../store/actions/auth';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import checkValidity from '../../utils/validation';
import Wrapper from './AuthStyled';

const mapStateToProps = state => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.token !== null,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password) => dispatch(auth(email, password)),
});

@connect(mapStateToProps, mapDispatchToProps)

class Auth extends Component {
  state = {
    controls: {
      username: {
        elementConfig: {
          type: 'text',
          placeholder: 'Username',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
  };

  inputChangedHandler = (event, controlName) => {
    const { controls } = this.state;
    const updatedOrderForm = {
      ...controls,
    };
    const updatedFormElement = {
      ...updatedOrderForm[controlName],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(updatedFormElement.value,
      updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[controlName] = updatedFormElement;

    let formIsValid = true;
    Object.keys(updatedOrderForm).forEach((key) => {
      formIsValid = updatedOrderForm[key].valid && formIsValid;
    });

    this.setState({ controls: updatedOrderForm, formIsValid });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const { controls: { username }, controls: { password } } = this.state;
    const { onAuth } = this.props;

    onAuth(username.value, password.value);
  };

  render() {
    const { loading, error, isAuthenticated } = this.props;
    const { controls, formIsValid } = this.state;

    const formElementsArray = [];

    Object.keys(controls).forEach((key) => {
      formElementsArray.push({
        id: key,
        config: controls[key],
      });
    });

    let form = formElementsArray.map(el => (
      <Input
        key={el.id}
        elementConfig={el.config.elementConfig}
        value={el.config.value}
        invalid={!el.config.valid}
        shouldValidate={el.config.validation}
        touched={el.config.touched}
        changed={event => this.inputChangedHandler(event, el.id)}
      />
    ));

    if (loading) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (error) {
      errorMessage = (
        <p style={{ color: 'red' }}>The username or password you entered is not correct.</p>
      );
    }

    let authRedirect = null;
    if (isAuthenticated) {
      authRedirect = <Redirect to="/" />;
    }

    return (
      <Wrapper>
        <div style={{ fontSize: '23px', marginBottom: '20px' }}>Please login!</div>
        { authRedirect }
        { errorMessage }
        <form onSubmit={this.submitHandler}>
          {form}
          <Button disabled={!formIsValid} btnType="success">SUBMIT</Button>
        </form>
      </Wrapper>
    );
  }
}

export default Auth;
