import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.favorites, action){

    switch(action.type) {
            case types.LOGIN_USER_SUCCESS:
            
            return action.user.favorites;
            case types.ADD_FAV_SUCCESS:
            return [
                ...state,
                 action.favorite
              ];
              
            /*
            return [
                ...state,
                Object.assign({}, action.favorite)
              ];
            }
            */
           return state;
           case types.REMOVE_FAV_SUCCESS:
           return[
               ...state.filter(favorite => favorite !== action.favorite)
           ]
        default:
            return state;
   }
    
}