import * as actionTypes from './actionTypes';
import axios from '../../axios-rabbits';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (token, userName) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken: token,
  userName,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const auth = (username, password) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    username,
    password,
  };
  axios.post('login_check', authData)
    .then((response) => {
      const expirationDate = new Date(new Date().getTime() + 60000 * 60);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('expirationDate', expirationDate);
      dispatch(authSuccess(response.data.token));
    })
    .catch((err) => {
      dispatch(authFail(err));
    });
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = expirationTime => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token));
      dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    }
  }
};
