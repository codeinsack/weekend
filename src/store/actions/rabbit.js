import qs from 'query-string';
import * as actionTypes from './actionTypes';
import axios from '../../axios-rabbits';

export const getRabbitsStart = () => ({
  type: actionTypes.GET_RABBITS_START,
});

export const getRabbitsSuccess = rabbits => ({
  type: actionTypes.GET_RABBITS_SUCCESS,
  rabbits,
});

export const getRabbitsFail = error => ({
  type: actionTypes.GET_RABBITS_FAIL,
  error,
});

export const getRabbits = token => (dispatch) => {
  dispatch(getRabbitsStart());
  axios.get('/rabbit/list', { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      dispatch(getRabbitsSuccess(response.data));
    })
    .catch((error) => {
      dispatch(getRabbitsFail(error));
    });
};

export const addRabbitStart = () => ({
  type: actionTypes.ADD_RABBIT_START,
});

export const addRabbitSuccess = rabbitData => ({
  type: actionTypes.ADD_RABBIT_SUCCESS,
  rabbitData,
});

export const addRabbitFail = error => ({
  type: actionTypes.ADD_RABBIT_FAIL,
  error,
});

export const rabbitDataSent = () => ({
  type: actionTypes.RABBIT_DATA_SENT,
});

export const addRabbit = (token, rabbitData) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  };
  const bodyParameters = {
    'rabbit[name]': rabbitData.name,
    'rabbit[weight]': rabbitData.weight,
  };

  dispatch(addRabbitStart());
  axios.post('/rabbit', qs.stringify(bodyParameters), config)
    .then(() => {
      dispatch(addRabbitSuccess());
    })
    .catch((error) => {
      dispatch(addRabbitFail(error));
    });
};

export const deleteRabbitSuccess = id => ({
  type: actionTypes.DELETE_RABBIT,
  id,
});

export const deleteRabbit = (token, id) => (dispatch) => {
  axios.delete(`/rabbit/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    .then(() => {
      dispatch(deleteRabbitSuccess(id));
    });
};

export const updateRabbitSuccess = (rabbitData, id) => ({
  type: actionTypes.UPDATE_RABBIT,
  rabbitData,
  id,
});

export const updateRabbit = (token, rabbitData, id) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  };
  const bodyParameters = {
    'rabbit[name]': rabbitData.name,
    'rabbit[weight]': rabbitData.weight,
  };

  axios.post(`/rabbit/${id}`, qs.stringify(bodyParameters), config)
    .then(() => {
      dispatch(updateRabbitSuccess(rabbitData, id));
    });
};
