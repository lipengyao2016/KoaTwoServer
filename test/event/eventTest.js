const EventEmitter = require('events');

/*
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', (name,age) => {
    console.log('触发事件,',name,age);
});

myEmitter.on('got', (name,age) => {
    console.log('触发事件,',name,age);
});

myEmitter.on('the', (name,age) => {
    console.log('触发事件,',name,age);
});

myEmitter.emit('event','liming',23);
console.log('emit event ok..',myEmitter.eventNames(),myEmitter.getMaxListeners());*/


/*
var life = new EventEmitter();

//
life.on('求安慰', function(who){
    console.log('xxxx,',who)
})



function check(){
    console.log('xxxx4354')
}

life.on('boys',check)


// 移除监听
life.removeListener('boys', check)

var hasconforListeren = life.emit('求安慰', '汉子');
var hasconforListeren = life.emit('boys', check);
console.log(hasconforListeren)

console.log(life.listeners('boys'))

console.log(EventEmitter.listenerCount(life, '求安慰'))

process.on('exit', (code) => {
    console.log(`退出码: ${code}`);
});

var hasconforListeren = life.emit('求安慰', '汉子');*/
