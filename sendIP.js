var os = require('os');
var nodemailer = require('nodemailer');
const redis = require('redis');

var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}
var client = redis.createClient();

client.hgetall("email",function(err,reply){
		if(err){
			reply.send(err);
			return;
		}
	console.log("Redis started");
    var mail = JSON.stringify(reply);
    let transporter = nodemailer.createTransport({
  	service: 'gmail',
  	secure: false,
 	port: 25,
  	auth: {
    	user: 'erudayu1010@gmail.com',
    	pass: 'hihihihi19'
  	},
  	tls: {
    	rejectUnauthorized: false
  	}
	});

	let HelperOptions = {
  		from: '"Node.js" <erudayu1010@gmail.com',
  		to: 'erudayu@gmail.com',
  		subject: 'IP address',
  		text: mail
	};

	transporter.sendMail(HelperOptions, (error, info) => {
    	if (error) {
      		return console.log(error);
    	}
    	console.log("The message was sent!");
  		});  
	});

/*
;*/