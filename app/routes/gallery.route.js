const express = require("express");
const gallery = require("../controllers/gallery.controller"); // Sử dụng tên controller mới
const router = express.Router();

router.route("/")
    .get(gallery.findAll) // Sử dụng tên controller mới
    .post(gallery.create) // Sử dụng tên controller mới
    .delete(gallery.deleteAll); // Sử dụng tên controller mới

router.route("/:id")
    .get(gallery.findOne) // Sử dụng tên controller mới
    .put(gallery.update) // Sử dụng tên controller mới
    .delete(gallery.delete); // Sử dụng tên controller mới

router.route("/KhoaTuID")
    .get(gallery.findByKhoaTuId); // Sử dụng tên controller mới

module.exports = router;
