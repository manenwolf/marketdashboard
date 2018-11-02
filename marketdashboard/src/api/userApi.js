import delay from './delay';
import {createSalt, hashPwd} from './encryption';
import { loginUser } from '../actions/userActions';
import cookie from 'react-cookies';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
let users = []  ; 
class UserApi{

    static logoutUser(){
        return new Promise((resolve, reject)=> {
            resolve();
        }
        )};
        
    static addFavorite(favorite, user){
        return new Promise((resolve, reject)=> {
            setTimeout(() => {
                for (var u in users){
                    if(user.username == users[u].username){
                        users[u].favorites.push(favorite);
                        
                        var newuser={
                            username: user.username,
                            salt: users[u].salt,
                            password: users[u].password,
                            timestamp: new Date(),
                            favorites: users[u].favorites
                        };
                        users[u] = newuser;
                        fetch('http://dieter-dashboard-server.herokuapp.com/api/users/'+user._id, {
                            method: 'PUT',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newuser)
                            
                        })
                        .then(response => console.log(response))
                        .catch(e => reject(e));

                        resolve(favorite);
                        
                        return;
                    }
                }
                //reject("no user  " + user.username);
                
            }, delay);
        }); 
    
    }
    static removeFavorite(favorite, user){
        return new Promise((resolve, reject)=> {
            setTimeout(() => {
                for (var u in users){
                    
                    if(user.username == users[u].username){
                        
                        users[u].favorites.splice(users[u].favorites.indexOf(favorite),1)
                        var newuser={
                            username: user.username,
                            salt: users[u].salt,
                            password: users[u].password,
                            timestamp: new Date(),
                            favorites: users[u].favorites
                        };
                        users[u] = newuser;
                        fetch('http://dieter-dashboard-server.herokuapp.com/api/users/'+user._id, {
                            method: 'PUT',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newuser)
                            
                        })
                        .then(response => console.log(response))
                        .catch(e => reject(e));

                        resolve(favorite);
                        return;
                    }
                }
                //reject("no user  " + user.username);
                
            }, delay);
        }); 
    
    }

    static loginUser(user) {
        return new Promise((resolve, reject)=> {
            setTimeout(() => {
                fetch('http://dieter-dashboard-server.herokuapp.com/api/users', {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'password': user.password,
                                'username': user.username,
                                'loggin': true
                            },
                            
                        })
                        .then(response =>
                            response.json()
                        )
                        .then(result => {
                            if(result == null){
                                reject("incorect username/ password combination:  " + user.username +' '+user.password);
                            }
                            
                            resolve(result);
                            
                        })
                        
                        
            }, delay);
        });
    }
    static updateUser(user){
        return new Promise((resolve, reject)=> {
            setTimeout(() => {
                for (var u in users){
                    
                    if(user.username == users[u].username){
                        var newuser={
                            username: user.username,
                            salt: users[u].salt,
                            password: hashPwd(users[u].salt, user.password),
                            timestamp: new Date(),
                            favorites: users[u]
                        };
                        users[u] = newuser;
                        fetch('http://dieter-dashboard-server.herokuapp.com/api/users/'+user._id, {
                            method: 'PUT',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newuser)
                            
                        })
                        .then(response => console.log(response))
                        .catch(e => reject(e));

                        resolve(newuser);
                        return;
                        
                    }
                }
                
                reject("no user  " + user.username);

                
                
                
            }, delay);
        }); 
    }
    
    static registerUser(user){
        return new Promise((resolve, reject)=> {
            setTimeout(() => {
                for (var u in users){
                    
                    if(user.username == users[u].username){
                        reject("username taken  " + user.username);
                        return;
                        console.log("username taken");
                        
                    }
                }
                const tempsalt = createSalt();
                var newuser={
                    username: user.username,
                    salt: tempsalt,
                    password: hashPwd(tempsalt, user.password),
                    timestamp: new Date(),
                    favorites: []
                };
                users.push(newuser);
                        fetch('http://dieter-dashboard-server.herokuapp.com/api/users', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newuser)
                            
                        })
                        .then(response => console.log(response))
                        .catch(e => reject(e));

                resolve(newuser);
                
                
            }, delay);
        }); 
    }
    static getAllUsers(){
        return new Promise((resolve, reject)=> {
            fetch("http://dieter-dashboard-server.herokuapp.com/api/users", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'password': cookie.load("password"),
                    'username': cookie.load("username"),
                    'loggin': false
                },
                
            })
              .then(response =>response.json())
              .then(result => {
                  users=Object.assign([],result);
                  resolve(Object.assign([],result));
              })
            
            .catch(e => reject(e));
        });
    }

              /*
              .then(result => this.setState({quotes: result, 
                                             isFetching: false}))
              .catch(e => console.log(e));
          }
        }
        
        return new Promise((resolve, reject)=> {
            setTimeout(() => {
                
                resolve(Object.assign([],users));
                
            }, delay);
        });
        
    }
    
*/
}


export default UserApi;