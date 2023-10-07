const express = require("express");
const resMeditation = require("../controllers/resmeditation.controller");
const router = express.Router();

router.route("/")
    .get(resMeditation.findAll)
    .post(resMeditation.create)
    .delete(resMeditation.deleteAll);

router.route("/:id")
    .get(resMeditation.findOne)
    .put(resMeditation.update)
    .delete(resMeditation.delete);

router.route("/status")
    .get(resMeditation.findByStatus);

router.route("/khoaTuId")
    .get(resMeditation.findByKhoaTuId);

module.exports = router;
