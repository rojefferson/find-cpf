const pdf = require("html-pdf");
const ejs = require("ejs");
const path = require("path");
const  axios = require('axios');
const HTMLParser = require('node-html-parser');
var config = require("../config.json");

const mail =  require(".././services/sendEmail").sendEmail;


gerarPDF = function(cpf,email){
  pegarInformacoes(cpf);
}

pegarInformacoes =  async function(cpf){
    axios.post('https://api.cyberlookup.org/api/v1/search/score3/cpf',{
        "cpf": cpf
       },{
          headers: {
            'Authorization': `Basic ${config.token}` 
          }})
      .then(res => {
         var site = HTMLParser.parse(res.data.consulta);
        //   let data = res.data.consulta;
        //   let options = {
        //     "height": "11.25in",
        //     "width": "8.5in",
        //     "header": {
        //       "height": "20mm"
        //     },
        //     "footer": {
        //         "height": "20mm",
        //     },
        // };

        let infomacoes = RetornaDadosPessoa(site);
        let dividas = retornaDividas(site);
        console.log(infomacoes[0].valor);
        console.log(dividas);
        geraArquivo(dividas,cpf,infomacoes[0].valor);
        // var mailOptions = {
        //   from: 'testeasjdasijd123@gmail.com',
        //   to: 'rojefferson3@gmail.com',
        //   subject: 'foiiiiiiiiiiiiiiiide.js[nodemailer]',
        //   text: 'foiiiiiiiiii!',
        //   attachments: [{ // Basta incluir esta chave e listar os anexos
        //     filename: 'boleto.pdf', // O nome que aparecerá nos anexos
        //     path:  path.join(__dirname,"..","report.pdf") // O arquivo será lido neste local ao ser enviado
        //   }]
        // };

        // const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
        // let cleanHtml = data;
        // while (SCRIPT_REGEX.test(cleanHtml)) {
        //   cleanHtml = cleanHtml.replace(SCRIPT_REGEX, "");
        // }
        //  pdf.create(cleanHtml, options).toFile("report.pdf", function (err, data) {
        //     console.log("passou");
        //     if (err) {
        //         console.log("error");
        //         console.log(err);
        //     } else {
        //         console.log("File created successfully");
        //     }
        //   });
        //   return "foi";
         //geraArquivo(dadosPessoa,dadosDivida)
      })
}

function geraArquivo(dividas,cpf,nome){
   //TODO fazer diretorio
     ejs.renderFile(path.join(__dirname,'..','views','table.ejs'), {infoDividas:dividas, pessoa : nome}, (err, data) => {
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

             var mailOptions = {
              from: 'testeasjdasijd123@gmail.com',
              to: 'antonio.junior@outlook.com',
              subject: '[Consegui Baixar] Minha Consulta',
              html: data,
              // attachments: [{ // Basta incluir esta chave e listar os anexos
              //   filename: 'boleto.pdf', // O nome que aparecerá nos anexos
              //   path:  path.join(__dirname,"..","report" + cpf +".pdf") // O arquivo será lido neste local ao ser enviado
              // }]
            };

            mail(mailOptions,cpf);
            console.log("enviado");
            //  pdf.create(data, options).toFile("report.pdf", function (err, data) {
            //      console.log("🚀 ~ file: api.js ~ line 49 ~ err", err)
            //      // if (err) {
            //      //     res.send(err);
            //      // } else {
            //      //     res.send("File created successfully");
            //      // }
            //  });

           // console.log(data);
         }
     });

     return "";
}


exports.gerarPDF = gerarPDF;


function retornaDividas(consulta){
        var site = consulta // HTMLParser.parse(consulta);
        var info = site.querySelectorAll("div[class='row resumo no-padding-left']")
        let dividas = [];       
        for (var i in info ){
          let prop = info[i].querySelector("strong").innerHTML.trim();
          let value =  info[i].querySelectorAll("div[class='pwl-col-xs-4 text-center']")[2].innerHTML.trim();
          dividas.push({nome:prop,valor:value});
        }
        dividas.shift();
        return dividas;
}
function trataHtml(html){
  return html.replace("\r\n"," ").trim();
}

function RetornaDadosPessoa(site){
  let infoPessoa = site.querySelectorAll("div[class='pwl-col-xs-8']") 
  let dados = [];
  for(let i in infoPessoa){
    try {
      let propriedade =  trataHtml(infoPessoa[i].querySelector("strong").innerHTML)
      let valor = infoPessoa[i].innerHTML.split("\r\n")[5].trim();
      dados.push({propriedade : propriedade,valor : valor})
     // console.log()
    } catch(e){

    }
 
  }
 return dados;
}

var infoPessoais = {nome : "jefferson",CPF : "233.234.324-23",DataNascimento:"30/10/1994"}

var infoDividas = [{informante : "MERCADO PAGO.COM REPRESENTACOES LTDA",contrato : "17977342",cidade : "SAO PAULO	SPS",valor:"5,24"}
                   ,{informante : "MERCADO PAGO.COM REPRESENTACOES LTDA",contrato : "17977342",cidade : "SAO PAULO	SPS",valor:"10,24"}
                   ,{informante : "MERCADO PAGO.COM REPRESENTACOES LTDA",contrato : "17977342",cidade : "SAO PAULO	SPS",valor:"15,24"}
                  ]  
                  


// app.get('/teste', (req, res) => {

// });

