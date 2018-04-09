/**
 * Created by Administrator on 2016/12/15.
 */

const BaseInterface = require('ComponetFramework').BaseInterface;
const returnResources = require('../returnResources');

class BankAccountsInterface extends  BaseInterface {
    constructor(dataTranform,busiHandler)
    {
        super(dataTranform,busiHandler);
    };


 /*   *listByTenant(context)
    {
        let query = context.query;
        return yield* this.listByQsCustom(context,query,this.busiHandler.list
            ,this.dataTranform.geneListByTenantRetJson);
    };
*/
    *recharge(context)
    {
        return yield* this.execByQsCustom(context,this.busiHandler.recharge
            ,this.dataTranform.geneHasBalanceRetJson);
    };

    *paymentCard(context)
    {
        return yield* this.execByQsCustom(context,this.busiHandler.paymentCard
            ,this.dataTranform.geneHasBalanceRetJson);
    };

    *queryBalance(context)
    {
        return yield* this.execByQsCustom(context,this.busiHandler.queryBalance
            ,this.dataTranform.geneHasBalanceRetJson);
    };

}

module.exports = BankAccountsInterface;