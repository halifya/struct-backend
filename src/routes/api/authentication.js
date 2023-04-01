const router = require('express').Router();

const controllers = require('../../controllers/authentication.controller');


router.post('/login', controllers.onLogin);
router.post('/login-admin',controllers.onLoginAdmin)


module.exports = router;
