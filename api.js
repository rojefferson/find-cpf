const express = require('express');

// 

const mail =  require("./services/sendEmail").sendEmail;
const geraPDF =  require("./services/trataPdf").geraPDF;

const app = express();
app.use(express.json())

function formatarResp(data){
  return {Status : "SUCCESS",Data: data};
}

app.post('/GeneratePDF', (req, res) => {
  geraPDF(req.body.cpf,req.body.email);
  console.log(req.body.cpf);
  console.log(req.body.email);
  res.send(formatarResp("Dados enviados para o e-mail"));
});



app.listen(3000, () => console.log('Example app is listening on port 3000.'));