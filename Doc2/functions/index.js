const functions = require('firebase-functions');
const express = require('express');
const request = require ('request');
const nodemailer = require ('nodemailer');
const engines = require('consolidate'); //use for the handlebars

const app = express();
app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (request, response) => {
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    
        response.render('index');
    
});

app.get('/contact', (request, response) => {
    response.render('contact');
});

app.get('/cosmetic', (request, response) => {
    response.render('cosmetic');
});

app.get('/dental-hygiene', (request, response) => {
    response.render('dental-hygiene');
});

app.get('/digital-xray', (request, response) => {
    response.render('digital-xray');
});

app.get('/educational-videos', (request, response) => {
    response.render('educational-videos');
});

app.get('/gallery', (request, response) => {
    response.render('gallery');
});

app.get('/implants', (request, response) => {
    response.render('implants');
});

app.get('/intraoral-cam', (request, response) => {
    response.render('intraoral-cam');
});

app.get('/links', (request, response) => {
    response.render('links');
});

app.get('/meet-the-dr', (request, response) => {
    response.render('meet-the-dr');
});

app.get('/meet-the-staff', (request, response) => {
    response.render('meet-the-staff');
});

app.get('/new-patient-forms', (request, response) => {
    response.render('new-patient-forms');
});

app.get('/oral-cancer-screen', (request, response) => {
    response.render('oral-cancer-screen');
});

app.get('/oral-surgery', (request, response) => {
    response.render('oral-surgery');
});

app.get('/pediatric', (request, response) => {
    response.render('pediatric');
});

app.get('/periodontal-disease', (request, response) => {
    response.render('periodontal-disease');
});

app.get('/post-op-instructions', (request, response) => {
    response.render('post-op-instructions');
});

app.get('/practice', (request, response) => {
    response.render('practice');
});

app.get('/preventive-devices', (request, response) => {
    response.render('preventive-devices');
});

app.get('/q-and-a', (request, response) => {
    response.render('q-and-a');
});

app.get('/restorative', (request, response) => {
    response.render('restorative');
});

app.get('/root-canal', (request, response) => {
    response.render('root-canal');
});

app.get('/rotary-endo', (request, response) => {
    response.render('rotary-endo');
});

app.get('/surgical-instructions', (request, response) => {
    response.render('surgical-instructions');
});

app.get('/connect-with-us', (request, response) => {
    response.render('appointment-booked');
});


// Add Nodemailer 07/23/2018
app.post('/send',function(req,res){
    // g-recaptcha-response is the key that browser will generate upon form submit.
  // if its blank or null means user has not selected the captcha, so return the error.
  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
    return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
  }
  // Put your secret key here.
  var secretKey = "";
  // req.connection.remoteAddress will provide IP address of connected user.
  var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
  // Hitting GET request to the URL, Google will respond with success or error scenario.
  request(verificationUrl,function(error,response,body) {
    body = JSON.parse(body);
    // Success will be true or false depending upon captcha validation.
    if(body.success !== undefined && !body.success) {
      return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
    }
        const output = `
        <p>Hello Dr. Viken</p>
        <p>You have a new appointment request</p>

        <h3>Appointment Details</h3>
        <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
        <li>Date: ${req.body.AptDate}</li>
        <li>Time: ${req.body.time}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.msg}</p>
        
        `;
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'apikey', // generated ethereal user
            pass: '' // generated ethereal password
        },
        // if not in production, add below and comma to above bracket.
        tls:{
            rejectUnauthorized:false
        }
        });

        // setup email data with unicode symbols
        let mailOptions = {
        from: '"Website:" <vikentoutounjiandds.com>', // sender address
        to: 'drvt@vikentoutounjiandds.com', // list of receivers
        bcc: "elioye27@gmail.com",
        subject: 'Appointment Request', // Subject line
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
        res.render('appointment-booked', {msg:'Your appointment request has been sent'});
        })
        // End of Nodemailer
    });
});


// Added 07/23/2019
// Recaptcha
app.post('/email',function(req,res){
  // g-recaptcha-response is the key that browser will generate upon form submit.
  // if its blank or null means user has not selected the captcha, so return the error.
  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
    return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
  }
  // Put your secret key here.
  var secretKey = "";
  // req.connection.remoteAddress will provide IP address of connected user.
  var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
  // Hitting GET request to the URL, Google will respond with success or error scenario.
  request(verificationUrl,function(error,response,body) {
    body = JSON.parse(body);
    // Success will be true or false depending upon captcha validation.
    if(body.success !== undefined && !body.success) {
      return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
    }
      // added for nodemailer 08/14/18
      const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Subject: ${req.body.subject}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.msg}</p>
    `;
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'apikey', // generated ethereal user
            pass: ''
            // generated ethereal password
        },
        // if not in production, add below and comma to above bracket.
        tls:{
          rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Website:" <vikentoutounjiandds.com>', // sender address
        to: 'drvt@vikentoutounjiandds.com', // list of receivers
        bcc: "elioye27@gmail.com",
        subject: 'Contact Request', // Subject line
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

        res.render('index', {msg:'Email has been sent'});
    });
    // End of Nodemailer 
  });
});

// This will handle 404 requests.
// router.use("*",function(req,res) {
//   res.status(404).send("404");
// })
// End of recaptch 07/23/2019

exports.app = functions.https.onRequest(app);
