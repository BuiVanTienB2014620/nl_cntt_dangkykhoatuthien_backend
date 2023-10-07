const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");
const ResMeditationService = require("../services/resmeditation.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body?.hoTen) {
        return next(
            new ApiError(400, "Họ tên không thể trống")
        );
    }
    try {
        const resMeditationService = new ResMeditationService(MongoDB.client);
        const document = await resMeditationService.create(req.body);
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi tạo ResMeditation")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const resMeditationService = new ResMeditationService(MongoDB.client);
        const { hoTen } = req.query;
        if (hoTen) {
            documents = await resMeditationService.findByName(hoTen);
        } else {
            documents = await resMeditationService.findAll();
        }
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi truy xuất danh sách ResMeditation")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const resMeditationService = new ResMeditationService(MongoDB.client);
        const document = await resMeditationService.findById(req.params.id);
        if (!document) {
            return next(
                new ApiError(404, "ResMeditation không được tìm thấy")
            );
        }
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Lỗi khi truy xuất ResMeditation có id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Dữ liệu để cập nhật không thể trống"));
    }
    try {
        const resMeditationService = new ResMeditationService(MongoDB.client);
        const document = await resMeditationService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "ResMeditation không được tìm thấy"));
        }
        return res.send({ message: "ResMeditation đã được cập nhật thành công" });
    } catch (error) {
        return next(new ApiError(500, `Lỗi khi cập nhật ResMeditation có id=${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const resMeditationService = new ResMeditationService(MongoDB.client);
        const document = await resMeditationService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "ResMeditation không được tìm thấy"));
        }
        return res.send({ message: "ResMeditation đã được xóa thành công" });
    } catch (error) {
        return next(new ApiError(500, `Lỗi khi xóa ResMeditation có id=${req.params.id}`));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const resMeditationService = new ResMeditationService(MongoDB.client);
        const deletedCount = await resMeditationService.deleteAll();
        return res.send({ message: `${deletedCount} ResMeditation đã được xóa thành công` });
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi xóa tất cả các ResMeditation")
        );
    }
};
// ...

exports.findByStatus = async (req, res, next) => {
    try {
        const resMeditationService = new ResMeditationService(MongoDB.client);
        const { trangThaiDangKy } = req.query;
        if (trangThaiDangKy) {
            const documents = await resMeditationService.findByStatus(trangThaiDangKy);
            return res.send(documents);
        } else {
            return next(new ApiError(400, "Vui lòng cung cấp trạng thái đăng ký"));
        }
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "Lỗi khi tìm kiếm ResMeditation theo trạng thái đăng ký"));
    }
};

exports.findByKhoaTuId = async (req, res, next) => {
    try {
        const resMeditationService = new ResMeditationService(MongoDB.client);
        const { khoaTuId } = req.query;
        if (khoaTuId) {
            const documents = await resMeditationService.findByKhoaTuId(khoaTuId);
            return res.send(documents);
        } else {
            return next(new ApiError(400, "Vui lòng cung cấp khoaTuId"));
        }
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "Lỗi khi tìm kiếm ResMeditation theo khoaTuId"));
    }
};

// ...
