import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function aandeelReducer(state=initialState.aandelen, action) {
    switch (action.type) {
        case types.LOAD_AANDELEN_SUCCESS:
          return action.aandelen;
        default:
          return state;
    }
}