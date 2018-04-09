/**
 * Created by Administrator on 2016/9/25.
 */
const common = require('./common');
const utils = require('commonutils').utils;
const request = common.request;
const url = common.url;
const expect = require('chai').expect;
const _ = require('lodash');


describe('Member Test Case:',()=>{

    let MemberTestCase = {
       // uuid:'LpyXfPXsWsoW0Fclt4VUeg',
        name: "李四gg",
        'idCard':'4304251498571652',
        'registerAt':'2017-6-4',
     /*   'beginAt':'',
        'endAt':'',*/
    };



    let memberUUID = null;
    let directUrl = null;

    let MemberUUID =null;

    directUrl = url + '/directorys/' + 'KuznH7NdKYPqpjl0NMamYg';

    describe('create test case:',  function(){
        it('success create an Member',  function() {
            this.timeout(0);
            return request.postRequest(`${directUrl}/members`,MemberTestCase).then( ( { res, body} )=>{


                console.log('Member test create   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(201);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                MemberUUID = utils.getResourceUUIDInURL(body.href,'members');
            });
        });


    });
    describe('retrieve test case:', function () {
        it('success retrieve an Member  ', function () {
            this.timeout(0);
            return request.getRequest(`${directUrl}/members/${MemberUUID}`).then( ( { res, body} )=>{

                console.log('Member test get   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });
    });
    describe('update test case:', function () {
        it('success update an Member', function () {

            this.timeout(0);
            let updateInfo = {};
            updateInfo.name = 'xxx brand';
            return request.postRequest(`${directUrl}/members/${MemberUUID}`,updateInfo).then( ( { res, body} )=>{

                console.log('Member test update   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
               // expect(body.description).to.equal(updateInfo.description);
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });
    });
    describe('list test case:', function () {
        it('list members by member:', function () {
            this.timeout(0);
            let qs =
            {
                //categoryUUID :'nvPhxm0mdVLtAKv7pt5UeQ',
            };
            return request.getRequest(`${directUrl}/members`,qs).then( ( { res, body} )=>{

                console.log('Member test list   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });


        it('list members by api:', function () {
            this.timeout(0);
            let qs =
                {
                    //categoryUUID :'nvPhxm0mdVLtAKv7pt5UeQ',
                };
            return request.getRequest(`${url}/members`,qs).then( ( { res, body} )=>{

                console.log('Member test list  by all :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });

    });
    describe('delete test case:',()=>{
        it('success delete an Member', function () {
            //this.timeout(0);
         /*   return request.deleteRequest(`${directUrl}/members/${MemberUUID}`).then( ( { res, body} )=>{
                expect(res.statusCode).to.equal(204);
            });*/
        });
    });


});

