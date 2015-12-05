var express    = require("express");
var controller = require("./controller");
var auth       = require("./auth");

var router = express.Router();

if (!process.env.DISABLE_AUTH) {
    router.use(auth);
}

router.use(express.static('app/static'));

router.get('/', controller.renderIndex);
router.post('/mail', controller.sendMail);
router.get('/form/:folder/:file', controller.getForm);

module.exports = router;
