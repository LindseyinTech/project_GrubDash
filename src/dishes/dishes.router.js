const router = require("express").Router();
const controllre = require("./dishes.controller")
// TODO: Implement the /dishes routes needed to make the tests pass

router.get("/", controller.list)



module.exports = router;
