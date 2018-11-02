var express = require('express');
var User = require('../models/userModel');
/*
import express from 'express';
import User from '../models/userModel';
*/
const userRouter = express.Router();

userRouter.route('/')

    .get((req, res) => {
        console.log("---getting users");
        let loggedinUser = null;
        User.find({},(err,users)=>{
            for(u in users){
                if(users[u].username==req.headers.username && users[u].password==req.headers.password ){
                    loggedinUser = users[u];
                   
                    
                }
            }
        })
        User.find({}, (err, users) => {
        if(loggedinUser){
            if(req.headers.loggin=="true"){
                res.json(loggedinUser);
            }else{
                res.json(users);

            }

        }  
        else{
            res.json(null);
        }})
    })
    .post((req, res) => {
        let user = new User(req.body);
        user.save();
        res.status(201).send(user) 
    })

// Middleware 
userRouter.use('/:userId', (req, res, next)=>{
    User.findById( req.params.userId, (err,user)=>{
        if(err)
            res.status(500).send(err)
        else {
            req.user = user;
            next();
        }
    })

})
userRouter.route('/:userId')
    .get((req, res) => {
        res.json(req.user)
    }) 
    .put((req,res) => {
        console.log("putting user");
        req.user.username  = req.body.username;
        req.user.password  = req.body.password;
        req.user.salt      = req.body.salt;
        req.user.timestamp = req.body.timestamp;
        req.user.favorites = req.body.favorites;

        req.user.save();
        res.json(req.user);
    })
    .patch((req,res)=>{
        if(req.body._id){
            delete req.body._id;
        }
        for( let p in req.body ){
            req.user[p] = req.body[p]
        }
        req.user.save()
        res.json(req.user)
    })//patch
    .delete((req,res)=>{
        req.user.remove(err => {
            if(err){
                res.status(500).send(err)
            }
            else{
                res.status(204).send('removed')
            }
        })
    })//delete
	 
    module.exports = userRouter;