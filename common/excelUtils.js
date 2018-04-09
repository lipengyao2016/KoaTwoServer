/**
 * Created by Administrator on 2016/12/31.
 */

var xlsx = require('node-xlsx');
var fs = require('fs');
var nodeExcel = require('excel-export'); //关联excel-export模块

exports.readDataFromExcel = function (filePath) {

    //读取文件内容
    var obj = xlsx.parse(filePath);
    var excelObj=obj[0].data;
    console.log(excelObj);

    var data = [];
    if(excelObj.length <= 0 )
    {
        return null;
    }
    let attrs = excelObj[0];

    for(var i in excelObj){
        if(i != 0)
        {
            var dataObj={};
            var value=excelObj[i];
            if(value.length > 0)
            {
                for(var j in value){
                    dataObj[attrs[j]] = value[j] + '';
                }
                data.push(dataObj);
            }

        }

    }

    return data;

}

exports.writeDataToExcel = function (sheetName,cols,rows) {

    //读取文件内容
    /*  let conf ={cols,rows};

    conf.cols = [
        {caption:'string', type:'string'},
        {caption:'date', type:'date'},
        {caption:'bool', type:'bool'},
        {caption:'number', type:'number'}
    ];
    conf.rows = [
        ['pi', (new Date(2013, 4, 1)).getJulian(), true, 3.14],
        ["e", (new Date(2012, 4, 1)).getJulian(), false, 2.7182]
    ];

    let result = nodeExcel.execute(conf);*/

    let conf ={};
    conf.name = sheetName;
    conf.cols = cols.map((col,index)=>{
        //console.log('writeDataToExcel 1111 index:' + index + ' caption:' + col.caption);
        return {caption:col.caption,
        type:col.type};
    });
    conf.rows = rows.map(row=>{
        return cols.map((col,index)=>{
            //console.log('writeDataToExcel 222 index:' + index + ' caption:' + col.caption);
            return row[col.caption];
        });

    });

    let result = nodeExcel.execute(conf);
    return result;

}