const router = require("express").Router();
const controller = require("./dishes.controller")
const methodNotAllowed = require("../errors/methodNotAllowed");
const ordersRouter = require("../orders/orders.router")

// TODO: Implement the /dishes routes needed to make the tests pass
router.use("/:dishId/orders", controller.dishExists, ordersRouter)

//2 routes /dishes and /dishes/:dishId
router.route("/:dishId")
.get(controller.read)
.put(controller.update)
.all(methodNotAllowed)

router.route("/")
.get(controller.list)
.post(controller.create)
.all(methodNotAllowed)


//must end all routes with a all(methodNotAllowed)

module.exports = router;
