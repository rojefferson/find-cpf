const express = require('express');
const  axios = require('axios');
// const HTMLParser = require('node-html-parser');



const app = express();

const sendEmail =  require("./services/sendEmail");


app.get('/teste', (req, res) => {

  sendEmail(); 
  res.send("foi");
});



app.listen(3000, () => console.log('Example app is listening on port 3000.'));