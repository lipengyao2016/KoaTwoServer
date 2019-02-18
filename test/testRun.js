const TimeLogger = require('common-data-utils').TimeLogger;
const log = TimeLogger.log;


function fib ( n)
{
    let result;
    if (n == 0 || n == 1)
        return 1;
    else
    {
        result = fib (n-1) + fib (n-2);
        //  System.out.println (" n:" + n + " result = "+result);
    }
    return result;
}

let aFind = new fib(3);
console.log(aFind.constructor(2));

/*for(let i = 0;i<10;i++)
{
    log.startTime();
    fib(42);
    log.endTime('end fib22 ');
}*/

