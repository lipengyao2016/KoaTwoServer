/**
 * Created by Administrator on 2016/9/25.
 */
const expect = require('chai').expect;
const _ = require('lodash');
const common = require('../common');
const url = common.url;

const request = require('common-request').request;


describe('paydetails Test Case:',()=>{
    let paydetailsTestCase = {
        name:'micropay2',
        type:'wexin',

    };
    let applicationUUID = 'AppUUIDForTestCase';
    let paydetailsUUID = null;

    let tenantUUID = null;
    let tenantURL = null;

    tenantURL = url ;

   // paydetailsUUID = 'n6wjFnfhtA46MlO1hQWjIA';

    describe('create test case:',  ()=>{
        it('success create an paydetails',  ()=> {
            //this.timeout(0);

            return request.post(`${tenantURL}/paydetails`,paydetailsTestCase).then( ( {statusCode, body, headers, request} )=>{
                expect(statusCode).to.equal(201);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                console.log('paydetailss test  create  paydetailsUUID  :' + paydetailsUUID +
                    ' body:'+JSON.stringify(body,null,2));
            });


        });
    });
    describe('retrieve test case:', function () {
        it('success retrieve an paydetails  ', function () {
            //this.timeout(0);

            return request.get(`${tenantURL}/paydetails/${paydetailsUUID}`,{}).then( ( { statusCode,body,headers,request} )=>{

                console.log('paydetailss test retrieve   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
               // expect(body.name).to.equal(paydetailsTestCase.name);
            });
        });
    });
    describe('update test case:', function () {
        it('success update an paydetails', function () {
            //this.timeout(0);

            let updateInfo = {
                description : 'bbb descript',
            };

            return request.post(`${tenantURL}/paydetails/${paydetailsUUID}`,updateInfo).then( ( { statusCode,body,headers,request} )=>{

                console.log('paydetailss test update   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {
        it('list paydetailss  ', function () {
            //this.timeout(0);
            let merchantLists = [
                'RQZNqVpEbFxyZ7ayW7x2yA',
                'PQZNqVpEbFxyZ7ayW7x2yA'];
            let qs = {
               // name:'*good*',
                uuid:['mroxW2hNKYlc6Unr2R8afg','8WaVei47AB1Vl7yCt2hugw'],
                /*               offset:0,
                               limit:1,
                               createdAt:'[,2018-04-18 18:13:28]'*/
               // ownerHref:'http://localhost:5000/api/v1.0.0/applications/AQZNqVpEbFxyZ7ayW7x2yA',
            };
            return request.get(`${tenantURL}/paydetails`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('paydetailss test list   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });

    describe('delete test case:',()=>{
        it('success delete an paydetails', function () {
            //this.timeout(0);
           // paydetailsUUID = 'Zdw5JWKKDYXVcPD8ErNOTw';
          /*  return request.delete(`${tenantURL}/paydetails/${paydetailsUUID}`).then( ( { statusCode,body,headers,request} )=>{
                expect(statusCode).to.equal(204);
            });*/
        });
    });
});