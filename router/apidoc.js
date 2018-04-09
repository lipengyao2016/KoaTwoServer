/**
 * Created by Administrator on 2016/8/24.
 */
const Router = require('koa-router');
let router = new Router();
router.all('/apidoc/', function *(next) {
    this.redirect('../apidoc/index.html');
});


module.exports = router;