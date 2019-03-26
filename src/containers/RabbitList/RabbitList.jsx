import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getRabbits, rabbitDataSent } from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import Rabbit from '../../components/Rabbit/Rabbit';
import Wrapper from './RabbitListStyled';

const mapStateToProps = state => ({
  rabbits: state.rabbit.rabbits,
  loading: state.rabbit.loading,
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  onGetRabbits: token => dispatch(getRabbits(token)),
  onDataSent: token => dispatch(rabbitDataSent(token)),
});

@connect(mapStateToProps, mapDispatchToProps)

class RabbitList extends Component {
  componentDidMount() {
    const { onGetRabbits, token, onDataSent } = this.props;
    onDataSent();
    onGetRabbits(token);
  }

  render() {
    const { rabbits, loading } = this.props;
    if (!rabbits) return null;
    let outputRabbits = (
      rabbits.map(rabbit => (
        <Rabbit
          key={rabbit.id}
          id={rabbit.id}
          name={rabbit.name}
          weight={rabbit.weight}
        />
      ))
    );
    if (loading) {
      outputRabbits = <Spinner />;
    }
    return (
      <Wrapper>
        {outputRabbits}
      </Wrapper>
    );
  }
}

export default RabbitList;
