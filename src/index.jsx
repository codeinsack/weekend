import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  createStore, combineReducers, compose, applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import GlobalStyled from './GlobalStyled';
import rabbitReducer from './store/reducers/rabbit';
import authReducer from './store/reducers/auth';

const composeEnhanters = process.env.NODE_ENV
=== 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  rabbit: rabbitReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, composeEnhanters(
  applyMiddleware(thunk),
));

ReactDOM.render(
  <>
    <GlobalStyled />
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </>,
  document.getElementById('root'),
);
