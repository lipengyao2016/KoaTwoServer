/**
 * Created by Administrator on 2016/12/15.
 */

const BaseInterface = require('ComponetFramework').BaseInterface;
const returnResources = require('../returnResources');

class MemberCardsInterface extends  BaseInterface {
    constructor(dataTranform,busiHandler)
    {
        super(dataTranform,busiHandler);
    };



    *verifyPassword(context)
    {
        return yield* this.execByQsCustom(context,this.busiHandler.verifyPassword
            ,this.dataTranform.geneNullRetJson);
    };

}

module.exports = MemberCardsInterface;