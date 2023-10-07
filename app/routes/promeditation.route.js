const express = require("express");
const proMeditation = require("../controllers/promeditation.controller"); // Chỉnh sửa tên controller
const router = express.Router();

router.route("/")
    .get(proMeditation.findAll) // Chỉnh sửa tên controller
    .post(proMeditation.create) // Chỉnh sửa tên controller
    .delete(proMeditation.deleteAll); // Chỉnh sửa tên controller

router.route("/:id")
    .get(proMeditation.findOne) // Chỉnh sửa tên controller
    .put(proMeditation.update) // Chỉnh sửa tên controller
    .delete(proMeditation.delete); // Chỉnh sửa tên controller


router.route("/khoaTuId")
    .get(proMeditation.findByKhoaTuId); // Chỉnh sửa tên controller

module.exports = router;
