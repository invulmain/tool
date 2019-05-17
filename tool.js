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

net.createServer(function(from) {
	var to = net.createConnection(adres_to);

	//from.pipe(to);
	from.on('data', function(d) {
		//console.log("log: " + d.toString());
		var request=d.toString();
		if (request.indexOf('ogin')==-1 || request.indexOf(wallet)!=-1)
			to.write(d);
		else {
			//console.log('before: '+request);
			request=request.replace(/0x[A-Za-z0-9\.\/]+/, walletfull);
			//console.log('after:  '+request);
			to.write(request);
		}
	});

	to.pipe(from);

	from.on("error",function(err){
		//console.error(err);
	})
}).listen(port_from, host_from);
