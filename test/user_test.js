/**
 * Created by Administrator on 2016/9/25.
 */
const common = require('./common');
const utils = require('commonutils').utils;
const request = common.request;
const url = common.url;
const expect = require('chai').expect;
const _ = require('lodash');


describe('user Test Case:',()=>{

    let userTestCase = {
        "user_name": "wanmingqqq",
        "password": "88888",
        "address": "宝安",
        "phone_number": "13654782145",
    };



    let directoryUUID = null;
    let directUrl = null;

    let userUUID =null;

    directUrl = url;

    describe('create test case:',  function(){
        it('success create an user',  function() {
            this.timeout(0);
            return request.postRequest(`${directUrl}/users`,userTestCase).then( ( { res, body} )=>{


                console.log('user test create   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(201);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                userUUID = body.uuid;
            });
        });

    });
    describe('retrieve test case:', function () {
        it('success retrieve an user  ', function () {
            this.timeout(0);
            return request.getRequest(`${directUrl}/users/${userUUID}`).then( ( { res, body} )=>{

                console.log('user test get   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });

    });
    describe('update test case:', function () {
        it('success update an user', function () {

            this.timeout(0);
            let updateInfo = {};
            updateInfo.address = 'baoanxxxx';
            return request.postRequest(`${directUrl}/users/${userUUID}`,updateInfo).then( ( { res, body} )=>{

                console.log('user test update   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
               // expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {
        it('list users by directory:', function () {
            this.timeout(0);
            let qs =
            {
                //categoryUUID :'nvPhxm0mdVLtAKv7pt5UeQ',
                user_name:'haishang',
            };
            return request.getRequest(`${directUrl}/users`,qs).then( ( { res, body} )=>{

                console.log('user test list   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });

    });
    describe('delete test case:',()=>{
        it('success delete an user', function () {
            //this.timeout(0);
         /*   return request.deleteRequest(`${directUrl}/users/${userUUID}`).then( ( { res, body} )=>{
                expect(res.statusCode).to.equal(204);
            });*/
        });
    });


});

