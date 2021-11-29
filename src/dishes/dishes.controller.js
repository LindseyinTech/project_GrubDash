const path = require("path");
// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));
// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass
//add create, read, update, and list dishes handlers
//Anytime you need to assign a new id to an order or dish, use the nextId function exported from src/utils/nextId.js.
//All update handlers guarantee that the id property of the stored data cannot be overwritten.

function list(req, res, next) {
  res.json({ data: dishes });
}

function read(req, res, next) {
  res.json({ data: res.locals.dish });
}
//  update: [dishExists, isValidDish, update],

function dishExists(req, res, next) {
  const dishId = req.params.dishId;
  const foundDish = dishes.find((dish) => dish.id === dishId);
  if (foundDish) {
    res.locals.dish = foundDish;
    return next();
  } else {
    return next({
      status: 404,
      message: `Dish id not found: ${req.params.dishId}`,
    });
  }
}

function isValidDish(req, res, next) {
  const { data } = req.body;
  const requiredFields = ["name", "description", "image_url", "price"];
  for (let field of requiredFields) {
    if (!data[field]) {
      return next({ status: 400, message: `Dish must include a ${field}.` });
    }
  }
  if (typeof data.price !== "number" || data.price < 1) {
    return next({
      status: 400,
      message: `Dish must have a price that is an integer greater than 0.`,
    });
  }
  return next();
}

function create(req, res, next) {
  const { data } = req.body;
  const newDish = {
    id: nextId(),
    name: data.name,
    description: data.description,
    image_url: data.image_url,
    price: data.price,
  };
  dishes.push(newDish);
  res.status(201).json({ data: newDish });
}

function update(req, res, next) {
  const dishId = req.params.dishId
  let foundDish = dishes.find((dish) => dish.id == dishId);
  const { data } = req.body;
  if(data.id && dishId != data.id){
      return next({
        status: 400,
        message: `Dish id does not match route id. Dish: ${data.id}, Route: ${dishId}`,
      });
  } else {
  foundDish = {...data, id: foundDish.id};
  res.json({ data: foundDish })
  }
}

module.exports = {
  create: [isValidDish, create],
  list,
  read: [dishExists, read],
  update: [dishExists, isValidDish, update],
  dishExists,
};
