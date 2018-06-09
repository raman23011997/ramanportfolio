var express = require('express');
var router = express.Router();
var app = express();
var nodemailer =require('nodemailer');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const fs = require('fs');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Express' });
});
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});

router.get('/project', function(req, res, next) {
  res.render('project', { title: 'Express' });
});
router.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
    
      <li>Email: ${req.body.email}</li>

    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;console.log(output);

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'sramanjeet57@gmail.com', // generated ethereal user
        pass: 'ramanlove@1997'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer Contact" <sramanjeet57@gmail.com>', // sender address
      to: 'sramanjeet57@gmail.com', // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });
  });

module.exports = router;
