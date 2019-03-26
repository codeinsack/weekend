import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logout } from '../../../store/actions/index';

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
});

@connect(null, mapDispatchToProps)

class Logout extends Component {
  componentDidMount() {
    const { onLogout } = this.props;
    onLogout();
  }

  render() {
    return (
      <Redirect to="/" />
    );
  }
}

export default Logout;
