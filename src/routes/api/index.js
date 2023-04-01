const router = require("express").Router();

router.use("/auth", require("./authentication"));
router.use("/log", require("./log"));

module.exports = router;
