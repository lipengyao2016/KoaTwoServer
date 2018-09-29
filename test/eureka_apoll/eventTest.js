var EventEmitter = require('events').EventEmitter;

var  fs= require('fs');

function StreamLibrary(resourceName) {
    let ctx = this;
    //this.emit('start');

    process.nextTick(function() {
        ctx.emit('start');
    });

    console.log('start get resource.');


    setTimeout(function () {

        console.log('start read file.');
        fs.readFile(__dirname + '/crpto.js',function readCallBack(err,fileData)
        {
            console.log('got read file.');
            // read from the file, and for every chunk read, do:
            ctx.emit('data', fileData);
        });
    },1);
}
StreamLibrary.prototype.__proto__ = EventEmitter.prototype;   // inherit from EventEmitter

var stream = new StreamLibrary('fooResource');

stream.on('start', function() {
    console.log('Reading has started');
});

stream.on('data', function(chunk) {
    console.log('Received: ' + chunk);
});