const express = require('express');

// 

const gerarPDF =  require("./services/trataPdf").gerarPDF;

const app = express();
app.use(express.json())

function formatarResp(data){
  return {Status : "SUCCESS",Data: data};
}

app.post('/GeneratePDF', (req, res) => {
  gerarPDF(req.body.cpf,req.body.email);
  res.send(formatarResp("Dados enviados para o e-mail"));
});

app.post('/teste', (req, res) => {
  res.send(formatarResp("passou!!"));
});


app.listen(3000, () => console.log('rodando porta 3000.'));