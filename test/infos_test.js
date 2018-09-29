/**
 * Created by Administrator on 2016/9/25.
 */
const expect = require('chai').expect;
const _ = require('lodash');
const common = require('./common');
const url = common.root;

const request = require('common-request').request;


describe('repayRecords Test Case:',()=>{


    let ownerUUID = 'AppUUIDForTestCase';
    let repayRecordsUUID = null;

    let tenantUUID = null;
    let tenantURL = null;

    tenantURL = url /*+ '/directories' + '/zbDG5Ul3MHzHOEBFYyIalQ' + '/repayRecordsPackages' + '/n97eIgDCIO6wecGkvc19UQ'*/ ;



    describe('create test case:',  ()=>{
        it('success create an repayRecords',  ()=> {
            //this.timeout(0);

            return request.post(`${url}/repayRecords`,repayRecordsTestCase).then( ( {statusCode, body, headers, request} )=>{

                console.log('repayRecords test  create  body:'+JSON.stringify(body,null,2));

                expect(statusCode).to.equal(201);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');

                repayRecordsUUID = utils.getResourceUUIDInURL(body.href,'repayRecords');


            });
        });

       /* it('success batchCreate an repayRecords',  ()=> {
            //this.timeout(0);

            return request.post(`${url}/repayRecords/batchCreate`,batchrepayRecordsTestCase).then( ( {statusCode, body, headers, request} )=>{
                expect(statusCode).to.equal(201);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');

                console.log('repayRecords test  create   body:'+JSON.stringify(body,null,2));
            });
        });*/


    });
    describe('retrieve test case:', function () {
        it('success retrieve an repayRecords  ', function () {
            //this.timeout(0);

            return request.get(`${tenantURL}/repayRecords/${repayRecordsUUID}`,{}).then( ( { statusCode,body,headers,request} )=>{

                console.log('repayRecords test retrieve   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.ownerURIReg.test(res.headers['location'])).to.be.true;
               // expect(body.name).to.equal(repayRecordsTestCase.name);
            });
        });
    });
    describe('update test case:', function () {
       /* it('success update an repayRecords', function () {
            //this.timeout(0);
           // repayRecordsUUID = '7O1PwyXNuUOEXxvRfvbyrQ';
            let updateInfo = {
                age:35,
                "customerData": {
                    "spec": "足球xx",
                    "height": 182,
                    "weight": 173
                },
                postHref:'http://localhost:6006/api/v1/posts/t8HgkFSNUgbl4EaXXvi0iw',
            };

            return request.post(`${tenantURL}/repayRecords/${repayRecordsUUID}`,updateInfo).then( ( { statusCode,body,headers,request} )=>{

                console.log('repayRecords test update   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.ownerURIReg.test(res.headers['location'])).to.be.true;
            });
        });*/

    });
    describe('list test case:', function () {


        it('list repayRecords  ', function () {
            //this.timeout(0);

            let header =
                {
                  //  "authorization": `Bearer ${token}`,
                    "Connection": 'Keep-Alive',
                };

            let options = {
                headers: header,
            };


            return request.get(`${url}/info`,{},options).then( ( { statusCode,body,headers,request} )=>{

                console.log(' test info   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });



    });

    describe('delete test case:',()=>{
        it('success delete an repayRecords', function () {
            //this.timeout(0);
           /* return request.delete(`${tenantURL}/repayRecords/${repayRecordsUUID}`).then( ( { statusCode,body,headers,request} )=>{
                expect(statusCode).to.equal(204);
            });*/
        });

     /*   it('success batchDelete an repayRecords', function () {
            //this.timeout(0);

             return request.delete(`${tenantURL}/repayRecords/batchDelete`,{uuid:['8KdDL56QDf1tuK3E6rH3Mg','gSWYc46G8tqEYYiZ9842hA']}).then( ( { statusCode,body,headers,request} )=>{
                 expect(statusCode).to.equal(204);
             });
        });*/
    });
});