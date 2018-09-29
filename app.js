/**
 * Created by Administrator on 2016/8/18.
 */
const koa = require('koa');
const bodyparser = require('koa-bodyparser');

const logger = require('koa-logger');
const onerror = require('koa-onerror');
const staticServer = require('koa-static');
const Jade = require('koa-jade');
const path = require('path');
const convert = require('koa-convert');

const json = require('koa-json');
const jwt = require('koa-jwt');
//const xtpl = require('xtplb/koa');

const router = require('./router/router');
const apidoc = require('./router/apidoc');
const config = require('./config/config');
const utils = require('common-data-utils').utils;
const _ = require('lodash');



const appKoa = koa();

const app =require('koa-qs')(appKoa, 'extended');





//app.use(async (ctx, next) => {
//    const start = new Date();
//    await next();
//    const ms = new Date() - start;
//    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
//});

//koa 2
//xtpl(app, {views : './publicml'});
//app.use(convert(logger()));
//app.use(convert(staticServer(path.join(__dirname,'public'))));
//app.use(convert(staticServer(path.join(__dirname,'apidoc'))));
//app.use(convert(bodyparser));
//app.use(convert(json()));

app.use(logger());
// JWT
app.use(function*(next){
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



});
app.use(function*(next){
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
});


app.use(staticServer(path.join(__dirname,'public')));
app.use(bodyparser({jsonLimit:'100mb'}));
app.use(json());
app.use(function* (next){
    if(this.method == 'POST' || this.method == 'PUT'){
        console.log(this.request.body);
    }
    yield* next;
});

const jade = new Jade({
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
});
app.use(apidoc.routes());


app.use(router.routes());


onerror(app);
app.on('error', function(err,ctx){
    console.log(err);
});

module.exports = app;

