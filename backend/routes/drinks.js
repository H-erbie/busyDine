const express = require("express");
const {
    getDrink,
    getDrinks,
    addDrink,
    updateDrink,
    deleteDrink
} = require("../controllers/drinks");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname );
  },
});
new Date().toISOString();
const fileFiler = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFiler });

router.route("/").get(getDrinks).post(upload.single("dishImage"), addDrink);
router.route("/:id").get(getDrink).patch(updateDrink).delete(deleteDrink);

module.exports = router;
