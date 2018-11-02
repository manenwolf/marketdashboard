import * as types from './actionTypes';
import UserApi from '../api/userApi';

export function loginUserSuccess(user){
    return{type: types.LOGIN_USER_SUCCESS ,user};
}

export function logoutUserSuccess(){
    return{type :types.LOGOUT_USER_SUCCESS};
}
export function registerUserSuccess(user){
    return{type: types.REGISTER_USER_SUCCESS, user}
}
export function loadUsersSucces(users){
    return{type :types.LOAD_USERS_SUCCESS,users};
}
export function updateUserSuccess(user){
    return{type: types.UPDATE_USER_SUCCESS,user};
}
export function addFavoriteSuccess(favorite){
    return{type: types.ADD_FAV_SUCCESS, favorite};
}
export function removeFavoriteSuccess(favorite){
    return{type: types.REMOVE_FAV_SUCCESS, favorite};
}

export function addFavorite(favorite,username){
    console.log("test");
    return function(dispatch){
        console.log(favorite);
        return UserApi.addFavorite(favorite,username)
        .then(favorite =>{
            dispatch(addFavoriteSuccess(favorite));
        })
        .catch(error => {
            throw(error);
        })
    }

}
export function removeFavorite(favorite,username){
    return function(dispatch){
        return UserApi.removeFavorite(favorite,username)
        .then(favorite =>{
            dispatch(removeFavoriteSuccess(favorite));
        })
        .catch(error => {
            throw(error);
        })
    }

}


export function updateUser(user){
    return function(dispatch){
        return UserApi.updateUser(user)
        .then(user =>{
            dispatch(updateUserSuccess(user));
        })
        .catch(error => {
            throw(error);
        })
    }
}

export function registerUser(user){
    return function(dispatch){
        return UserApi.registerUser(user)
        .then(user =>{
            dispatch(registerUserSuccess(user));
        })
        .catch(error => {
            throw(error);
        })
    }
}

export function loginUser(user){
    
    return function(dispatch){
        return UserApi.loginUser(user)
        .then(user =>{
            loadUsers();
            dispatch(loginUserSuccess(user));
            }
            
        )
        .catch(error => {
            console.log("faled");
            console.log(error);
            //console.log(error);
            //console.log(user);
        })
    }
}
export function logoutUser(){
    return function(dispatch){
        return UserApi.logoutUser()
        .then( function(){
            loadUsers();
                console.log('user logged out');
                dispatch(logoutUserSuccess());
            
        })
    }
}
        

export function loadUsers(){
    return function(dispatch){
        return UserApi.getAllUsers()
        .then(users =>{
            dispatch(loadUsersSucces(users));
        })
        .catch(error => {
            throw(error);
        })

    }
}
