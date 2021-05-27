const pdf = require("html-pdf");
const ejs = require("ejs");
const path = require("path");



const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDlkOTg4YTk0MTM4ZjdiNWY4OTdmOTUiLCJsZXZlbCI6MSwiZHVlRGF0ZSI6IjIwMjEtMDYtMTNUMDM6MzI6NTIuNDE0KzAwOjAwIiwicGxhbiI6IjYwOWQ5ODU3OTQxMzhmN2I1Zjg5N2YyNSIsInVzZXJJcCI6IjAuMC4wLjAiLCJpYXQiOjE2MjA5NDEwNjZ9.IWO3hl-nwBzuMl7UtSF5xieCMH-X0jNkxYTxtfF9OkE'


function geraPDF(infoPessoais,infoDividas){
    //TODO fazer diretorio
      ejs.renderFile(path.join(__dirname, 'template.ejs'), {infoPessoais: infoPessoais,infoDividas:infoDividas}, (err, data) => {
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
}

function retornaDividas(){
        // var site = HTMLParser.parse(res.data.consulta);
        // var info = site.querySelectorAll("div[class='row resumo no-padding-left']")
        // let dividas = [];
        
        // for (var i in info ){
        //   let prop = info[i].querySelector("strong").innerHTML.trim();
        //   let value =  info[i].querySelectorAll("div[class='pwl-col-xs-4 text-center']")[2].innerHTML.trim();
        //   dividas.push({nome:prop,valor:value});
        // }
        return "";
}
function trataHtml(html){
  return html.replace("\r\n"," ").trim();
}

function RetornaDadosPessoa(infoPessoa){
  let dados = [];
  for(let i in infoPessoa){
    try {
      let propriedade =  trataHtml(infoPessoa[i].querySelector("strong").innerHTML)
      let valor = infoPessoa[i].innerHTML.split("\r\n")[5].trim();
      dados.push({propriedade : propriedade,valor : valor})
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
//   axios.post('https://api.cyberlookup.org/api/v1/search/score3/cpf',{
//         "cpf": "001.781.091-42"
//        },{
//           headers: {
//             'Authorization': `Basic ${token}` 
//           }})
//       .then(res => {
//         var site = HTMLParser.parse(res.data.consulta);
//         let infoPessoa = site.querySelectorAll("div[class='pwl-col-xs-8']") 

//         let dadosPessoa = RetornaDadosPessoa(infoPessoa);

//         console.log(dadosPessoa);
//       })
// });