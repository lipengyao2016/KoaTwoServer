/**
 * Created by Administrator on 2016/9/25.
 */
const common = require('./common');
const request = common.request;
const url = common.url;
const expect = require('chai').expect;
const _ = require('lodash');
const path = require('path');
var assert = require("assert");

/*
function stringToBytes ( str ) {
    var ch, st, re = [];
    for (var i = 0; i < str.length; i++ ) {
        ch = str.charCodeAt(i);  // get char
        st = [];                 // set up "stack"
        do {
            st.push( ch & 0xFF );  // push byte to stack
            ch = ch >> 8;          // shift value down by 1 byte
        }
        while ( ch );
        // add stack contents to result
        // done because chars have "wrong" endianness
        re = re.concat( st.reverse() );
    }
    // return an array of bytes
    return re;
}*/

describe('fileServer Test Case:',function(){
    let fileTestCase = {
        uploadType: "mobile",
    };

    describe('file upload test case:',  function(){

        it('success file findOwnerMemberByWxData data',  function() {
            return request.getRequest(`${url}/findOwnerMemberByWxData`,fileTestCase).then( ( { res, body} )=>{
                console.log(' test users create findOwnerMemberByWxData:' + JSON.stringify(body,null,2));
                expect(res.statusCode).to.equal(200);
            });
        });

        it('success file activeMember data',  function() {
            return request.postRequest(`${url}/activeMember`,{number:'48945321'}).then( ( { res, body} )=>{
                console.log(' test users create activeMember:' + JSON.stringify(body,null,2));
                expect(res.statusCode).to.equal(200);
            });
        });


    });


    describe('file download test case:',  function(){
        it('success file download data',  function() {

            return request.getRequest(`${url}/test`,{a:1}).then( ( { res, body} )=>{
                console.log(' test  create body:' + JSON.stringify(body));
                expect(res.statusCode).to.equal(200);
            });

        });

    });

});