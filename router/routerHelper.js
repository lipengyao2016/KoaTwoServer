const _ = require('lodash');

exports.buildCRUDResource = (webRouter,parentPath,resource,busiApi)=> {
    let listUrl = parentPath + '/'+resource + 's';
    webRouter.post(listUrl,busiApi.create);
    webRouter.get(listUrl,busiApi.list);

    let objUrl = listUrl + '/:' + resource + 'UUID';
    webRouter.get(objUrl,busiApi.retrieve);
    webRouter.post(objUrl,busiApi.update);
    webRouter.delete(objUrl,busiApi.delete);

    return objUrl;
}

