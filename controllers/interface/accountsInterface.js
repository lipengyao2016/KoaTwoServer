/**
 * Created by Administrator on 2016/12/15.
 */

const BaseInterface = require('componet-data-framework').BaseInterface;
const returnResources = require('../returnResources');

class AccountsInterface extends  BaseInterface {
    constructor(dataTranform,busiHandler)
    {
        super(dataTranform,busiHandler);
    };


    async resetPwd(context)
    {
      return await  this.execByQsCustom(context,this.busiHandler.resetPwd,null);
    };


    async countByUserId(context)
    {
        return await  this.execByQsCustom(context,this.busiHandler.countByUserId,null);
    };

}

module.exports =  {
    resource:'account',
    resourceClass:AccountsInterface,
};