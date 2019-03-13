/**
 * Created by Administrator on 2016/9/25.
 */
const expect = require('chai').expect;
const _ = require('lodash');
const common = require('../common');
const url = common.url;

const request = require('common-request').request;


describe('vendororders Test Case:',()=>{
    let vendorordersTestCase = {
        orderNumber:'201902200003',
        deviceSN:'9225741',
        merchantUUID:'pzObOM58JtGTMnDYWGr1tw',

        totalAmount:500,
      //  remark:{type:'json'},
    };
    let applicationUUID = 'AppUUIDForTestCase';
    let vendorordersUUID = null;

    let tenantUUID = null;
    let tenantURL = null;

    tenantURL = url ;

   // vendorordersUUID = 'n6wjFnfhtA46MlO1hQWjIA';

    describe('create test case:',  ()=>{
        it('success create an vendororders',  ()=> {
            //this.timeout(0);

            return request.post(`${tenantURL}/vendororders`,vendorordersTestCase).then( ( {statusCode, body, headers, request} )=>{
                expect(statusCode).to.equal(201);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');



                console.log('vendororderss test  create  vendorordersUUID  :' + vendorordersUUID +
                    ' body:'+JSON.stringify(body,null,2));
            });
        });
    });
    describe('retrieve test case:', function () {
        it('success retrieve an vendororders  ', function () {
            //this.timeout(0);

            return request.get(`${tenantURL}/vendororders/${vendorordersUUID}`,{}).then( ( { statusCode,body,headers,request} )=>{

                console.log('vendororderss test retrieve   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
               // expect(body.name).to.equal(vendorordersTestCase.name);
            });
        });
    });
    describe('update test case:', function () {
        it('success update an vendororders', function () {
            //this.timeout(0);

            let updateInfo = {
                description : 'bbb descript',
            };

            return request.post(`${tenantURL}/vendororders/${vendorordersUUID}`,updateInfo).then( ( { statusCode,body,headers,request} )=>{

                console.log('vendororderss test update   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {
        it('list vendororderss  ', function () {
            //this.timeout(0);
            let merchantLists = [
                'RQZNqVpEbFxyZ7ayW7x2yA',
                'PQZNqVpEbFxyZ7ayW7x2yA'];
            let qs = {
               // name:'*good*',
                uuid:['yA9wuOW1FwOJAkEok20lDg','ef8XU5eLSjkXV0JzWk6jdA'],
                /*               offset:0,
                               limit:1,
                               createdAt:'[,2018-04-18 18:13:28]'*/
               // ownerHref:'http://localhost:5000/api/v1.0.0/applications/AQZNqVpEbFxyZ7ayW7x2yA',
            };
            return request.get(`${tenantURL}/vendororders`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('vendororderss test list   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });

    describe('delete test case:',()=>{
        it('success delete an vendororders', function () {
            //this.timeout(0);
           // vendorordersUUID = 'Zdw5JWKKDYXVcPD8ErNOTw';
          /*  return request.delete(`${tenantURL}/vendororders/${vendorordersUUID}`).then( ( { statusCode,body,headers,request} )=>{
                expect(statusCode).to.equal(204);
            });*/
        });
    });
});