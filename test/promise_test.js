var DataLoader = require('dataloader');
var _ = require('lodash');



let userDatas = [
    { id: 2, name: 'San Francisco' },
    { id: 9, name: 'Chicago' },
    { id: 1, name: 'New York' }
];



function testPromise() {
    console.log('testPromise start ');
    let curPromise = new Promise( (resolve,reject) => {
        console.log('promise run start ');
        let sum = 0;
        for(let i = 0;i < 1000;i++)
        {
            sum += i;
        }
        console.log('promise run end ');
        reject('sumerr');
        resolve(sum);
    })

    console.log('testPromise end ');
    return curPromise;
}

//process.nextTick(foo);
testPromise().then(data=>{
    console.log('get result:' + data);
})
console.error('bar');

console.log(`This processor architecture is ${process.arch}`);

//process.abort();



process.on('unhandledRejection', (reason, promise) => {
    console.error('unhandledRejection:',promise, reason);
});
process.on('rejectionHandled', (promise) => {
    console.error('rejectionHandled:',promise);
});
process.on('uncaughtException', (err) => {
    console.error( `捕获的异常：${err}\n`);
});
moksdf();