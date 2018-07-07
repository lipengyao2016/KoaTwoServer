

let bFinished = false;

let fiboRet ;

function fibo (n) {
    console.log('fibo n:' + n);

    let i = 0;
    let sum = 0;
    while(i < n)
    {
        sum += i;
        i++;
    }

    console.log('fibo sum:' + sum);

    return sum;

   // return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
}

function cb (err, data) {
   // process.stdout.write(data);
    console.log('thread func data:' + data);
    //this.eval('fibo(35)', cb);
    bFinished  =true;
    fiboRet = data;
}


console.log('main thread create go thread start.' );

var thread= require('threads_a_gogo').create();

thread.eval('fibo(3500)', cb);

//fibo(350000);

let k = 0;
(function spinForever () {
    k++;
   /* if(k%100000000 == 0)
    {
        console.log('check bReadOk k:' + k);
    }*/
    setImmediate(spinForever);
})();


console.log('main thread run end.' );
