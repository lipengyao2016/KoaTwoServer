/**
 * Created by Administrator on 2016/9/25.
 */
const common = require('./common');
const utils = require('commonutils').utils;
const request = common.request;
const url = common.url;
const expect = require('chai').expect;
const _ = require('lodash');


describe('tradeDetail Test Case:',()=>{

    let tradeDetailTestCase = {
       // uuid:'LpyXfPXsWsoW0Fclt4VUeg',
        'tradeAmount':20.0,
        'tradeNo':'201709050006',
        'tradeAt':'2017-9-5',
        'tradeSource':'cash',
        'tradeType':'cash',
    };



    let directoryUUID = null;
    let directUrl = null;

    let tradeDetailUUID =null;

    directUrl = url + '/tradeOrders/' + 'R3HcdEgTlE4eg7CoFPBlbw' + '/tradeObjects/' + 'FjNNnq40TZ8N97Zu6gJdqQ';

    describe('create test case:',  function(){
        it('success create an tradeDetail',  function() {
            this.timeout(0);
            return request.postRequest(`${directUrl}/tradeDetails`,tradeDetailTestCase).then( ( { res, body} )=>{


                console.log('tradeDetail test create   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(201);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                tradeDetailUUID = utils.getResourceUUIDInURL(body.href,'tradeDetails');
            });
        });


    });
    describe('retrieve test case:', function () {
        it('success retrieve an tradeDetail  ', function () {
            this.timeout(0);
            return request.getRequest(`${directUrl}/tradeDetails/${tradeDetailUUID}`).then( ( { res, body} )=>{

                console.log('tradeDetail test get   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });
    });
    describe('update test case:', function () {
        it('success update an tradeDetail', function () {

            this.timeout(0);
            let updateInfo = {};
            updateInfo.tradeAmount = 35.0;
            return request.postRequest(`${directUrl}/tradeDetails/${tradeDetailUUID}`,updateInfo).then( ( { res, body} )=>{

                console.log('tradeDetail test update   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
               // expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {
        it('list tradeDetails by directory:', function () {
            this.timeout(0);
            let qs =
            {
                //categoryUUID :'nvPhxm0mdVLtAKv7pt5UeQ',
            };
            return request.getRequest(`${directUrl}/tradeDetails`,qs).then( ( { res, body} )=>{

                console.log('tradeDetail test list   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });

    });
    describe('delete test case:',()=>{
        it('success delete an tradeDetail', function () {
            //this.timeout(0);
         /*   return request.deleteRequest(`${directUrl}/tradeDetails/${tradeDetailUUID}`).then( ( { res, body} )=>{
                expect(res.statusCode).to.equal(204);
            });*/
        });
    });


});

