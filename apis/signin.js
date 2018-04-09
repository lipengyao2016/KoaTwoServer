
var signProxy = require('../proxy/signProxy');

var fn_signin = async (ctx, next) => {

    var name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);

    let ret = await  signProxy.sign(name,password);

    let data = JSON.stringify(ret);

    ctx.response.body = `<h1>${name},loginStatus:${data}!</h1>`;

   /* if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }*/

};


module.exports = {
    'POST /signin': fn_signin,
};

