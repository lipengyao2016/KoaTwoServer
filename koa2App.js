/**
 * Created by Administrator on 2016/8/18.
 */
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

const utils = require('commonutils').utils;
const _ = require('lodash');

//const router = require('koa-router')();

// 导入controller middleware:
const controller = require('./controller');


/*const appKoa = koa();
const app =require('koa-qs')(appKoa, 'extended');*/


//const xtpl = require('xtplb/koa');
//koa 2
//xtpl(app, {views : './publicml'});
/*app.use(convert(logger()));
app.use(convert(staticServer(path.join(__dirname,'public'))));
app.use(convert(staticServer(path.join(__dirname,'apidoc'))));
app.use(convert(bodyparser));
app.use(convert(json()));*/


// 创建一个Koa对象表示web app本身:
const app = new Koa();

app.use(async (ctx, next) => {

    console.log(`${ctx.method} ${ctx.url} logger begin`);
   const start = new Date();
   await next();
   const ms = new Date() - start;
   console.log(`${ctx.method} ${ctx.url} logger end - ${ms}ms`);
});

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
app.use(convert(function*(next){
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
}));


app.use(convert(staticServer(path.join(__dirname,'public'))));
app.use(convert(bodyparser({jsonLimit:'100mb'})));
app.use(convert(json()));
app.use(convert(function* (next){
    if(this.method == 'POST' || this.method == 'PUT'){
        console.log(this.request.body);
    }
    yield* next;
}));

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

/*app.use(apidoc.routes());

app.use(router.routes());*/


// add router middleware:
//app.use(router.routes());

// 使用middleware:
app.use(controller());


// 在端口3000监听:
app.listen(8070);
console.log('app koa2 started at port 8070...');


onerror(app);
app.on('error', function(err,ctx){
    console.log(err);
});

module.exports = app;

