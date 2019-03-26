import React, { Component } from 'react';
import { connect } from 'react-redux';

import Wrapper from './LayoutStyled';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
});

@connect(mapStateToProps)

class Layout extends Component {
  render() {
    const { children, isAuthenticated } = this.props;

    return (
      <>
        <Toolbar isAuth={isAuthenticated} />
        <Wrapper>
          { children }
        </Wrapper>
      </>
    );
  }
}

export default Layout;
