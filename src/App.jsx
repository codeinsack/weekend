import React, { Component } from 'react';
import {
  Redirect, Route, Switch, withRouter,
} from 'react-router-dom';

import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import RabbitList from './containers/RabbitList/RabbitList';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { authCheckState } from './store/actions';
import Form from './components/Form/Form';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignup: () => dispatch(authCheckState()),
});

@connect(mapStateToProps, mapDispatchToProps)

class App extends Component {
  componentDidMount() {
    const { onTryAutoSignup } = this.props;
    onTryAutoSignup();
  }

  render() {
    const { isAuthenticated } = this.props;

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );

    if (isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/addRabbit" component={Form} />
          <Route path="/editRabbit" component={Form} />
          <Route path="/" exact component={RabbitList} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);
