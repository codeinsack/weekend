import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';
import { addRabbit } from '../../store/actions/rabbit';
import Spinner from '../UI/Spinner/Spinner';
import { updateRabbit } from '../../store/actions';
import Button from '../UI/Button/Button';
import Wrapper from './FormStyled';
import Input from '../UI/Input/Input';
import checkValidity from '../../utils/validation';

const mapStateToProps = state => ({
  loading: state.rabbit.loading,
  token: state.auth.token,
  success: state.rabbit.success,
});

const mapDispatchToProps = dispatch => ({
  onAddRabbit: (token, rabbitData) => dispatch(addRabbit(token, rabbitData)),
  onEditRabbit: (token, rabbitData, id) => dispatch(updateRabbit(token, rabbitData, id)),
});

@connect(mapStateToProps, mapDispatchToProps)

class Form extends Component {
  state = {
    controls: {
      name: {
        elementConfig: {
          type: 'text',
          placeholder: 'Name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      weight: {
        elementConfig: {
          type: 'text',
          placeholder: 'Weight',
        },
        value: '',
        validation: {
          required: true,
          isNumeric: true,
        },
        valid: false,
        touched: false,
      },
    },
    id: '',
  };

  componentWillMount() {
    const { location: { search } } = this.props;
    if (!search) {
      return;
    }

    const query = new URLSearchParams(search);
    const params = {};
    for (const param of query.entries()) {
      const value = +param[1];
      if (isNaN(value)) {
        params[param[0]] = param[1];
      } else {
        params[param[0]] = value;
      }
    }

    this.setState({
      controls: {
        ...this.state.controls,
        name: { value: params.name },
        weight: { value: params.weight },
      },
      id: params.id,
    });
  }

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

    this.setState({ controls: updatedOrderForm });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const {
      onAddRabbit, token, location: { search }, onEditRabbit,
    } = this.props;
    let { controls: { name }, controls: { weight }, id } = this.state;

    name = name.value;
    weight = weight.value;

    const rabbitData = {
      name,
      weight,
    };

    if (search) {
      onEditRabbit(token, rabbitData, id);
    } else {
      onAddRabbit(token, rabbitData);
    }
  };

  onCancelHandler = () => {
    const { history } = this.props;

    history.goBack();
  };

  render() {
    const { loading, success, location: { search } } = this.props;

    const { controls } = this.state;

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

    let authRedirect = null;
    if (success) {
      authRedirect = <Redirect to="/" />;
    }

    const info = search
      ? <div style={{ fontSize: '23px', marginBottom: '20px' }}>Edit Rabbit</div>
      : <div style={{ fontSize: '23px', marginBottom: '20px' }}>Create new Rabbit</div>;

    return (
      <Wrapper>
        { authRedirect }
        { info }
        <form onSubmit={this.submitHandler}>
          { form }
          <Button btnType="success">Confirm</Button>
          <Button btnType="danger" clicked={this.onCancelHandler}>Cancel</Button>
        </form>
      </Wrapper>
    );
  }
}

export default Form;
