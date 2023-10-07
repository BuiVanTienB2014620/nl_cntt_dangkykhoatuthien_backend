const express = require("express");
const meditation = require("../controllers/meditation.controller");
const router = express.Router();

router.route("/")
    .get(meditation.findAll)
    .post(meditation.create)
    .delete(meditation.deleteAll);



router.route("/:id")
    .get(meditation.findOne)
    .put(meditation.update)
    .delete(meditation.delete);

module.exports = router;