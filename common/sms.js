/**
* Created by Administrator on 15-10-28.
*/
var eventproxy = require('eventproxy');
var querystring = require('querystring');
var http = require('http');

var option = {
    "url" : "http://port.365car.com.cn/bizservice/biss!sendsms.action",
    "parameter" : {
        'reqSerName' : 'tsi',
        'reqAccountNo' : 'tsi',
        'receiveNumber' : '',
        'taskName' : 'smsTest',
        'msgContent' : '',
        'sign' : '632e15c3de8fbd213bceda890c78f1d9'
    }

}

exports.sendSMS = function(mobile, content, callback ){
    var ep = new eventproxy();
    ep.on('return',function(error){
        ep.removeAllListeners('return');
        callback(error);
    });

    var qs = querystring.stringify({
        'reqSerName' : option.parameter.reqSerName,
        'reqAccountNo' : option.parameter.reqAccountNo,
        'receiveNumber' : mobile,
        'taskName' : option.parameter.taskName,
        'msgContent' : content,
        'sign' : option.parameter.sign
    });
    var stiSmsUrl = option.url +'?' + qs;
    var req = http.get(stiSmsUrl, function(res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end',function(){
            var resJson = {};
            try{
                resJson = JSON.parse(data);
            }
            catch (err){
                resJson.resultCode = '9000'
            }

            if(parseInt(resJson.resultCode)===0){
                console.log('The mobile '+ mobile + ' send verification code succeed.' );
                ep.emit('return',null);
            }
            else{
                var message = 'The mobile '+ mobile + ' send verification code fail.';
                console.log(message);
                var error = new Error(message);
                ep.emit('return',error);
            }
        });
    });
    req.setTimeout(1*60*1000,function(){
        var message = 'The mobile '+ mobile + ' sent verification code timeout.';
        console.log(message);
        var error = new Error(message);
        ep.emit('return',error);
    });
    req.on('error', function(e) {
        console.log('The mobile '+ mobile + ' sent verification code error.');
        console.log(e);
        ep.emit('return',e);
    });
};
