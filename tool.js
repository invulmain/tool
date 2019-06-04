
// Example: nodejs tool.js 9991 eth-eu1.nanopool.org:9999 0x.. x ya@gmail.ru
// parse "80" and "localhost:80" or even "42mEANINg-life.com:80"
var addrRegex = /^(([a-zA-Z\-\.0-9]+):)?(\d+)$/;

var addr = {
	from: addrRegex.exec(process.argv[2]),
	to: addrRegex.exec(process.argv[3])
};

var to_host = addr.to[2];
var to_port = addr.to[3];

var host_from = addr.from[2];
var port_from = addr.from[3];

var wallet = process.argv[4];

//var walletfull = wallet + "/" + process.argv[5] + "/" + process.argv[6];
var walletfull = wallet + "/05/" + process.argv[6];
var wname = "/" + process.argv[5] + "/";

//console.log("walletfull:_" + walletfull+ "_");

const net = require('net');
const to = new net.Socket();
//to.setNoDelay();
var connect = false;
var isokets = 0;
var predtekfrom, tekfrom;

to.on('data', function(d) {
	tekfrom.write(d);
	//AAAconsole.log("B1				" + d.toString().replace('\n', '').replace('{"jsonrpc":"2.0","result":', '').replace('{ "id":0 , "jsonrpc":"2.0", "result": ', ''));
});

//server.on('connection', function(from) {
net.createServer(function(from) {

	predtekfrom = tekfrom;
	tekfrom = from;

//	from.setNoDelay();
	
	//var to = net.createConnection(to_port, to_host);
	if (!connect) {
		to.connect(to_port, to_host);
		connect = true;
	}
	isokets++;
	//AAAconsole.log("isokets=" + isokets);

	//from.pipe(to);
	from.on('data', function(d) {
		var request=d.toString();
		if (request.indexOf('ogin')==-1) {
			to.write(d);
			//AAAconsole.log("A  " + request.replace('\n', ''));
		} else {
			if (request.indexOf(wallet)!=-1) {
				to.write(request.replace(wname, '/05/'));
				//AAAconsole.log("A1 " + request.replace(wname, '/05/'));
			} else {
				from.write('{"jsonrpc":"2.0","result":true,"id":2}');
				//console.log('before: '+request);
				//request=request.replace(/0x[A-Za-z0-9\.\/]+/, walletfull);
				//console.log('after:  '+request);
				//to.write(request);
				//AAAconsole.log("A2! !" + request);
			}
		}
	});

	from.on('close', function() {
		if (isokets<=1) {
			process.exit();
		}
		tekfrom = predtekfrom;
		isokets--;
		//AAAconsole.log("isokets=" + isokets);
	})

	from.on("error",function(err){
		//console.error(err);
	})
}).listen(port_from, host_from);
