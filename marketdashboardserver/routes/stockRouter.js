var express = require('express');
var Stock = require('../models/stockModel');
/*
import express from 'express';
import Stock from '../models/stockModel';
*/
const stockRouter = express.Router();

stockRouter.route('/')
    .get((req, res) => {
        console.log("getting stocks-------------");
        Stock.find({}, (err, stocks) => {
            res.json(stocks)
        })  
    })


    module.exports = stockRouter;