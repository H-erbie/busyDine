const express = require("express");
const {
  updateOrder,
  deleteOrder,
  getOrders,
  getOrder,
  addOrder,
} = require("../controllers/orders");
const router = express.Router();

router.route("/").post(addOrder).get(getOrders);
router.route("/:id").patch(updateOrder).delete(deleteOrder).get(getOrder);

module.exports = router;