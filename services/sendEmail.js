const nodemailer = require('nodemailer');
const path = require("path");
const fs = require('fs');


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 25,
  secure: false, // true for 465, false for other ports
  auth: {
        user: "testeasjdasijd123@gmail.com",
        pass: "123@abcd"
    },
    tls: { rejectUnauthorized: false }
  });
  
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

 sendEmail = function(mailOptions,cpf){
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
          console.log(error);
        } else {
          // fs.unlink(path.join(__dirname,"..","report" +cpf+ ".pdf"), (err) => {
          //   if (err) {
          //     console.error(err)
          //     return
          //   }
          // })
        }
    });  
  }


exports.sendEmail = sendEmail;
