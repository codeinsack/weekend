import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { deleteRabbit } from '../../store/actions';
import Button from '../UI/Button/Button';
import Wrapper from './RabbitStyled';

const mapStateToProps = state => ({
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  onDeleteRabbit: (token, id) => dispatch(deleteRabbit(token, id)),
});

@connect(mapStateToProps, mapDispatchToProps)

class Rabbit extends Component {
  onDeleteButton = (id) => {
    const { onDeleteRabbit, token } = this.props;

    onDeleteRabbit(token, id);
  };

  onEditButton = (rabbit) => {
    const { history: { push } } = this.props;

    const queryParams = [];
    Object.keys(rabbit).forEach((key) => {
      queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(rabbit[key])}`);
    });
    const queryString = queryParams.join('&');
    push({
      pathname: '/editRabbit',
      search: `?${queryString}`,
    });
  };

  render() {
    const { name, weight, id } = this.props;
    const rabbit = {
      id,
      name,
      weight,
    };
    return (
      <Wrapper>
        <p>Name: { name }</p>
        <p>Weight: { weight } kg</p>
        <Button type="button" btnType="danger" clicked={() => this.onDeleteButton(id)}>Delete</Button>
        <Button type="button" btnType="success" clicked={() => this.onEditButton(rabbit)}>Edit</Button>
      </Wrapper>
    );
  }
}

export default withRouter(Rabbit);
