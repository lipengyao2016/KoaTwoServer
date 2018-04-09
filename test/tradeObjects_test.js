/**
 * Created by Administrator on 2016/9/25.
 */
const common = require('./common');
const utils = require('commonutils').utils;
const request = common.request;
const url = common.url;
const expect = require('chai').expect;
const _ = require('lodash');


describe('tradeObject Test Case:',()=>{

    let tradeObjectTestCase = {
       // uuid:'LpyXfPXsWsoW0Fclt4VUeg',
        'goodsHref':'http://localhost:8070/api/v1.0.0/directorys/KuznH7NdKYPqpjl0NMamYg/goods/cylSFjoq7z3sDwE3ch2YmQ',
        'quatity':4,
        'orignAmount':100.0,
        'tradeAmount':40.0,
        'tradeAt':'2017-9-5',
    };



    let directoryUUID = null;
    let directUrl = null;

    let tradeObjectUUID =null;

    directUrl = url + '/tradeOrders/' + 'R3HcdEgTlE4eg7CoFPBlbw';

    describe('create test case:',  function(){
        it('success create an tradeObject',  function() {
            this.timeout(0);
            return request.postRequest(`${directUrl}/tradeObjects`,tradeObjectTestCase).then( ( { res, body} )=>{


                console.log('tradeObject test create   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(201);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                tradeObjectUUID = utils.getResourceUUIDInURL(body.href,'tradeObjects');
            });
        });


    });
    describe('retrieve test case:', function () {
        it('success retrieve an tradeObject  ', function () {
            this.timeout(0);
            return request.getRequest(`${directUrl}/tradeObjects/${tradeObjectUUID}`).then( ( { res, body} )=>{

                console.log('tradeObject test get   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });
    });
    describe('update test case:', function () {
        it('success update an tradeObject', function () {

            this.timeout(0);
            let updateInfo = {};
            updateInfo.tradeAmount = 35.0;
            return request.postRequest(`${directUrl}/tradeObjects/${tradeObjectUUID}`,updateInfo).then( ( { res, body} )=>{

                console.log('tradeObject test update   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
               // expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {
        it('list tradeObjects by directory:', function () {
            this.timeout(0);
            let qs =
            {
                //categoryUUID :'nvPhxm0mdVLtAKv7pt5UeQ',
            };
            return request.getRequest(`${directUrl}/tradeObjects`,qs).then( ( { res, body} )=>{

                console.log('tradeObject test list   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });

    });
    describe('delete test case:',()=>{
        it('success delete an tradeObject', function () {
            //this.timeout(0);
         /*   return request.deleteRequest(`${directUrl}/tradeObjects/${tradeObjectUUID}`).then( ( { res, body} )=>{
                expect(res.statusCode).to.equal(204);
            });*/
        });
    });


});

