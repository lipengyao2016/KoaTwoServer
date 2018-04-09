/**
 * Created by Administrator on 2016/9/25.
 */
const common = require('./common');
const utils = require('commonutils').utils;
const request = common.request;
const url = common.url;
const expect = require('chai').expect;
const _ = require('lodash');


describe('customer Test Case:',()=>{

    let customerTestCase = {
        "name": "liufei11",
        "vin": "34t36234623",
        "plantNo": "湘A2333",
        "createDocAt": "2017-8-14 00:00:00",
        "telephone": "13625148741",
    };



    let directoryUUID = null;
    let directUrl = null;

    let customerUUID =null;

    directUrl = url;

    describe('create test case:',  function(){
        it('success create an customer',  function() {
            this.timeout(0);
            return request.postRequest(`${directUrl}/customers`,customerTestCase).then( ( { res, body} )=>{


                console.log('customer test create   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(201);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                customerUUID = body.uuid;
            });
        });

    });
    describe('retrieve test case:', function () {
        it('success retrieve an customer  ', function () {
            this.timeout(0);
            return request.getRequest(`${directUrl}/customers/${customerUUID}`).then( ( { res, body} )=>{

                console.log('customer test get   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });

    });
    describe('update test case:', function () {
        it('success update an customer', function () {

            this.timeout(0);
            let updateInfo = {};
            updateInfo.vin = '784564wefsd';
            return request.postRequest(`${directUrl}/customers/${customerUUID}`,updateInfo).then( ( { res, body} )=>{

                console.log('customer test update   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
               // expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {
        it('list customers by directory:', function () {
            this.timeout(0);
            let qs =
            {
                //categoryUUID :'nvPhxm0mdVLtAKv7pt5UeQ',
            };
            return request.getRequest(`${directUrl}/customers`,qs).then( ( { res, body} )=>{

                console.log('customer test list   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });

    });
    describe('delete test case:',()=>{
        it('success delete an customer', function () {
            //this.timeout(0);
         /*   return request.deleteRequest(`${directUrl}/customers/${customerUUID}`).then( ( { res, body} )=>{
                expect(res.statusCode).to.equal(204);
            });*/
        });
    });


});
