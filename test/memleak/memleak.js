
var http = require('http');
var memwatch = require('node-memwatch');

console.log('init  memory:' , process.memoryUsage());
// Take first snapshot


var server = http.createServer(function (req, res) {

   // var hd = new memwatch.HeapDiff();
    console.log('init  createServer memory:' , process.memoryUsage());

    for (var i=0; i<1000; i++) {
        server.on('request', function leakyfunc() {});
    }

    res.end('Hello World\n');

    console.log('init on Request  memory:' , process.memoryUsage());

    //var diff = hd.end();

    //console.log('memwatch heapDiff,',diff);



}).listen(1337, '127.0.0.1');
server.setMaxListeners(0);
console.log('Server running at http://127.0.0.1:1337/. Process PID: ', process.pid);
console.log('init async end  memory:' , process.memoryUsage());

memwatch.on('leak', function(info) { console.log('memwatch leak ,',info) });
memwatch.on('stats', function(stats) { console.log('memwatch stats ,',stats) });