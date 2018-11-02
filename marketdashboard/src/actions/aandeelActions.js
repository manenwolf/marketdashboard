import * as types from './actionTypes';
import AandeelApi from '../api/aandeelApi';


export function loadAandelenSuccess(aandelen) {

    return { type: types.LOAD_AANDELEN_SUCCESS, aandelen};
}


export function loadAandelen(){
    return function(dispatch){
        return AandeelApi.getAllAandelen().then(aandelen => {

            dispatch(loadAandelenSuccess(aandelen));
        }).catch(error => {
            throw(error);
        });
    };
}