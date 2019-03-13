/**
 * Created by Administrator on 2016/8/18.
 */
const  packagett = require('./package');
/*const easyMonitor = require('easy-monitor');
easyMonitor(packagett.name);*/


 const log4js = require('./log4js.v2');

const Koa = require('koa');
const logger = require('koa-logger');
const onerror = require('koa-onerror');
const staticServer = require('koa-static');
const Jade = require('koa-jade');
const path = require('path');
const convert = require('koa-convert');
const bodyparser = require('koa-bodyparser');
const json = require('koa-json');
const jwt = require('koa-jwt');

/*const router = require('./router/router');
const apidoc = require('./router/apidoc');*/
const config = require('./config/config');

const utils = require('common-data-utils').utils;
const _ = require('lodash');

const routerRegister = require('./routerRegister');

const Router = require('koa-router');

let router = new Router();

// 导入controller middleware:
const controller = require('./restFrameWork/controller');
//const proxy = require('koa-proxy2');

const proxy = require('http-proxy-middleware');
const c2 = require('koa2-connect');
const xmlParser = require('koa-xml-body');

/*const appKoa = koa();
const app =require('koa-qs')(appKoa, 'extended');*/


//const xtpl = require('xtplb/koa');
//koa 2
//xtpl(app, {views : './publicml'});
/*app.use(convert(logger()));
app.use(convert(staticServer(path.join(__dirname,'public'))));
app.use(convert(staticServer(path.join(__dirname,'apidoc'))));


app.use(convert(bodyparser));
app.use(convert(json()));

*/

// 创建一个Koa对象表示web app本身:
const appKoa = new Koa();

const app =require('koa-qs')(appKoa, 'extended');


app.use(xmlParser({
    xmlOptions: {
        explicitArray: false,
        ignoreAttrs : true,
        explicitRoot:false
    },
}));


app.use(async (ctx, next) => {
    console.log(`${ctx.method} ${ctx.url} logger begin`);
   const start = new Date();
   await next();
   const ms = new Date() - start;
   console.log(`${ctx.method} ${ctx.url} logger end - ${ms}ms`);
});


/*app.use(proxy({
    proxy_rules: [
        {
            proxy_location: /^\/v(?:0|1)/,
            proxy_pass: 'http://192.168.100.124',
            proxy_micro_service: false,
            proxy_merge_mode: false
        }
    ]
}));*/


/*// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {

    console.log(`${ctx.method} ${ctx.url} koa data response begin`);

    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
    console.log(`${ctx.method} ${ctx.url} koa data response end`);
});*/



app.use(convert(logger()));
// JWT
/*app.use(convert(function*(next){
    console.log('query:',this.query);
    let jwt_opt = { secret: config.jwt.public_key, algorithms: ['RS256'] ,passthrough:true};
    //优先使用Header头信息中的认证信息，若没有则使用query中的token
    if(!this.header.authorization){
        jwt_opt.getToken = function(){
            return this.query.token;
        };
    }

    if(!this.query.token && !this.header.authorization)
    {
        console.log(' no token in header and query!!!');
        yield*  next;
    }
    else
    {
        try {
            yield* jwt(jwt_opt).call(this,next);
        }
        catch (err){
            console.error(' user jwt error :' + err);
            let error = new Error();
            error.name = err.name;
            error.code = 9999;
            error.message = err.message;
            error.description = '';
            this.status = 401;
            this.body = error;
        }
    }



}));
app.use(convert(function*(next){
    if (this.state && this.state.user)
    {
        console.log('tokenInfo:',this.state.user);
        utils.checkRequiredParams(this.state.user,['user','merchant']);
        let {user,merchant}=this.state.user;
        let userHref = this.state.user.user.href;
        let merchantHref = this.state.user.merchant.href;
        this.jwt = _.cloneDeep(this.state.user);
        this.jwt.userUUID = utils.getResourceUUIDInURL(userHref,'users');
        this.jwt.merchantUUID = utils.getResourceUUIDInURL(merchantHref,'merchants');
        console.log(`merchant: ${this.jwt.merchantUUID} , user: ${this.jwt.userUUID}`);
    }

    yield* next;
}));*/


