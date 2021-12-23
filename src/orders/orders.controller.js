const path = require("path");
// Use the existing dishes data
const orders = require(path.resolve("src/data/orders-data"));
// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass
//add create, read, update, and list dishes handlers
//Anytime you need to assign a new id to an order or dish, use the nextId function exported from src/utils/nextId.js.
//All update handlers guarantee that the id property of the stored data cannot be overwritten.


function list(req, res, next) {
  res.json({ data: orders });
}

function read(req, res, next) {
  res.json({ data: res.locals.order });
}

function orderExists(req, res, next) {
  const orderId = req.params.orderId;
  const foundOrder = orders.find((order) => order.id === orderId);
  if (foundOrder) {
    res.locals.order = foundOrder;
    return next();
  } else {
    return next({
      status: 404,
      message: `Order id not found: ${req.params.orderId}`,
    });
  }
}
function statusValidator(req, res, next){
  //Put request: status property cant be missing, empty or delivered --different error message for missing & empty VERSUS delivered
  //DELETE Request: status property of the be pending, error: "An order cannot be deleted unless it is pending"
  const { data } = req.body;
  switch (data.status) {
    case 'pending': 
    case 'preparing': 
    case 'out-for-delivery': next();
      break;
    case 'delivered': 
    default: next({
      status: 400,
      message: `You must enter a valid status.`,
    }) }
}
       
function isValidOrder(req, res, next) {
  const { data } = req.body;
  const requiredFields = ["deliverTo", "mobileNumber", "dishes"];
  for (let field of requiredFields) {
    if (!data[field]) {
      return next({ status: 400, message: `Order must include a ${field}.` });
    }
  }
   if (!Array.isArray(data.dishes) || data.dishes.length < 1) {
    return next({
      status: 400,
      message: `Order must include at least 1 dish`,
    });
  }
  let index = 0
  for (let dish of data.dishes){
    if (!dish.quantity || typeof dish.quantity !== "number") {
      //can i put the return next here? is this logic good?
      return next({ status: 400, message: `Dish ${index} must have a quantity that is an integer greater than 0
.` });
    }
    index++
  }
  return next();
}

function create(req, res, next) {
  const {data }  = req.body
  console.log(data)
  const newOrder = {
    "id": nextId(),
    "deliverTo": data.deliverTo,
    "status": data.status,
    "mobileNumber": data.mobileNumber,
    dishes: data.dishes.map((dish) => {
      return {
       "id": dish.id,
       "name": dish.name,
       "description": dish.description,
       "image_url": dish.image_url,
       "price": dish.price,
       "quantity": dish.quantity
      }
    })
  };
  orders.push(newOrder);
  res.status(201).json({ data: newOrder });
}

function update(req, res, next) {
  const orderId = req.params.orderId
  let foundOrder = orders.find((order) => order.id == orderId);
  const { data } = req.body;
  if(data.id && orderId != data.id){
      return next({
        status: 400,
        message: `Order id does not match route id. Order: ${data.id}, Route: ${orderId}`,
      });
  } else {
  foundOrder = {...data, id: foundOrder.id};
  res.json({ data: foundOrder })
  }
}

function destroy(req, res, next) {
  const { orderId } = req.params;
  const index = orders.findIndex((order) => order.id === orderId);
  if (orders[index].status === "pending")  {
    orders.splice(index, 1);
    return next({ status: 204, message: "DELETE" })
  } else {
    next({status: 400, message: "Order status must be pending."})
  }
}

module.exports = {
  create: [isValidOrder, create],
  list,
  read: [orderExists, read],
  update: [orderExists, isValidOrder,statusValidator, update],
 orderExists,
  delete: [ orderExists, destroy]
};


  


