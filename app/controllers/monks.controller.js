const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");
const MonksService = require("../services/monks.service"); // Sử dụng tên service mới
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body?.TenGiangSu) {
        return next(
            new ApiError(400, "Tên giảng sư không thể trống")
        );
    }
    try {
        const monksService = new MonksService(MongoDB.client); // Sử dụng tên service mới
        const document = await monksService.create(req.body);
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi tạo giảng sư")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const monksService = new MonksService(MongoDB.client); // Sử dụng tên service mới
        const { hoTen } = req.query;
        if (hoTen) {
            documents = await monksService.findByName(hoTen); // Sử dụng phương thức tìm kiếm phù hợp
        } else {
            documents = await monksService.findAll();
        }
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi truy xuất danh sách giảng sư")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const monksService = new MonksService(MongoDB.client); // Sử dụng tên service mới
        const document = await monksService.findById(req.params.id);
        if (!document) {
            return next(
                new ApiError(404, "Giảng sư không được tìm thấy")
            );
        }
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Lỗi khi truy xuất giảng sư có id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Dữ liệu để cập nhật không thể trống"));
    }
    try {
        const monksService = new MonksService(MongoDB.client); // Sử dụng tên service mới
        const document = await monksService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Giảng sư không được tìm thấy"));
        }
        return res.send({ message: "Giảng sư đã được cập nhật thành công" });
    } catch (error) {
        return next(new ApiError(500, `Lỗi khi cập nhật giảng sư có id=${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const monksService = new MonksService(MongoDB.client); // Sử dụng tên service mới
        const document = await monksService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Giảng sư không được tìm thấy"));
        }
        return res.send({ message: "Giảng sư đã được xóa thành công" });
    } catch (error) {
        return next(new ApiError(500, `Lỗi khi xóa giảng sư có id=${req.params.id}`));
    }
};
exports.deleteAll = async (req, res, next) => {
    try {
        const monksService = new MonksService(MongoDB.client); // Sử dụng tên service mới
        const deletedCount = await monksService.deleteAll();
        return res.send({ message: `${deletedCount} giảng sư đã được xóa thành công` });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi xóa tất cả các giảng sư")
        );
    }
};

exports. findByVienTruongId = async (req, res, next) => {
    try {
        const monksService = new MonksService(MongoDB.client); // Sử dụng tên service mới
        const {  IDVienTruong } = req.query;
        if ( IDVienTruong) {
            const documents = await monksService.findByVienTruongId( IDVienTruong);
            return res.send(documents);
        } else {
            return next(new ApiError(400, "Vui lòng cung cấp VienTruongId"));
        }
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "Lỗi khi tìm kiếm giảng sư theo VienTruongId"));
    }
};

// ...


// ...
