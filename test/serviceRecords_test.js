/**
 * Created by Administrator on 2016/9/25.
 */
const common = require('./common');
const utils = require('commonutils').utils;
const request = common.request;
const url = common.url;
const expect = require('chai').expect;
const _ = require('lodash');


describe('serviceRecord Test Case:',()=>{

    let serviceRecordTestCase = {
        'recordType':'buyService',
        'tradeValue':6,
        'leftValue':40,
        'recordAt':'2017-5-2',
        'recordSource':'http://localhost:8070/api/v1.0.0/settleOrder/caoyTmQpw4FE5Of4Xljf8Q',
    };



    let memberCardUUID = null;
    let directUrl = null;

    let serviceRecordUUID =null;

    directUrl = url + '/directorys/' + 'KuznH7NdKYPqpjl0NMamYg' ;
    let memberURL = directUrl +  '/memberCards/' + 'KylSFjoq7z3sDwE3ch2YmQ' + '/memberCardServices/' + '46qARMrm1MeqxMSGXWPdlA' ;

    describe('create test case:',  function(){
        it('success create an serviceRecord',  function() {
            this.timeout(0);
            return request.postRequest(`${memberURL}/serviceRecords`,serviceRecordTestCase).then( ( { res, body} )=>{


                console.log('serviceRecord test create   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(201);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                serviceRecordUUID = utils.getResourceUUIDInURL(body.href,'serviceRecords');
            });
        });


    });
    describe('retrieve test case:', function () {
        it('success retrieve an serviceRecord  ', function () {
            this.timeout(0);
            return request.getRequest(`${memberURL}/serviceRecords/${serviceRecordUUID}`).then( ( { res, body} )=>{

                console.log('serviceRecord test get   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });
    });
    describe('update test case:', function () {
        it('success update an serviceRecord', function () {

            this.timeout(0);
            let updateInfo = {};
            updateInfo.serviceName = '洗衣服';
            return request.postRequest(`${memberURL}/serviceRecords/${serviceRecordUUID}`,updateInfo).then( ( { res, body} )=>{

                console.log('serviceRecord test update   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
               // expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {
        it('list serviceRecords by memberCard:', function () {
            this.timeout(0);
            let qs =
            {
                //categoryUUID :'nvPhxm0mdVLtAKv7pt5UeQ',
            };
            return request.getRequest(`${memberURL}/serviceRecords`,qs).then( ( { res, body} )=>{

                console.log('serviceRecord test list   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });

    });
    describe('delete test case:',()=>{
        it('success delete an serviceRecord', function () {
            //this.timeout(0);
         /*   return request.deleteRequest(`${directUrl}/serviceRecords/${serviceRecordUUID}`).then( ( { res, body} )=>{
                expect(res.statusCode).to.equal(204);
            });*/
        });
    });


});

