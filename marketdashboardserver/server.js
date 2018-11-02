var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var userRouter = require("./routes/userRouter");
var currencyRouter = require("./routes/currencyRouter");
var fetch = require("node-fetch");
var Currency = require("./models/currencyModel");
var stocklist = require("./stocklist");
var Stock = require("./models/stockModel");
var stockRouter = require("./routes/stockRouter");
/*
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRouter from './routes/userRouter';
import currencyRouter from './routes/currencyRouter'
import fetch from 'node-fetch';
import Currency from './models/currencyModel';
import stocklist from './stocklist';
import Stock from './models/stockModel'
import stockRouter from './routes/stockRouter';
*/

const app = express();
const port = process.env.PORT || 3000;
// Connecting to the database
const db = mongoose.connect("mongodb://admin:admin123456@ds157422.mlab.com:57422/users",{ useNewUrlParser: true });

// setting body parser middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });


// API routes
app.use('/api/users', userRouter);

app.use('/api/stock',stockRouter);

app.use('/api/currency', currencyRouter);

app.get("/", function (req, res) {
    res.send(JSON.stringify({ Hello: 'World'}));
   });

   var schedule = require('node-schedule');
 /*
   var j = schedule.scheduleJob('/5 * * * * *', function(){
     console.log('updating the data:');
     console.log(new Date());
     updatedata();
   });
*/
updatedata();
   setInterval(function(){
    console.log('updating the data:');
    console.log(new Date());
    updatedata();
  },10000);
   


    // Running the server
    app.listen(port, () => {
        console.log(`http://localhost:${port}`)
    })

    var u = new Currency();
u.collection.drop(function(err){
    if(err){
        console.log("err");
    }});


fetch("http://apilayer.net/api/historical?access_key=bf8f665ab9f2ffcb00ac871cd153c866&date=2018-09-12")
.then(response =>response.json())
.then(result => {
    //console.log(result)
    let data1 = result.quotes;
    fetch("http://apilayer.net/api/historical?access_key=bf8f665ab9f2ffcb00ac871cd153c866&date=2018-09-11")
    .then(response =>response.json())
    .then(result => {
    let data2 = result.quotes;
     for (var r in data2){
         //    console.log(r + "----" + data2[r]+"|||" +data1[r]+"|||"+(data1[r]-data2[r]).toFixed(6));

        var c = new Currency({
            naam: r,
            prijs: (data1[r]*(1+((Math.random()-0.5)/10))).toFixed(6),
            prijsverandering: ((data1[r]-data2[r])*(1+((Math.random()-0.5)/10))).toFixed(6),
            prijsveranderingpercent: (((data1[r]-data2[r])/data1[r]*100)*(1+((Math.random()-0.5)/10))).toFixed(6),
            stijgend: (data1[r]>data2[r])
        });
        
        c.save(function(err){
            if(err){
                console.log(err);
            }
        })
     }
           
    })
    .catch(e => console.log(e));
})
            
//.catch(e => console.log(e));


function updatedata(){
    //import of currency data in database
    Currency.find({},(err,currencies)=>{
        var u = new Currency();
        u.collection.drop(function(err){
            if(err){
                console.log(err);
            }});
            setTimeout(() => {
                for(n in currencies){
                    var c = new Currency({
                        naam: currencies[n].naam,
                        prijs: (currencies[n].prijs*(1+((Math.random()-0.5)/10))).toFixed(6),
                        prijsverandering: ((currencies[n].prijsverandering)*(1+((Math.random()-0.5)/10))).toFixed(6),
                        prijsveranderingpercent: ((currencies[n].prijsveranderingpercent)*(1+((Math.random()-0.5)/10))).toFixed(6),
                        stijgend: currencies[n].stijgend
                    });
                    c.save(function(err){
                        if(err){
                            console.log(err);
                        }
                    })
                }
            }, 1000);
        
        
    });




//importing stock data into database
    // deleting old data
    try {
        var u = new Stock();
        u.collection.drop().catch();
    } catch (err) {
        console.log("some error");
        
    }



console.log("updating stocks")
for(var n in stocklist){
    //console.log(stocklist[n]);
    fetch("https://min-api.cryptocompare.com/data/generateAvg?fsym="+stocklist[n]+"&tsym=USD&e=CCCAGG")
    .then(response =>response.json())
    .then(result => {
        if(result["RAW"]["FROMSYMBOL"]){//result["RAW"]!=null){
        var s =  new Stock({
            naam: result["RAW"]["FROMSYMBOL"],
            prijs: (result["RAW"]["PRICE"]*(1+((Math.random()-0.5)/10))).toFixed(6),
            prijsverandering: (result["RAW"]["CHANGE24HOUR"]*(1+((Math.random()-0.5)/10))).toFixed(6),
            prijsveranderingpercent: (result["RAW"]["CHANGEPCT24HOUR"]*(1+((Math.random()-0.5)/10))).toFixed(6),
            stijgend: result["RAW"]["CHANGEPCT24HOUR"]>0
        });
        s.save(function(err){
            if(err){
                console.log("err");
            }
        })
    }
       
    })
    .catch(function(e) {
       // console.log("error");
       
      // console.log(e)
    });
    
}
}