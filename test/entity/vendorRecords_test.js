/**
 * Created by Administrator on 2016/9/25.
 */
const expect = require('chai').expect;
const _ = require('lodash');
const common = require('../common');
const url = common.url;

const request = require('common-request').request;


describe('vendorrecords Test Case:',()=>{
    let vendorrecordsTestCase = {
        status:'payed',
       // remark:{channel:5},
        vendorOrderUUID:'yqtLjzmqRvZXgfGNmlOG5A',
      //  remark:{type:'json'},
    };
    let applicationUUID = 'AppUUIDForTestCase';
    let vendorrecordsUUID = null;

    let tenantUUID = null;
    let tenantURL = null;

    tenantURL = url ;

   // vendorrecordsUUID = 'n6wjFnfhtA46MlO1hQWjIA';

    describe('create test case:',  ()=>{
        it('success create an vendorrecords',  ()=> {
            //this.timeout(0);

/*            request.post(`${tenantURL}/vendorrecords`,venRecord).then( ( {statusCode, body, headers, request} )=>{
                expect(statusCode).to.equal(201);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                console.log('vendorrecordss test  create  vendorrecordsUUID  :' + vendorrecordsUUID +
                    ' body:'+JSON.stringify(body,null,2));
            });*/

            let reqPromises = [];
            for(let i = 21 ;i < 23;i++)
            {
                let venRecord = _.clone(vendorrecordsTestCase);
                venRecord.status = venRecord.status + '_' +   i;
                reqPromises.push(request.post(`${tenantURL}/vendorrecords`,venRecord));
            }

            return Promise.all(reqPromises).then(data=>{
                console.log(data);
            });

        });
    });
    describe('retrieve test case:', function () {
        it('success retrieve an vendorrecords  ', function () {
            //this.timeout(0);

            return request.get(`${tenantURL}/vendorrecords/${vendorrecordsUUID}`,{}).then( ( { statusCode,body,headers,request} )=>{

                console.log('vendorrecordss test retrieve   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
               // expect(body.name).to.equal(vendorrecordsTestCase.name);
            });
        });
    });
    describe('update test case:', function () {
        it('success update an vendorrecords', function () {
            //this.timeout(0);

            let updateInfo = {
                description : 'bbb descript',
            };

            return request.post(`${tenantURL}/vendorrecords/${vendorrecordsUUID}`,updateInfo).then( ( { statusCode,body,headers,request} )=>{

                console.log('vendorrecordss test update   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {
        it('list vendorrecordss  ', function () {
            //this.timeout(0);
            let merchantLists = [
                'RQZNqVpEbFxyZ7ayW7x2yA',
                'PQZNqVpEbFxyZ7ayW7x2yA'];
            let qs = {
               // name:'*good*',
              //  uuid:['cpr3itz9sxCHoOtyY4xnMQ','32rXY83LUyvuhkx3Hk6Xog'],
                /*               offset:0,
                               limit:1,
                               createdAt:'[,2018-04-18 18:13:28]'*/
               // ownerHref:'http://localhost:5000/api/v1.0.0/applications/AQZNqVpEbFxyZ7ayW7x2yA',
                status:/*['payed_3','payed_8']*/ '*9*',
            };
            return request.get(`${tenantURL}/vendorrecords`,qs).then( ( { statusCode,body,headers,request} )=>{

                console.log('vendorrecordss test list   :' + JSON.stringify(body,null,2));

                expect(statusCode).to.equal(200);
                expect(headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });

    describe('delete test case:',()=>{
        it('success delete an vendorrecords', function () {
            //this.timeout(0);
           // vendorrecordsUUID = 'Zdw5JWKKDYXVcPD8ErNOTw';
          /*  return request.delete(`${tenantURL}/vendorrecords/${vendorrecordsUUID}`).then( ( { statusCode,body,headers,request} )=>{
                expect(statusCode).to.equal(204);
            });*/
        });
    });
});