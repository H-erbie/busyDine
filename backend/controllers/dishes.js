const { StatusCodes } = require("http-status-codes");
// const fs = require("fs");
const Dishes = require("../models/dishes");

const {
  BadRequestError,
  ConflictError,
  UnauthentiacatedError,
  NotFoundError,
} = require("../errors");

const asyncHandler = require("express-async-handler");

// get all dishes
const getDishes = asyncHandler(async (req, res) => {
  const dish = await Dishes.find();
  res.status(StatusCodes.OK).json({ dish });
});

// get a dish
const getDish = asyncHandler(async (req, res) => {
  const dish = await Dishes.findById({ _id: req.params.id });
  if (!dish) {
    throw new NotFoundError("Dish does not exist");
  }
  res.status(StatusCodes.OK).json({ dish });
});

// add a dish
const addDish = asyncHandler(async (req, res) => {
  console.log(req.file);
  const obj = {
    name: req.body.name,
    price: req.body.price,
    previousPrice: req.body.previousPrice,
    image: req.file.path,
    desc: req.body.desc,
  };
  const dish = await Dishes.create(obj);
  res.status(StatusCodes.CREATED).json({ dish });
});

// update a dish
const updateDish = asyncHandler(async (req, res) => {
  //   res.send(req.body.name)
  if (!req.body.name || !req.body.image || !req.body.price, !req.body.previousPrice) {
    throw new BadRequestError("Fields cannot be empty");
  }
  const dish = await Dishes.findOneAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      price: req.body.price,
      previousPrice: req.body.previousPrice,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!dish) {
    throw new NotFoundError(`No Dish with id ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ dish });
});

// delete a dish
const deleteDish = asyncHandler(async (req, res) => {
  const {
    params: { id },
  } = req;
  const dish = await Dishes.findByIdAndDelete({ _id: id });
  if (!dish) {
    throw new NotFoundError(`No Dish with id ${dish}`);
  }
  res.status(StatusCodes.OK).send();
});

module.exports = {
  getDish,
  getDishes,
  addDish,
  updateDish,
  deleteDish,
};
