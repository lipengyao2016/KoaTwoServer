/**
 * Created by Administrator on 2017/4/10.
 */
"use strict";
const fs = require('fs');
const _ = require('lodash');


var constant = {

    packageActiveMsgtopic : 'packageActiveMsg',
    resendMsgTopic:'resendOrderMsg',
    packageActiveMsgGroupId:'packageActiveMsgGroup',

    store_order:'OutStorageOrder',

    order_status:{
      created:'created',
    },

};



module.exports = constant;
