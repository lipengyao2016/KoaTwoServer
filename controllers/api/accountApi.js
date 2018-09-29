const _ = require('lodash');

class AccountApi
{
    async findOwnerMemberByWxData(content,ctx)
    {
        let data = content.query;
        console.log('AccountApi->findOwnerMemberByWxData query:' + JSON.stringify(data,null,2));
        return {ret:'ok',name:'lily'};
    }

    async activeMember(content,ctx)
    {
        let data = content.body;
        console.log('AccountApi->activeMember data:' + JSON.stringify(data,null,2));
        return {errorCode:0,errorMsg:'success'};
    }
}


module.exports = {
    urlRequestMap:[
        {url:'/api/:version/findOwnerMemberByWxData',method:'GET',name:'findOwnerMemberByWxData'},
        {url:'/api/:version/activeMember',method:'POST',name:'activeMember'},
    ],
    handler:new AccountApi(),
};


