# GrubDash API

## Table of Contents
* [Description](#description)
* [Questions](#questions)

## Description
The goal of this project was to build an API that followed RESTful design principles and included custom middleware functions.
The custom routes in this API include:

`GET /dishes` 
This route will respond with a list of all existing dish data.
`POST /dishes`
This route will save the dish and respond with the newly created dish.
`GET /dishes/:dishId`
This route will respond with the dish where id === :dishId or return 404 if no matching dish is found.
`PUT /dishes/:dishId`
This route will update the dish where id === :dishId or return 404 if no matching dish is found.
`GET /orders`
This route will respond with a list of all existing order data.
`POST /orders`
This route will save the order and respond with the newly created order.
`GET /orders/:orderId`
This route will respond with the order where id === :orderId or return 404 if no matching order is found.
`PUT /orders/:orderId`
This route will update the order where id === :orderId, or return 404 if no matching order is found.
`DELETE /orders/:orderId`
This route will delete the order where id === :orderId, or return 404 if no matching order is found.


![deployedAPI](https://gyazo.com/d832ade666c1e91edee96c5eade6ff66.png)

What a view..

To view this project's user interface on the web, click [here](https://grub-dash-client.vercel.app/)

This project primarily uses Express.js, Cors, and Node.js.
## Questions
Questions? Reach out at [github.com/lindseyindev](github.com/lindseyindev)