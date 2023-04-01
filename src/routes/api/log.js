const router = require('express').Router();

const controllers = require('../../controllers/log.controller');


router.post('/revshare',controllers.onCreateLogRevshare)
router.post('/bill-pay',controllers.onCreateLogBillPay)


module.exports = router;
