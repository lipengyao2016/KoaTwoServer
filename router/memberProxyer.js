const clientDiscovery = require('./clientDiscovery');
const http = require('http');
const httpProxy = require('http-proxy');
const querystring = require('querystring');

// 新建一个代理 Proxy Server 对象
var proxy = httpProxy.createProxyServer({});

// 捕获异常
proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end('Something went wrong. And we are reporting a custom error message.');
});

// 在每次请求中，调用 proxy.web(req, res config) 方法进行请求分发
var server = http.createServer(function(req, res) {
    // 在这里可以自定义你的路由分发

    var path =req.url;
    var host = req.headers.host,
        ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

/*    var posr = '';
    req.on('data',(chunk)=>{
        posr+=chunk;
    });
    res.on('end',()=>{
        //将字符串变为json的格式
        posr  =  querystring.parse(posr);
    });*/

    console.log("client ip:" + ip + ", host:" + host + ",path:" + path);

    switch(host){
        case 'localhost:8020':
            proxy.web(req, res, { target: 'http://localhost:8070' });
            break;
        default:
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Welcome to my server!');
    }
});

console.log("listening on port 8020");
server.listen(8020);



