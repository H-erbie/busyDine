const { StatusCodes } = require("http-status-codes");
// const fs = require("fs");
const Drinks = require("../models/drinks");

const {
  BadRequestError,
  ConflictError,
  UnauthentiacatedError,
  NotFoundError,
} = require("../errors");

const asyncHandler = require("express-async-handler");

// get all Drinks
const getDrinks = asyncHandler(async (req, res) => {
  const drink = await Drinks.find();
  res.status(StatusCodes.OK).json({ drink });
});

// get a drink
const getDrink= asyncHandler(async (req, res) => {
  const drink = await Drinks.findById({ _id: req.params.id });
  if (!drink) {
    throw new NotFoundError("Drink does not exist");
  }
  res.status(StatusCodes.OK).json({ drink });
});

// add a drink
const addDrink= asyncHandler(async (req, res) => {
  console.log(req.file);
  const obj = {
    name: req.body.name,
    price: req.body.price,
    previousPrice: req.body.previousPrice,
    image: req.file.path,
  };
  const drink = await Drinks.create(obj);
  res.status(StatusCodes.CREATED).json({ drink });
});

// update a drink
const updateDrink= asyncHandler(async (req, res) => {
  //   res.send(req.body.name)
  if (!req.body.name || !req.body.image || !req.body.price, !req.body.previousPrice) {
    throw new BadRequestError("Fields cannot be empty");
  }
  const drink = await Drinks.findOneAndUpdate(
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
  if (!drink) {
    throw new NotFoundError(`No Drink with id ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ drink });
});

// delete a Drink
const deleteDrink = asyncHandler(async (req, res) => {
  const {
    params: { id },
  } = req;
  const drink = await Drinks.findByIdAndDelete({ _id: id });
  if (!drink) {
    throw new NotFoundError(`No Drink with id ${drink}`);
  }
  res.status(StatusCodes.OK).send();
});

module.exports = {
  getDrink,
  getDrinks,
  addDrink,
  updateDrink,
  deleteDrink
};
