/**
 * Created by Administrator on 2016/12/14.
 */
const BaseBusiness = require('ComponetFramework').BaseBusiness;
const returnResources = require('../returnResources');
const _ = require('lodash');
const request = require('commonutils').request.request;
const resourceURI = require('../resourceURI');
const URIParser = resourceURI.v1;
const crypto = require('crypto');
const utils= require('commonutils').utils;
const memberCardsProxy = require('../../proxy/memberCardsProxy');



class MemberCardBusiness extends BaseBusiness {
    constructor(dataProxyer) {
        console.log('MemberCardBusiness->constructor dataProxyer:' + dataProxyer);
        super(dataProxyer);
    };

    encryptPwdMd5(uuid, pwd) {
        let md5 = crypto.createHash('md5');
        let pwd_md5 = md5.update(`${uuid}-${pwd}-cq!$e4f5#h67*RF/J&46KG5`).digest('base64');
        return pwd_md5.substr(0, pwd_md5.length - 2);
        return pwd_md5;
    };


    /** 2016/12/13
     *param: busiData: 实际要创建的数据对象。没有带UUID.由proxy层自动生成。
     * return : 成功返回新的数据对象,失败返回null。
     lpy-modifyed  */
    * create(context, busiData) {
        if (!busiData.uuid) {
            busiData.uuid = utils.createUUID();
            console.log('membercard tranform create uuid:' + busiData.uuid);
        }

        if (busiData.password) {
            let password = busiData.password;
            busiData.password = this.encryptPwdMd5(busiData.uuid, busiData.password);
            console.log('membercard tranform create password:' + busiData.password + ',orign:' + password);
        }

        return yield this.dataProxyer.create(busiData);
    };


    *verifyPassword(context)
    {
        let { memberCardUUID } = context.params;
        let { password } = context.request.body;
        let data = yield* this.dataProxyer.retrieve(memberCardUUID);
        let computePwd = this.encryptPwdMd5(memberCardUUID,password);
        let verified = false;
        if(_.isEqual(computePwd,data.password))
        {
            verified = true;
        }
        else
        {
            throw new Error('incorrect password!!!');
        }
        return {memberCardUUID,verified};
    };


}

let memberCardBusiness = new MemberCardBusiness(memberCardsProxy);

module.exports = memberCardBusiness;




function testEncrypt() {
    let i = 0;
    for (i = 0; i < 1; i++) {
        let uuid = /*utils.createUUID()*/ '4UuJ2bAXwAqjg8EMgsWL2g';
        let pwd = '123456';
        let newPwd = memberCardBusiness.encryptPwdMd5(uuid, pwd);
        console.log(newPwd);
    }
}
testEncrypt();


