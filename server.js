"use strict";

const express = require("express");
//const invoice = require('@lntools/invoice');
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
  res.send("Hello world\n");
});

// app.get("/decode", (req, res)=> {
//   var input = req.params('invoice');
//   //input =
//     //'lnbc2500u1pvjluezpp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdq5xysxxatsyp3k7enxv4jsxqzpuaztrnwngzn3kdzw5hydlzf03qdgm2hdq27cqv3agm2awhz5se903vruatfhq77w3ls4evs3ch9zw97j25emudupq63nyw24cg27h2rspfj9srp';
//   result = invoice.decode(input);
//   res.send(result);
// });

/* paylad 
http://0.0.0.0:8080/decode?invoice=lnbc2500u1pvjluezpp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdq5xysxxatsyp3k7enxv4jsxqzpuaztrnwngzn3kdzw5hydlzf03qdgm2hdq27cqv3agm2awhz5se903vruatfhq77w3ls4evs3ch9zw97j25emudupq63nyw24cg27h2rspfj9srp

{
"invoice":"lnbc2500u1pvjluezpp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdq5xysxxatsyp3k7enxv4jsxqzpuaztrnwngzn3kdzw5hydlzf03qdgm2hdq27cqv3agm2awhz5se903vruatfhq77w3ls4evs3ch9zw97j25emudupq63nyw24cg27h2rspfj9srp"
}
*/

app.post('/decode', (req,res)=>{
  var input = req.body.invoice;
  result = lightningPayReq.decode(input);
  res.send(result);
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
