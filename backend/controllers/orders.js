const { StatusCodes } = require("http-status-codes");
// const fs = require("fs");
const Orders = require("../models/orders");

const {
  BadRequestError,
  ConflictError,
  UnauthentiacatedError,
  NotFoundError,
} = require("../errors");

const asyncHandler = require("express-async-handler");

// get all orders
const getOrders = asyncHandler(async (req, res) => {
  const order = await Orders.find();
  res.status(StatusCodes.OK).json({ order });
});

// get an order
const getOrder = asyncHandler(async (req, res) => {
  const order = await Orders.findById({ _id: req.params.id });
  if (!order) {
    throw new NotFoundError("order does not exist");
  }
  res.status(StatusCodes.OK).json({ order });
});

// add an order
const addOrder = asyncHandler(async (req, res) => {
  const order = await Orders.create(req.body);
  res.status(StatusCodes.CREATED).json({ order });
});

// update an order
const updateOrder = asyncHandler(async (req, res) => {
  //   res.send(req.body.name)
 
  const order = await Orders.findOneAndUpdate(
    { _id: req.params.id },
    {
     ...req.body
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!order) {
    throw new NotFoundError(`No order with id ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ order });
});

// delete an order
const deleteOrder = asyncHandler(async (req, res) => {
  const {
    params: { id },
  } = req;
  const order = await Orders.findByIdAndDelete({ _id: id });
  if (!order) {
    throw new NotFoundError(`No Order with id ${id}`);
  }
  res.status(StatusCodes.OK).send("delete order successful");
});

module.exports = {
  getOrder,
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder,
};
