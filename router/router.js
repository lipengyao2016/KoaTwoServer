/**
 * Created by Administrator on 2016/8/18.
 */

const Router = require('koa-router');

const memberCardTypeApi = require('../controllers/api/memberCardTypeApi');
const directoryApi = require('../controllers/api/directoryApi');
const memberApi = require('../controllers/api/memberApi');
const memberCardApi = require('../controllers/api/memberCardApi');
const memberCardServiceApi = require('../controllers/api/memberCardServiceApi');
const serviceRecordApi = require('../controllers/api/serviceRecordApi');
const routeHelper = require('./routerHelper');
const bankAccountApi = require('../controllers/api/bankAccountApi');
const tradeRecordApi = require('../controllers/api/tradeRecordApi');
const payRecordApi = require('../controllers/api/payRecordApi');
const discountRecordApi = require('../controllers/api/discountRecordApi');
const tradeOrderApi = require('../controllers/api/tradeOrdersApi');
const tradeObjectsApi = require('../controllers/api/tradeObjectsApi');
const tradeDetailsApi = require('../controllers/api/tradeDetailsApi');



const  serviceRegister= require('./serviceRegister');



let router = new Router();

const apiVer = '/api/:version';




//memberCardType
const memberCardTypeObjUrI = routeHelper.buildCRUDResource(router,apiVer ,'memberCardType',memberCardTypeApi);

//directory
const directoryObjUrI = routeHelper.buildCRUDResource(router,apiVer ,'directory',directoryApi);

//member
/*const memberObjUrI = routeHelper.buildCRUDResource(router,directoryObjUrI ,'member',memberApi);
router.get(apiVer + '/members',memberApi.list);*/

//memberCard
const memberCardObjUrI = routeHelper.buildCRUDResource(router,directoryObjUrI ,'memberCard',memberCardApi);
//router.get(directoryObjUrI + '/memberCards',memberCardApi.list);
router.get(apiVer + '/memberCards',memberCardApi.list);

/** 2018/3/7  校验密码。
 lpy-modifyed  */
router.post(memberCardObjUrI + '/verifyPassword',memberCardApi.verifyPassword);

//memberCardServiceService
const memberCardServiceObjUrI = routeHelper.buildCRUDResource(router,memberCardObjUrI ,'memberCardService',memberCardServiceApi);

//serviceRecord
const serviceRecordObjUrI = routeHelper.buildCRUDResource(router,memberCardServiceObjUrI ,'serviceRecord',serviceRecordApi);


//bankAccount
const bankAccountObjUrI = routeHelper.buildCRUDResource(router,apiVer ,'bankAccount',bankAccountApi);

/** 2018/2/28  充值。
 lpy-modifyed  */
router.post(bankAccountObjUrI+'/recharge',bankAccountApi.recharge);

/** 2018/2/28  扣款。
 lpy-modifyed  */
router.post(bankAccountObjUrI+'/paymentCard',bankAccountApi.paymentCard);

/** 2018/2/28  查询余额。
 lpy-modifyed  */
router.get(bankAccountObjUrI+'/queryBalance',bankAccountApi.queryBalance);

//tradeRecord
const tradeRecordObjUrI = routeHelper.buildCRUDResource(router,bankAccountObjUrI ,'tradeRecord',tradeRecordApi);


/*//payRecord
const payRecordObjUrI = routeHelper.buildCRUDResource(router,apiVer ,'payRecord',payRecordApi);

//discountRecord
const discountRecordObjUrI = routeHelper.buildCRUDResource(router,apiVer ,'discountRecord',discountRecordApi);


//tradeOrder
const tradeOrderObjUrI = routeHelper.buildCRUDResource(router,apiVer ,'tradeOrder',tradeOrderApi);


//tradeObject
const tradeObjectObjUrI = routeHelper.buildCRUDResource(router,tradeOrderObjUrI ,'tradeObject',tradeObjectsApi);


//tradeDetail
const tradeDetailObjUrI = routeHelper.buildCRUDResource(router,tradeObjectObjUrI ,'tradeDetail',tradeDetailsApi);*/

module.exports = router;
