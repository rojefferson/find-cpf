const express = require('express');
const  axios = require('axios');
const HTMLParser = require('node-html-parser');

const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");

const app = express();


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDlkOTg4YTk0MTM4ZjdiNWY4OTdmOTUiLCJsZXZlbCI6MSwiZHVlRGF0ZSI6IjIwMjEtMDYtMTNUMDM6MzI6NTIuNDE0KzAwOjAwIiwicGxhbiI6IjYwOWQ5ODU3OTQxMzhmN2I1Zjg5N2YyNSIsInVzZXJJcCI6IjAuMC4wLjAiLCJpYXQiOjE2MjA5NDEwNjZ9.IWO3hl-nwBzuMl7UtSF5xieCMH-X0jNkxYTxtfF9OkE'

//TODO refatorar 
//TODO colocar token 
app.get('/teste', (req, res) => {
  axios.post('https://api.cyberlookup.org/api/v1/search/score3/cpf',{
        "cpf": "001.781.091-42"
       },{
          headers: {
            'Authorization': `Basic ${token}` 
          }})
      .then(res => {
        var site = HTMLParser.parse(res.data.consulta);
        var info = site.querySelectorAll("div[class='row resumo no-padding-left']")
        let dividas = [];
        
        for (var i in info ){
          let prop = info[i].querySelector("strong").innerHTML.trim();
          let value =  info[i].querySelectorAll("div[class='pwl-col-xs-4 text-center']")[2].innerHTML.trim();
          dividas.push({nome:prop,valor:value});
        }

        ejs.renderFile(path.join(__dirname, 'template.ejs'), {dividas: dividas}, (err, data) => {
          if (err) {
                console.log("🚀 ~ file: api.js ~ line 36 ~ ejs.renderFile ~ err", err)
                //res.send(err);
          } else {
              let options = {
                  "height": "11.25in",
                  "width": "8.5in",
                  "header": {
                      "height": "20mm"
                  },
                  "footer": {
                      "height": "20mm",
                  },
              };
              pdf.create(data, options).toFile("report.pdf", function (err, data) {
                  console.log("🚀 ~ file: api.js ~ line 49 ~ err", err)
                  // if (err) {
                  //     res.send(err);
                  // } else {
                  //     res.send("File created successfully");
                  // }
              });
          }
      });
      })
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));