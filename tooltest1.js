var net = require('net');

// Example: nodejs tool.js 9991 eth-eu1.nanopool.org:9999 0x.. x ya@gmail.ru

// parse "80" and "localhost:80" or even "42mEANINg-life.com:80"
var addrRegex = /^(([a-zA-Z\-\.0-9]+):)?(\d+)$/;

var addr = {
	from: addrRegex.exec(process.argv[2]),
	to: addrRegex.exec(process.argv[3])
};

var adres_to = {
	host: addr.to[2],
	port: addr.to[3]
}

var host_from = addr.from[2];
var port_from = addr.from[3];

var wallet = process.argv[4];
var walletfull = wallet + "/" + process.argv[5] + "/" + process.argv[6];
//console.log("walletfull:_" + walletfull+ "_");

console.log("test1 slushaet 9994");

net.createServer(function(from) {

	var to = net.createConnection('9995');

	//from.pipe(to);
	from.on('data', function(d) {
		var request=d.toString();
		console.log("A  " + request);
	});

	//to.pipe(from);
	to.on('data', function(d) {
		var request=d.toString();
		//from.write(d);
		console.log("B			" + request);
	});





	from.on("error",function(err){
		//console.error(err);
	})
}).listen(port_from, host_from);
