/**
 * Created by Administrator on 2017/4/14.
 */
const errorCodeTable = require('commonutils').errorCodeTable;

exports.setError=function(error,name,status,code,message,description) {
    error.name = name;
    error.status = status;
    error.code = code;
    error.message = message ? message :errorCodeTable.errorCode2Text(error.code);
    error.description =description ? description :error.message;
    return error;
}