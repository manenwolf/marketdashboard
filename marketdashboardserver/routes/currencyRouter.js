var express = require('express');
var Currency = require('../models/currencyModel');
/*
import express from 'express';
import Currency from '../models/currencyModel';
*/
const currencyRouter = express.Router();

currencyRouter.route('/')
    .get((req, res) => {
        console.log("getting curencies-------------");
        Currency.find({}, (err, currencies) => {
            res.json(currencies)
        })  
    })


    module.exports = currencyRouter;