const express = require("express");
const monks = require("../controllers/monks.controller"); // Sử dụng tên controller mới
const router = express.Router();

router.route("/")
    .get(monks.findAll) // Sử dụng tên controller mới
    .post(monks.create) // Sử dụng tên controller mới
    .delete(monks.deleteAll); // Sử dụng tên controller mới

router.route("/:id")
    .get(monks.findOne) // Sử dụng tên controller mới
    .put(monks.update) // Sử dụng tên controller mới
    .delete(monks.delete); // Sử dụng tên controller mới

router.route("/IDVienTruong")
    .get(monks.findByVienTruongId); // Sử dụng tên controller mới

module.exports = router;
