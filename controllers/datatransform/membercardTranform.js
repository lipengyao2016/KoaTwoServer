/**
 * Created by Administrator on 2016/12/15.
 */
const BaseDataTranform = require('ComponetFramework').BaseDataTranform;
const returnResources = require('../returnResources');
const utils= require('commonutils').utils;
const _ = require('lodash');
const request = require('commonutils').request.request;
const resourceURI = require('../resourceURI');
const URIParser = resourceURI.v1;


class memberCardTranform extends  BaseDataTranform {
    constructor()
    {
        super();

        this.dataType = {
            'uuid':'string',
            'cardNo':'string',
            'directoryUUID':'string',
            'status':'string',
            'name':'string',
            'phone':'string',
            'email':'string',
            'idCard':'string',
            'sex':'string',
            'headImgURL':'string',
            'openCardAt':'date',
            'cardTypeUUID':'string',
            'password':'string',
            'consumerAmount':'float',
            'ownerHref':'string',
            'ownerUUID':'string',
            'beginAt':'date',
            'endAt':'date',
        };

        this.defDataObj = {
            'uuid':undefined,
            'status':'normal',
            'openCardAt':utils.getTimeStr(new Date(),true),
        };
    };

    *buildCardNo(memberCardTypeHref)
    {
        let memberCardTypeRes = yield  request.getRequest(memberCardTypeHref);
        let cardTypeNO ='99';
        if(memberCardTypeRes.res.statusCode == 200)
        {
            cardTypeNO = memberCardTypeRes.body.cardTypeNo;
        }
        let cardNumber;
        for(;;)
        {
            cardNumber = cardTypeNO + utils.getDateStr(new Date()).substring(2) + utils.MakeRandomNumber(4);
            let findCardRes = yield  request.getRequest(URIParser.memberCardsURI(),{cardNo:cardNumber});
           // console.log(findCardRes);
            if(findCardRes && findCardRes.res.statusCode == 200 && findCardRes.body.items.length <= 0)
            {
                break;
            }
            else
            {
                console.warn('buildCardNo has exist cardNumber:',cardNumber);
            }
        }

        console.log('buildCardNo vaild cardNumber:',cardNumber);
        return cardNumber;

    }



    *parseBody(context,bCreated =false)
    {
        let body = context.request.body;

        if(body.ownerHref)
        {
            body.ownerUUID = utils.getResourceUUIDInURL2(body.ownerHref);
        }



        if(!bCreated)
        {
            delete  body.password;
        }
        else
        {
            if(!body.cardNo)
            {
                body.cardNo = yield* this.buildCardNo(body.memberCardTypeHref) ;
            }
        }

        let { directoryUUID,memberUUID } = context.params;

        body.directoryUUID = directoryUUID;
        body.memberUUID = memberUUID;



        if(body.memberCardTypeHref)
        {
            body.cardTypeUUID = utils.getResourceUUIDInURL(body.memberCardTypeHref,'memberCardTypes');
        }

        let directory= {};
        this.parseDataFromBody(directory,this.dataType,this.defDataObj,body,bCreated);

        return directory;
    };

    *parseBatchBody(context,bCreated =false)
    {

    };


    *parseQs(context)
    {
        let qs = _.clone(context.query);
        let { directoryUUID,memberUUID } = context.params;

        if(memberUUID)
        {
            qs.memberUUID = memberUUID;
        }
        if(directoryUUID)
        {
            qs.directoryUUID = directoryUUID;
        }

        return qs;
    };


    *parsePath(context)
    {
        let { memberCardUUID } = context.params;
        return memberCardUUID;
    };


    *geneRetJson(res,context)
    {
        return returnResources.generatememberCardsRetJSON(res);
    };

    *geneNullRetJson(res,context)
    {
        return res;
    };

    *geneListRetJson(retList,count,context)
    {
        let { directoryUUID,memberUUID } = context.params;
        return returnResources.generateListmemberCardsRetJSON(directoryUUID,memberUUID,
            retList,context.query.offset
            ,count,context.query);
    };



}

module.exports = new memberCardTranform();


function testFind() {
    let serviceHref = 'http://localhost:8070/api/v1.0.0/memberCardTypes/rfoyTmQpw4FE5Of4Xljf8Q';
    let serviceUUID = utils.getResourceUUIDInURL2(serviceHref);
    console.log(serviceUUID);
}

//testFind();