app.use(convert(staticServer(path.join(__dirname,'public'))));
app.use(convert(bodyparser({jsonLimit:'100mb'})));
app.use(convert(json()));

app.use(async function (ctx,next){
    if(ctx.method == 'POST' || ctx.method == 'PUT'){

        // delete ctx.request.body.token;

        console.log(`body:\n${JSON.stringify(ctx.request.body,null,2)}`);
    }
    else if(ctx.method == 'GET')
    {
        //delete ctx.queries.token;

        console.log(`query:\n${JSON.stringify(ctx.query,null,2)}`);
    }
    await next();
});


app.use(async function (ctx,next){
/*    if(ctx.method == 'POST' || ctx.method == 'PUT'){
        console.log(ctx.request.body);
    }*/

   /* if(ctx.originalUrl.indexOf('/api') >= 0)
    {
       await c2(proxy({target: 'http://localhost:6001', changeOrigin: true}));
    }
    else
    {*/
        await next();
    //}


});

/*var betterproxy = require('koa-better-http-proxy');

let url = require('url');

app.use(convert(betterproxy('localhosxxxt:60002', {
    filter: function(ctx) {
        return ctx.url.indexOf('/api') >= 0;
    },

    proxyReqPathResolver: function(ctx) {
        let urlData = url.parse(ctx.url);

        let serverIndex = urlData.path.indexOf('/',1);
       // let serverName = urlData.path.substr(1,serverIndex-1);
        let serverPath = urlData.path.substr(serverIndex);

        return serverPath;
    },

    proxyReqOptDecorator: function(proxyReqOpts, ctx) {

        let urlData = url.parse(ctx.url);

        let serverIndex = urlData.path.indexOf('/',1);
        let serverName = urlData.path.substr(1,serverIndex-1);

        //let serverPath = urlData.path.substr(serverIndex);
        //proxyReqOpts.path = serverPath;

        proxyReqOpts.host = 'localhost';

        if(serverName == 'menuServer')
        {
            proxyReqOpts.port = 6001;
        }
        else if(serverName == 'roleServer')
        {
            proxyReqOpts.port = 6002;
        }
        else if(serverName == 'userServer')
        {
            proxyReqOpts.port = 6003;
        }

        return proxyReqOpts;
    }

})));*/

/*const jade = new Jade({
    viewPath: './views',
    debug: false,
    pretty: false,
    compileDebug: false,
    //locals: global_locals_for_all_pages,
    // basedir: 'path/for/jade/extends',
    // helperPath: [
    //     'path/to/jade/helpers',
    //     { random: 'path/to/lib/random.js' },
    //     { _: require('lodash') }
    // ],
    app: app // equals to jade.use(app) and app.use(jade.middleware)
});*/

//app.use(apidoc.routes());

controller(router,__dirname);
routerRegister(router);
routerRegister(router,'controllers/business');


router.post('/info', async function (ctx,next) {
    console.log('info,query',ctx.query);
    ctx.body = {status: true,message:"It's works!"};
    ctx.statusCode = 200;
}
);

router.post('/payInfo', async function (ctx,next) {
        console.log('info,body',ctx.request.body);
        ctx.body = {status: true,message:"It's works!"};
        ctx.statusCode = 200;
    }
);

router.post('/refundInfo', async function (ctx,next) {
        console.log('refundInfo,body',ctx.request.body);
        ctx.body = {status: true,message:"It's works!"};
        ctx.statusCode = 200;
    }
);

router.get('/health',async function (ctx,next)  {
    console.log('health');

    const now = Date.now();
    let  i = 1;
    while (Date.now() - now < 5000)
    {
        i = (i+1) * (i+2);
        if(i>100000000)
        {
            i = 1;
        }
    };

    console.log('health,',i);

    ctx.body = {
        status: 'UP'
    };
    ctx.statusCode = 200;
});



// add router middleware:
app.use(router.routes());




// 在端口3000监听:
let server =app.listen(7000);

/*server.on('error', function(err,ctx){
    console.log(err);
});*/


//server.keepAliveTimeout=10000;

console.log('app koa2 started at port 7000...');


onerror(app);
app.on('error', function(err,ctx){
    console.log(err);
});

module.exports = app;

