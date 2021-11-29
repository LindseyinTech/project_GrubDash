const router = require("express").Router();
const controller = require("./orders.controller")
const methodNotAllowed = require("../errors/methodNotAllowed");

//2 routes /orders and /orders/:orderId
router.route("/:orderId")
.get(controller.read)
.put(controller.update)
.delete(controller.delete)

.all(methodNotAllowed)


router.route("/")
.get(controller.list)
.post(controller.create)
.all(methodNotAllowed)


//must end all routes with a all(methodNotAllowed)

module.exports = router;
