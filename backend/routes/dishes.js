const express = require("express");
const {
  getDish,
  getDishes,
  addDish,
  deleteDish,
  updateDish,
} = require("../controllers/dishes");
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

router.route("/").get(getDishes).post(upload.single("dishImage"), addDish);
router.route("/:id").get(getDish).patch(updateDish).delete(deleteDish);

module.exports = router;
