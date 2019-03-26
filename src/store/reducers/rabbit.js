import * as actionTypes from '../actions/actionTypes';

const initialState = {
  rabbits: [],
  loading: false,
  success: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_RABBITS_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_RABBITS_SUCCESS:
      return {
        ...state,
        rabbits: action.rabbits,
        loading: false,
      };
    case actionTypes.GET_RABBITS_FAIL:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.ADD_RABBIT_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ADD_RABBIT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case actionTypes.ADD_RABBIT_FAIL:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.RABBIT_DATA_SENT:
      return {
        ...state,
        success: false,
      };
    case actionTypes.DELETE_RABBIT:
      return {
        ...state,
        rabbits: state.rabbits.filter(rabbit => rabbit.id !== action.id),
      };
    case actionTypes.UPDATE_RABBIT:
      return {
        ...state,
        rabbits: state.rabbits.forEach((rabbit) => {
          if (rabbit.id === action.id) {
            rabbit.name = action.rabbitData.name;
            rabbit.weight = action.rabbitData.weight;
            return rabbit;
          }
          return rabbit;
        }),
        success: true,
      };
    default:
      return state;
  }
};

export default reducer;
