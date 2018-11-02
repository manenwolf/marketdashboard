import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function muntReducer(state=initialState.munten, action) {
    switch (action.type) {
        case types.LOAD_MUNTEN_SUCCESS:
          return action.munten;
        default:
          return state;
    }
}