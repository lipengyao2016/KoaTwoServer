'use strict';

/**
 * Created by Administrator on 2016/9/25.
 */
const common = require('./common');
const utils = require('commonutils').utils;
const request = common.request;
const url = common.url;
const expect = require('chai').expect;
const _ = require('lodash');
const fileUtils = require('../common/fileUtils');

describe('Package Test Case:', () => {

    let PackageTestCase = {
        terminalHref: "http://localhost:5024/api/v1.0.0/tenants/0VnRpHOEcPpN1CICQ5yTOw/deviceDirectorys/QwMl2zHlY3CgErBPE03DTA/terminals/8WygOi6bSkhE6xln7qAV9A",
        sn: "78745646563234",
        packageProductHref: "http://localhost:5021/api/v1.0.0/tenants/nDy8dOynNil4KAdXrhJBog/productDirectorys/WhHLMwHCPz0XWdmCoPolSA/compositeProducts/ELuDsg5sziwvVFp1C6hTig",
        packagetName: "后视镜基础套餐yyy"
    };

    let bindPackageTestCase = {
        packageProductHref: 'http://192.168.7.150:5021/api/v1.0.0/tenants/nDy8dOynNil4KAdXrhJBog/productDirectorys/2gewMYnuKSLJvMdamrt9fg/compositeProducts/jhEigLJu0sJFH29AV6fIOQ',

        //流量套餐
        //packageProductHref:'http://192.168.7.210:5021/api/v1.0.0/tenants/nDy8dOynNil4KAdXrhJBog/productDirectorys/WhHLMwHCPz0XWdmCoPolSA/compositeProducts/evPpDov49cZ0hJJUkzVlXw',

        //LBS套餐
        // packageProductHref:'http://192.168.7.210:5021/api/v1.0.0/tenants/nDy8dOynNil4KAdXrhJBog/productDirectorys/WhHLMwHCPz0XWdmCoPolSA/compositeProducts/IsR0BfLIS2htTvEeC5woiA',

        //流量 + LBS组合套餐。
        // packageProductHref:'http://192.168.7.210:5021/api/v1.0.0/tenants/nDy8dOynNil4KAdXrhJBog/productDirectorys/WhHLMwHCPz0XWdmCoPolSA/compositeProducts/64jyN9XmKHUpjBIivWwHSw',
        packagetName: 'LIU基础套餐',
        remark: 'lpy import liuliang taocan.',
        deviceType: 'device', //,device:sn,sim:iccid,
        devices: [{
            sn: "2111738000012078"
        }]
    };

    let openPackageTestCase = {
        terminalHref: "http://192.168.7.210:5024/api/v1.0.0/tenants/0VnRpHOEcPpN1CICQ5yTOw/deviceDirectorys/QPjmU08BmHE9wWRDhYYXmA/terminals/5DwXwp6wCEjyRvswcVVHYg",
        sn: "1311725000021794"
    };

    let header = {
        //本地token
        // "authorization": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjp7ImhyZWYiOiJodHRwOi8vbG9jYWxob3N0OjUwMDMvYXBpL3YxLjAuMC91c2VyT3JnYW5pemF0aW9ucy9lQ3lhc2QzeFVmMGtzNlg3RlZkNGNBL3VzZXJzL3RRZ1E4dzlwN0lWU3Y3aGFuMkdWVHciLCJuYW1lIjoiYWRtaW4iLCJ1c2VyT3JnYW5pemF0aW9uIjp7ImhyZWYiOiJodHRwOi8vbG9jYWxob3N0OjUwMDMvYXBpL3YxLjAuMC91c2VyT3JnYW5pemF0aW9ucy9lQ3lhc2QzeFVmMGtzNlg3RlZkNGNBIn19LCJhY2NvdW50Ijp7ImhyZWYiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAvYXBpL3YxLjAuMC9hY2NvdW50cy9Mc0xJVXh6Qk14SEpwaVdURVpQNkdnIiwibmFtZSI6ImFkbWluIn0sIm1lcmNoYW50Ijp7ImhyZWYiOiJodHRwOi8vbG9jYWxob3N0OjUwMDYvYXBpL3YxLjAuMC9tZXJjaGFudHMvYVI1VWo1cWJadzd5amlQMHpEcW15USIsIm5hbWUiOiJNU0TlubPlj7DlvIDlj5HllYYifSwicm9sZSI6eyJyb2xlT3JnYW5pemF0aW9uIjp7ImhyZWYiOiJodHRwOi8vbG9jYWxob3N0OjUwMDUvYXBpL3YxLjAuMC9yb2xlT3JnYW5pemF0aW9ucy9NQkwyZWNyWnZxWHFaeU10YjllSW5nIn0sInJvbGVzIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NTAwNS9hcGkvdjEuMC4wL3JvbGVPcmdhbml6YXRpb25zL01CTDJlY3JadnFYcVp5TXRiOWVJbmcvcm9sZXMvR1V1NFp6MDc4OE51Z2hScnpZaDdkdyJdfSwiaWF0IjoxNDc5MzY1MjM5fQ.DDSoWs46iW5M24Yelhd2hGR4DHZy4oEBnKKPURHMvmROqWYTXibdWaZcPXJmw13NH9Vbc0w9hoFjk0JyNpde4qHw2RuwZyubX8jGqh_yRjZVKYq_cdM7LhAUOdyv-sJ9yt9GfYwTKkigOUYd0b15t1XrdNtTOAEZ22_c9cQUzio',

        //192.168.6.16测试服务器token
        // "authorization": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjp7ImhyZWYiOiJodHRwOi8vMTkyLjE2OC42LjE2OjUwMDMvYXBpL3YxLjAuMC91c2VyT3JnYW5pemF0aW9ucy9lQ3lhc2QzeFVmMGtzNlg3RlZkNGNBL3VzZXJzL3RRZ1E4dzlwN0lWU3Y3aGFuMkdWVHciLCJuYW1lIjoiYWRtaW4iLCJ1c2VyT3JnYW5pemF0aW9uIjp7ImhyZWYiOiJodHRwOi8vMTkyLjE2OC42LjE2OjUwMDMvYXBpL3YxLjAuMC91c2VyT3JnYW5pemF0aW9ucy9lQ3lhc2QzeFVmMGtzNlg3RlZkNGNBIn19LCJhY2NvdW50Ijp7ImhyZWYiOiJodHRwOi8vMTkyLjE2OC42LjE2OjUwMDAvYXBpL3YxLjAuMC9hY2NvdW50cy9Mc0xJVXh6Qk14SEpwaVdURVpQNkdnIiwibmFtZSI6ImFkbWluIn0sIm1lcmNoYW50Ijp7ImhyZWYiOiJodHRwOi8vMTkyLjE2OC42LjE2OjUwMDYvYXBpL3YxLjAuMC9tZXJjaGFudHMvYVI1VWo1cWJadzd5amlQMHpEcW15USIsIm5hbWUiOiJNU0TlubPlj7DlvIDlj5HllYYifSwicm9sZSI6eyJyb2xlT3JnYW5pemF0aW9uIjp7ImhyZWYiOiJodHRwOi8vMTkyLjE2OC42LjE2OjUwMDUvYXBpL3YxLjAuMC9yb2xlT3JnYW5pemF0aW9ucy9NQkwyZWNyWnZxWHFaeU10YjllSW5nIn0sInJvbGVzIjpbImh0dHA6Ly8xOTIuMTY4LjYuMTY6NTAwNS9hcGkvdjEuMC4wL3JvbGVPcmdhbml6YXRpb25zL01CTDJlY3JadnFYcVp5TXRiOWVJbmcvcm9sZXMvR1V1NFp6MDc4OE51Z2hScnpZaDdkdyJdfSwiaWF0IjoxNDc4OTIyODQwfQ.CfuYN9KQ26KSdfS0C455SSKNJyb09Q8pkirhjMVFAt2n62F-8B-zeBWtqKEo9KrCrEGb057cXVY12Vj-baMc2K54j9Doi0KKxjhVg1AO31Gy9PwB12aWtniGoUXL-TCrVECQW8P914oooL5wuvOQuoX2Vlb5vVceJi5WWuzReTI',

        //192.168.7.202
        //"authorization": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjp7ImhyZWYiOiJodHRwOi8vMTkyLjE2OC43LjIwMjo1MDAzL2FwaS92MS4wLjAvdXNlck9yZ2FuaXphdGlvbnMvZUN5YXNkM3hVZjBrczZYN0ZWZDRjQS91c2Vycy90UWdROHc5cDdJVlN2N2hhbjJHVlR3IiwibmFtZSI6ImFkbWluIiwidXNlck9yZ2FuaXphdGlvbiI6eyJocmVmIjoiaHR0cDovLzE5Mi4xNjguNy4yMDI6NTAwMy9hcGkvdjEuMC4wL3VzZXJPcmdhbml6YXRpb25zL2VDeWFzZDN4VWYwa3M2WDdGVmQ0Y0EifX0sImFjY291bnQiOnsiaHJlZiI6Imh0dHA6Ly8xOTIuMTY4LjcuMjAyOjUwMDAvYXBpL3YxLjAuMC9hY2NvdW50cy9Mc0xJVXh6Qk14SEpwaVdURVpQNkdnIiwibmFtZSI6ImFkbWluIn0sIm1lcmNoYW50Ijp7ImhyZWYiOiJodHRwOi8vMTkyLjE2OC43LjIwMjo1MDA2L2FwaS92MS4wLjAvbWVyY2hhbnRzL2FSNVVqNXFiWnc3eWppUDB6RHFteVEiLCJuYW1lIjoiS1BF5bmz5Y-w5byA5Y-R5ZWGIn0sInJvbGUiOnsicm9sZU9yZ2FuaXphdGlvbiI6eyJocmVmIjoiaHR0cDovLzE5Mi4xNjguNy4yMDI6NTAwNS9hcGkvdjEuMC4wL3JvbGVPcmdhbml6YXRpb25zL01CTDJlY3JadnFYcVp5TXRiOWVJbmcifSwicm9sZXMiOlsiaHR0cDovLzE5Mi4xNjguNy4yMDI6NTAwNS9hcGkvdjEuMC4wL3JvbGVPcmdhbml6YXRpb25zL01CTDJlY3JadnFYcVp5TXRiOWVJbmcvcm9sZXMvR1V1NFp6MDc4OE51Z2hScnpZaDdkdyJdfSwiaWF0IjoxNDgxMTc2OTcxfQ.eE81uJ-ck0gJjH52rcIBN86W4qXyF9cqNgh1SZWvIqYXp83K6xUcV4sixq6EdktzXANDo-DKpiQ9bnMmOE9nZFoms99DsSfcQZVV-Z_BR2OXczBdEA4-6gTaNx_Mqgs7FOVP1IIOZKY9Yk9WZG4AJ7mRVeMfZndbIzQfhnczIlI',

        //192.168.7.202 + data Authoritys + 三个数据权限都为0
        //"authorization": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjp7ImhyZWYiOiJodHRwOi8vMTkyLjE2OC43LjIwMjo1MDAzL2FwaS92MS4wLjAvdXNlck9yZ2FuaXphdGlvbnMvZUN5YXNkM3hVZjBrczZYN0ZWZDRjQS91c2Vycy9qQmVYOFR1RFc1dTMzam5HUmdvSThBIiwibmFtZSI6Im9wZXJhdG9yQWRtaW4iLCJ1c2VyT3JnYW5pemF0aW9uIjp7ImhyZWYiOiJodHRwOi8vMTkyLjE2OC43LjIwMjo1MDAzL2FwaS92MS4wLjAvdXNlck9yZ2FuaXphdGlvbnMvZUN5YXNkM3hVZjBrczZYN0ZWZDRjQSJ9fSwiYWNjb3VudCI6eyJocmVmIjoiaHR0cDovLzE5Mi4xNjguNy4yMDI6NTAwMC9hcGkvdjEuMC4wL2FjY291bnRzL21wNktRVEJtcXZ5WjBYZVh4WEw3UVEiLCJuYW1lIjoiYmJ6eiJ9LCJtZXJjaGFudCI6eyJocmVmIjoiaHR0cDovLzE5Mi4xNjguNy4yMDI6NTAwNi9hcGkvdjEuMC4wL21lcmNoYW50cy9hUjVVajVxYlp3N3lqaVAwekRxbXlRIiwibmFtZSI6IktQReW5s-WPsOW8gOWPkeWVhiJ9LCJyb2xlIjp7InJvbGVPcmdhbml6YXRpb24iOnsiaHJlZiI6Imh0dHA6Ly8xOTIuMTY4LjcuMjAyOjUwMDUvYXBpL3YxLjAuMC9yb2xlT3JnYW5pemF0aW9ucy9sOUYxclRtWXZCaGpEUUpZc09NNThnIn0sInJvbGVzIjpbImh0dHA6Ly8xOTIuMTY4LjcuMjAyOjUwMDUvYXBpL3YxLjAuMC9yb2xlT3JnYW5pemF0aW9ucy9sOUYxclRtWXZCaGpEUUpZc09NNThnL3JvbGVzL1BBOHU3aW54aUZWNU9pZjhUZk1pY1EiXSwiZGF0YUF1dGhvcml0eXMiOlt7InV1aWQiOiI1cHczV1RIZE00c0hKc1hhOE5PZER3IiwiZ3JhZGUiOjB9LHsidXVpZCI6IlNIT21YbEpIa29KeTlTRm1hMmJFT1EiLCJncmFkZSI6MH0seyJ1dWlkIjoibThSaTAzRXZ4aHgyclVmYjZBVlBjZyIsImdyYWRlIjowfV19LCJpYXQiOjE0ODg0MjU2NzEsImV4cCI6MTQ4ODQ2ODg3MX0.nO-OlOfv5x17hT9t-5OSS9Sf326VICB4y6iPe8ZrCX4EGzLdDcr80zYgtFMZGaJSl0NLhQYwdDp1ARAy2K5YFTaFnZ1lDeXWvglzY6W9gX0luZM8yuLa66n9jiUDwlSW5oSBSLUQakxYg8N3VNtDAYie2uW2QwPOWsf8-KxhfOQ',


        //192.168.7.210 + data Authoritys + 三个数据权限都为1
        "authorization": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjp7ImhyZWYiOiJodHRwOi8vMTkyLjE2OC43LjIxMDo1MDAzL2FwaS92MS4wLjAvdXNlck9yZ2FuaXphdGlvbnMvZUN5YXNkM3hVZjBrczZYN0ZWZDRjQS91c2Vycy90UWdROHc5cDdJVlN2N2hhbjJHVlR3IiwibmFtZSI6ImFkbWluIiwidXNlck9yZ2FuaXphdGlvbiI6eyJocmVmIjoiaHR0cDovLzE5Mi4xNjguNy4yMTA6NTAwMy9hcGkvdjEuMC4wL3VzZXJPcmdhbml6YXRpb25zL2VDeWFzZDN4VWYwa3M2WDdGVmQ0Y0EifX0sImFjY291bnQiOnsiaHJlZiI6Imh0dHA6Ly8xOTIuMTY4LjcuMjEwOjUwMDAvYXBpL3YxLjAuMC9hY2NvdW50cy9Mc0xJVXh6Qk14SEpwaVdURVpQNkdnIiwibmFtZSI6ImFkbWluIn0sIm1lcmNoYW50Ijp7ImhyZWYiOiJodHRwOi8vMTkyLjE2OC43LjIxMDo1MDA2L2FwaS92MS4wLjAvbWVyY2hhbnRzL2FSNVVqNXFiWnc3eWppUDB6RHFteVEiLCJuYW1lIjoiS1BF5bmz5Y-w5byA5Y-R5ZWGIn0sInJvbGUiOnsicm9sZU9yZ2FuaXphdGlvbiI6eyJocmVmIjoiaHR0cDovLzE5Mi4xNjguNy4yMTA6NTAwNS9hcGkvdjEuMC4wL3JvbGVPcmdhbml6YXRpb25zL01CTDJlY3JadnFYcVp5TXRiOWVJbmcifSwicm9sZXMiOlsiaHR0cDovLzE5Mi4xNjguNy4yMTA6NTAwNS9hcGkvdjEuMC4wL3JvbGVPcmdhbml6YXRpb25zL01CTDJlY3JadnFYcVp5TXRiOWVJbmcvcm9sZXMvR1V1NFp6MDc4OE51Z2hScnpZaDdkdyJdLCJkYXRhQXV0aG9yaXR5cyI6W119LCJpYXQiOjE0OTM3NzY1MDIsImV4cCI6MTkyNTc3NjUwMn0.hwxVwECPzll7Juh9SObvm214XQnQFYCZf9raAYBiUeKCQNx8sT_f1EHx4J97LUZPML1MgqD8zKh4rJOctUIbC6HDvH20IH4mg9q7rHFrqREysJ9SV6U0TMQEJSXXY4qunbM-Xz0e_rX-n_RWKZvHwCWi2xVObTSFwh-UGZzfAx8'

        //测试TOKEN
        // "authorization": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjp7ImhyZWYiOm51bGx9LCJtZXJjaGFudCI6eyJocmVmIjpudWxsfSwiaWF0IjoxNTAzMDUwMTE0LCJleHAiOjE3Mzg5NzYxMTR9.NL0CvxAUZ7s-lInwpQA-kRGinAV3NHiHvmj0qqIcMGtfP_Z3FFx33io5A__jzHPUmtKrUXt4FJWUeVtuKKCP-y6eD-1rSXpR7qZovFu87OfRcP8kEBHUzHbK9yRe2MV9yPUsi6JWcH6_pgM3PFhkZcChXW4AGT4jBcVBZQ_VFRw',
    };

    let directoryUUID = null;
    let directUrl = null;

    let PackageUUID = null;

    // PackageUUID = 'fCJev9bUYyH6CRXjUFd6Gg';

    describe('create test case:', function () {
        it('success create an Package', function () {
            this.timeout(0);
            return request.postRequest(`${url}/packages`, PackageTestCase, header).then((_ref) => {
                let res = _ref.res,
                    body = _ref.body;


                console.log('Package test create   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(201);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });

        it('success bindPackage an Package', function () {
            this.timeout(0);
            return request.postRequest(`${url}/bindPackage`, bindPackageTestCase, header).then((_ref2) => {
                let res = _ref2.res,
                    body = _ref2.body;


                console.log('Package test bindPackage   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });

        it('success createBindImport  Package', function () {
            this.timeout(0);

            let filePath = "E:\\WebServer\\Application\\source\\carData\\\PackageServer\\public\\upload\\devicePackageBindImport.xlsx";
            let fileData = fileUtils.readFileData(filePath, true);
            bindPackageTestCase.fileData = fileData;
            delete bindPackageTestCase.devices;

            return request.postRequest(`${url}/importPackage`, bindPackageTestCase, header).then((_ref3) => {
                let res = _ref3.res,
                    body = _ref3.body;


                console.log('Package test bindPackage   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });

        it('success active an Package', function () {
            this.timeout(0);
            return request.postRequest(`${url}/openPackageService`, openPackageTestCase, header).then((_ref4) => {
                let res = _ref4.res,
                    body = _ref4.body;


                console.log('Package test openPackageService   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            });
        });
    });

    describe('list test case:', function () {
        it('list packages by all:', function () {
            this.timeout(0);
            let qs = {
                //  isGetSubData : 1,
                //merchantHref:'http://192.168.7.202:5006/api/v1.0.0/merchants/GsClSBzKMRYdh0OdSgIPmg',
                // sn:['1021711173652962','1021711184583324'],
                // expand:'packageProduct',
                batchNo: 'P201708241727228'

            };
            return request.getRequest(`${url}/packages`, qs, header).then((_ref5) => {
                let res = _ref5.res,
                    body = _ref5.body;


                console.log('Package test list   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                //expect(uriReg.applicationURIReg.test(res.headers['location'])).to.be.true;
            });
        });

        it('success get package import  excel template', function () {
            this.timeout(0);
            let qs = {
                excelType: 'devicePackageBindImport'
            };

            return request.getRequest(`${url}/ImportExcelTemplate`, qs, header).then((_ref6) => {
                let res = _ref6.res,
                    body = _ref6.body;


                console.log('SimBatch test export simBath to excel   :' + JSON.stringify(body));

                expect(res.statusCode).to.equal(200);
                expect(res.headers['content-type']).to.equal('application/vnd.openxmlformats');
            });
        });
    });
});