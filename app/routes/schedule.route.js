const express = require("express");
const schedule = require("../controllers/schedule.controller"); // Đảm bảo chỉnh sửa tên controller nếu cần
const router = express.Router();

router.route("/")
    .get(schedule.findAll) // Chỉnh sửa tên controller
    .post(schedule.create) // Chỉnh sửa tên controller
    .delete(schedule.deleteAll); // Chỉnh sửa tên controller

router.route("/:id")
    .get(schedule.findOne) // Chỉnh sửa tên controller
    .put(schedule.update) // Chỉnh sửa tên controller
    .delete(schedule.delete); // Chỉnh sửa tên controller

router.route("/chuongTrinhId")
    .get(schedule.findByChuongTrinhId); // Chỉnh sửa tên controller

module.exports = router;
