import delay from './delay';
import {createSalt, hashPwd} from './encryption';
import { loginUser } from '../actions/userActions';
// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const salt = createSalt();
const users = [
    {
        username: 'admin',
        salt: salt,
        password:  hashPwd(salt, 'ADMIN'),
        timestamp: new Date(),
        favorites: ["aaa", "ddd"]    
    },
    {
        username: 'dieter',
        salt: salt,
        password: hashPwd(salt, 'DIETER'),
        timestamp: new Date('2018-10-17T03:24:00'),
        favorites: []
    }
]   
class UserApi{

    static addFavorite(favorite, username){
        return new Promise((resolve, reject)=> {
            setTimeout(() => {
                for (var u in users){
                    if(username == users[u].username){
                        const salt = createSalt();
                        users[u].favorites.push(favorite);
                        
                        var newuser={
                            username: username,
                            salt: salt,
                            password: hashPwd(salt, users[u].password),
                            timestamp: new Date(),
                            favorites: users[u].favorites
                        };
                        users[u] = newuser;
                        
                        resolve(favorite);
                        
                        return;
                    }
                }
                reject("no user  " + user.username);
                
            }, delay);
        }); 
    
    }
    static removeFavorite(favorite, username){
        return new Promise((resolve, reject)=> {
            setTimeout(() => {
                for (var u in users){
                    
                    if(username == users[u].username){
                        
                        resolve(favorite);
                        return;
                    }
                }
                reject("no user  " + user.username);
                
            }, delay);
        }); 
    
    }

    static loginUser(user) {
        return new Promise((resolve, reject)=> {
            setTimeout(() => {
                for (var u in users){
                    if(user.username == users[u].username && (hashPwd(users[u].salt, user.password) == users[u].password)){
                        resolve(users[u]);
                    }
                }
                reject("incorect username/ password combination:  " + user.username +' '+user.password);
                
            }, delay);
        });
    }
    static updateUser(user){
        return new Promise((resolve, reject)=> {
            setTimeout(() => {
                for (var u in users){
                    
                    if(user.username == users[u].username){
                        const salt = createSalt();
                        var newuser={
                            username: user.username,
                            salt: salt,
                            password: hashPwd(salt, user.password),
                            timestamp: new Date()
                        };
                        users[u] = newuser;
                        
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
                        
                    }
                }
                const salt = createSalt();
                var newuser={
                    username: user.username,
                    salt: salt,
                    password: hashPwd(salt, user.password),
                    timestamp: new Date()
                };
                users.push(newuser);
                resolve(newuser);
                
                
            }, delay);
        }); 
    }
    static getAllUsers(){
        return new Promise((resolve, reject)=> {
            setTimeout(() => {
                
                resolve(Object.assign([],users));
                
            }, delay);
        });
    }

}


export default UserApi;