
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
var wmail = process.argv[6];

//console.log("walletfull:_" + walletfull+ "_");

var netv = require('net');
var net = require('net');
var net0 = require('net');
//var net1 = require('net');
//var net2 = require('net');
//var net3 = require('net');
//var net4 = require('net');
//var net5 = require('net');
//var net6 = require('net');
//var net7 = require('net');
//var net8 = require('net');
//var net9 = require('net');


const to = new net.Socket();

var connect = false;
var isokets = 0;
var predtekfrom, tekfrom;

var tekstr = "";

var maslen = 1;
var mastekstr = new Array(maslen);
var mastosoc  = new Array(maslen);
for (var i = 0; i < maslen; i++) {
	mastekstr[i]="";
}
mastosoc[0]=new net0.Socket();
//mastosoc[1]=new net1.Socket();
//mastosoc[2]=new net2.Socket();
//mastosoc[3]=new net3.Socket();
//mastosoc[4]=new net4.Socket();
//mastosoc[5]=new net5.Socket();
//mastosoc[6]=new net6.Socket();
//mastosoc[7]=new net7.Socket();
//mastosoc[8]=new net8.Socket();
//mastosoc[9]=new net9.Socket();



//to_host='eth-eu1.nanopool.org';
//to_host2='eth-eu2.nanopool.org';
//to_port='9999';



to.on('data', function(d) {
tekfrom.write(d);
//AAAconsole.log('\x1b[32m%s\x1b[0m',"B1				    " + d.toString().replace('\n', '').replace('{"jsonrpc":"2.0","result":', '').replace('{ "id":0 , "jsonrpc":"2.0", "result": ', ''));
var request=d.toString();
if (request.indexOf('result":["')!=-1 || request.indexOf('result": ["')!=-1) {
request=request.substring(request.indexOf('["')+2);
tekstr =request.substring(0, request.indexOf('","0x'));
}

});


mastosoc[0].on('data', function(d) { obr(0, d); });
//mastosoc[1].on('data', function(d) { obr(1, d); });
//mastosoc[2].on('data', function(d) { obr(2, d); });
//mastosoc[3].on('data', function(d) { obr(3, d); });
//mastosoc[4].on('data', function(d) { obr(4, d); });
//mastosoc[5].on('data', function(d) { obr(5, d); });
//mastosoc[6].on('data', function(d) { obr(6, d); });
//mastosoc[7].on('data', function(d) { obr(7, d); });
//mastosoc[8].on('data', function(d) { obr(8, d); });
//mastosoc[9].on('data', function(d) { obr(9, d); });






//server.on('connection', function(from) {
netv.createServer(function(from) {

	predtekfrom = tekfrom;
	tekfrom = from;

	//var to = net.createConnection(to_port, to_host);
	if (!connect) {
		to.connect(to_port, to_host);
		for (var i = 0; i < maslen; i++) {
			mastosoc[i].connect(to_port, to_host);
		}
		connect = true;
	}
	isokets++;
//AAA	console.log("isokets=" + isokets);

	//from.pipe(to);
	from.on('data', function(d) {
		var request=d.toString();
		if (request.indexOf('ogin')==-1) {

			if (request.indexOf('eth_submitWork')!=-1) {

				to.write(d);
//AAA				console.log("A  " + request.replace('\n', ''));


				for (var i = 0; i < maslen; i++) {
					if (mastekstr[i]==tekstr) {
						mastosoc[i].write(d);
//AAA						console.log('\x1b[33m%s\x1b[0m',"!!!!!!!!!!!!!!!!!A " + i + " " + request.replace('\n', ''));
					}
				}


			} else {
				// 'eth_submitWork'
				//to.write(d);
				//to2.write(d);
				//to3.write(d);
				//to4.write(d);
				//console.log("A  " + request.replace('\n', ''));
			}
		} else {
			if (request.indexOf(wallet)!=-1) {
				to.write(request.replace(wname, '/05/'));
//AAA				console.log("A1 " + request.replace(wname, '/05/'));

				for (var i = 0; i < maslen; i++) {
					mastosoc[i].write(request.replace(wname, '/05/'));
//AAA					console.log("A8 i" + i + ' ' + request.replace(wname, '/05/'));
				}
				//to2.write(request.replace(wname, '').replace(wmail, ''));
				//console.log("A8 " + request.replace(wname, '').replace(wmail, ''));
			} else {
				from.write('{"jsonrpc":"2.0","result":true,"id":2}');
				//console.log('before: '+request);
				//request=request.replace(/0x[A-Za-z0-9\.\/]+/, walletfull);
				//console.log('after:  '+request);
				//to.write(request);
//AAA				console.log("A2! !" + request);
			}
		}
	});

	from.on('close', function() {
		if (isokets<=1) {
			process.exit();
		}
		tekfrom = predtekfrom;
		isokets--;
//AAA		console.log("isokets=" + isokets);
	})

	from.on("error",function(err){
		//console.error(err);
	})
}).listen(port_from, host_from);




function obr(teki, d) {
	var request=d.toString();
	if (request.indexOf('result":["')!=-1 || request.indexOf('result": ["')!=-1) {
		request=request.substring(request.indexOf('["')+2);
		mastekstr[teki]=request.substring(0, request.indexOf('","0x'));
	}
//AAA	if (tekstr==mastekstr[teki]) {
//AAA		console.log('\x1b[33m%s\x1b[0m',""+teki+"				    " + d.toString().replace('\n', '').replace('{"jsonrpc":"2.0","result":', '').replace('{ "id":0 , "jsonrpc":"2.0", "result": ', '').replace('\r', ''));
//AAA	} else {
//AAA		console.log(""+teki+"				" + d.toString().replace('\n', '').replace('{"jsonrpc":"2.0","result":', '').replace('{ "id":0 , "jsonrpc":"2.0", "result": ', '').replace('\r', ''));
//AAA	}
}
