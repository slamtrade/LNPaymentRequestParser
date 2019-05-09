"use strict";

const express = require("express");
const bodyParser = require('body-parser');

var lightningPayReq = require('bolt11');

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";
var input, result;

// App
const app = express();

app.use(bodyParser.json()); // support json encoded bodies

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



app.get("/", (req, res) => {
  res.send("LnDecode Successfully Running");
});

/* paylad 
{
"invoice":"lnbc2500u1pvjluezpp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdq5xysxxatsyp3k7enxv4jsxqzpuaztrnwngzn3kdzw5hydlzf03qdgm2hdq27cqv3agm2awhz5se903vruatfhq77w3ls4evs3ch9zw97j25emudupq63nyw24cg27h2rspfj9srp"
}
*/

// Add headers
app.use(function (req, res, next) {

//   var allowedOrigins = ['http://localhost:4200', 'http://localhost:8080'];
//   var origin = req.headers.origin;
//   console.log(req.headers.origin);
//   if(allowedOrigins.indexOf(origin) > -1){
//        res.setHeader('Access-Control-Allow-Origin', origin);
//   }

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://cryptoally.io');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

/**
 * It is to decode the LN Payment Request
 */
app.post('/decode', (req,res)=>{
  var input = req.body.invoice;
  result = lightningPayReq.decode(input);
  res.send(result);
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
