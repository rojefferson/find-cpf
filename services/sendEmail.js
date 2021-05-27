const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "mail.conseguibaixar.com.br",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "consultapositiva@conseguibaixar.com.br",
        pass: "ZwQNG9vJIKW"
    },
    tls: { rejectUnauthorized: false }
  });
  
  var mailOptions = {
    from: 'testeasjdasijd123@gmail.com',
    to: 'rojefferson3@gmail.com',
    subject: 'Sending Email using Node.js[nodemailer]',
    text: 'That was easy!'
  };

const sendEmail = () => {
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });  
  }


exports.sendEmail= sendEmail;
