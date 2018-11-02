import * as types from './actionTypes';
import MuntApi from '../api/muntApi';


export function loadMuntenSuccess(munten) {
    
    return { type: types.LOAD_MUNTEN_SUCCESS, munten};
}


export function loadMunten(){
    return function(dispatch){
        return MuntApi.getAllMunten()
        .then(munten => {

            dispatch(loadMuntenSuccess(munten));
        }).catch(error => {
            throw(error);
        });
    };
}