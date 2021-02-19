//require('socks')
const nodemailer = require('nodemailer');
const log = console.log;
const SocksClient = require('socks').SocksClient;

// Step 1
let transporter = nodemailer.createTransport({
    host: 'smtp.googlemail.com', // Gmail Host
    port: 465, // Port
    secure: true, // this is true as port is 465
    auth: {
       user: process.env.EMAIL || 'devops@biotechfarms.com', // TODO: your gmail account
       pass: process.env.PASSWORD || 'joey@bfifarms' // TODO: your gmail password
   },
   proxy: 'myproxy://172.16.1.6:3128'
});
// enable support for socks URLs
transporter.set('proxy_handler_myproxy', (proxy, options, callback) => {
    console.log('Proxy host=% port=%', proxy.hostname, proxy.port);
    let socket = require('net').connect(options.port, options.host, () => {
        callback(null, {
            connection: socket,
            secured: true
        });
    });
});

// enable support for socks URLs
//transporter.set('proxy_socks_module', require('socks'));

// Step 2
let mailOptions = {
   from: 'devops@biotechfarms.com', // TODO: email sender
   to: 'gensannerds@gmail.com', // TODO: email receiver
   subject: 'Nodemailer - Test',
   text: 'Wooohooo it works!!'
};

// Step 3
transporter.sendMail(mailOptions, (err, data) => {
   if (err) {
       return log(err);
   }
   return log('Email sent!!!');
});
