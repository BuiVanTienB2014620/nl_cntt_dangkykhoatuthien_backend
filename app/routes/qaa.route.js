const express = require("express");
const qaA = require("../controllers/qaa.controller"); // Đảm bảo chỉnh sửa tên controller nếu cần
const router = express.Router();

router.route("/")
    .get(qaA.findAll) // Chỉnh sửa tên controller
    .post(qaA.create) // Chỉnh sửa tên controller
    .delete(qaA.deleteAll); // Chỉnh sửa tên controller

router.route("/:id")
    .get(qaA.findOne) // Chỉnh sửa tên controller
    .put(qaA.update) // Chỉnh sửa tên controller
    .delete(qaA.delete); // Chỉnh sửa tên controller


module.exports = router;
