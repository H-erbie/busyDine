const CustomAPIError = require("./customError");
const BadRequestError = require("./badRequest");
const UnauthentiacatedError = require("./unauthorized");
const NotFoundError = require("./notFound");
const ConflictError = require("./conflict");


module.exports = {
    CustomAPIError,
    BadRequestError,
    UnauthentiacatedError,
    NotFoundError,
    ConflictError
}