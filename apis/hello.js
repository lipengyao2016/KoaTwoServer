var fn_hello = async (ctx, next) => {
    var name = ctx.params.name;
    console.log('hello,name:' + name);


     await  new Promise(function (resolve,reject) {
         setTimeout(function () {
             console.log('hello time called..');
             resolve(true);
         },25);
     })

    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};

var fn_index = async (ctx, next) => {
    console.log('index,/');
    ctx.response.body = '<h1>Index</h1>';
};

module.exports = {
    'GET /hello/:name': fn_hello,
    'GET /index': fn_index
};

