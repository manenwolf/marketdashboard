import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state= initialState.user, action){

    switch(action.type) {
           case types.LOGIN_USER_SUCCESS:
            return action.user;
           case types.LOGOUT_USER_SUCCESS:
            return null;
            case types.UPDATE_USER_SUCCESS:
            return [
                ...state.filter(user => user.username !== action.user.username),
                Object.assign({}, action.user)
              ];

        default:
            return state;
   }
    
}