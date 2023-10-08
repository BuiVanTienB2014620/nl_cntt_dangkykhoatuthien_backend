const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");
const MeditationService = require("../services/meditation.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body?.tenKhoaTu) {
        return next(
            new ApiError(400, "Tên khóa tu không thể trống")
        );
    }
    try {
        const meditationService = new MeditationService(MongoDB.client);
        const document = await meditationService.create(req.body);
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi tạo khóa tu")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const meditationService = new MeditationService(MongoDB.client);
        const { tenKhoaTu } = req.query;
        if (tenKhoaTu) {
            documents = await meditationService.findByName(tenKhoaTu);
        } else {
            documents = await meditationService.findAll();
        }
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi truy xuất danh sách khóa tu")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const meditationService = new MeditationService(MongoDB.client);
        const document = await meditationService.findById(req.params.id);
        if (!document) {
            return next(
                new ApiError(404, "Khóa tu không được tìm thấy")
            );
        }
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Lỗi khi truy xuất khóa tu có id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Dữ liệu để cập nhật không thể trống"));
    }
    try {
        const meditationService = new MeditationService(MongoDB.client);
        const document = await meditationService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Khóa tu không được tìm thấy"));
        }
        return res.send({ message: "Khóa tu đã được cập nhật thành công" });
    } catch (error) {
        return next(new ApiError(500, `Lỗi khi cập nhật khóa tu có id=${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const meditationService = new MeditationService(MongoDB.client);
        const document = await meditationService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Khóa tu không được tìm thấy"));
        }
        return res.send({ message: "Khóa tu đã được xóa thành công" });
    } catch (error) {
        return next(new ApiError(500, `Lỗi khi xóa khóa tu có id=${req.params.id}`));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const meditationService = new MeditationService(MongoDB.client);
        const deletedCount = await meditationService.deleteAll();
        return res.send({ message: `${deletedCount} khóa tu đã được xóa thành công` });
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi xóa tất cả các khóa tu")
        );
    }
};


exports.findGiangSuId = async (req, res, next) => {
    try {
        const meditationService = new MeditationService(MongoDB.client);
        const { idGiangSu } = req.query;
        if (!idGiangSu) {
            return next(new ApiError(400, "Thiếu idGiangSu trong yêu cầu"));
        }
        const documents = await meditationService.findGiangSuId(idGiangSu);
        return res.send(documents);
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "Đã xảy ra lỗi khi truy xuất danh sách theo idGiangSu"));
    }
};