const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");
const ProMeditationService = require("../services/promeditation.service"); // Chỉnh sửa tên service
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body?.tieuDe) { // Chỉnh sửa điều kiện kiểm tra trường
        return next(
            new ApiError(400, "Tiêu đề không thể trống")
        );
    }
    try {
        const proMeditationService = new ProMeditationService(MongoDB.client); // Chỉnh sửa tên service
        const document = await proMeditationService.create(req.body); // Chỉnh sửa tên service
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi tạo ProMeditation") // Chỉnh sửa thông báo lỗi
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const proMeditationService = new ProMeditationService(MongoDB.client); // Chỉnh sửa tên service
        const { hoTen } = req.query;
        if (hoTen) {
            documents = await proMeditationService.findByName(hoTen); // Chỉnh sửa phương thức tìm kiếm
        } else {
            documents = await proMeditationService.findAll();
        }
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi truy xuất danh sách ProMeditation") // Chỉnh sửa thông báo lỗi
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const proMeditationService = new ProMeditationService(MongoDB.client); // Chỉnh sửa tên service
        const document = await proMeditationService.findById(req.params.id); // Chỉnh sửa tên service
        if (!document) {
            return next(
                new ApiError(404, "ProMeditation không được tìm thấy")
            );
        }
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Lỗi khi truy xuất ProMeditation có id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Dữ liệu để cập nhật không thể trống"));
    }
    try {
        const proMeditationService = new ProMeditationService(MongoDB.client); // Chỉnh sửa tên service
        const document = await proMeditationService.update(req.params.id, req.body); // Chỉnh sửa tên service
        if (!document) {
            return next(new ApiError(404, "ProMeditation không được tìm thấy"));
        }
        return res.send({ message: "ProMeditation đã được cập nhật thành công" });
    } catch (error) {
        return next(new ApiError(500, `Lỗi khi cập nhật ProMeditation có id=${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const proMeditationService = new ProMeditationService(MongoDB.client); // Chỉnh sửa tên service
        const document = await proMeditationService.delete(req.params.id); // Chỉnh sửa tên service
        if (!document) {
            return next(new ApiError(404, "ProMeditation không được tìm thấy"));
        }
        return res.send({ message: "ProMeditation đã được xóa thành công" });
    } catch (error) {
        return next(new ApiError(500, `Lỗi khi xóa ProMeditation có id=${req.params.id}`));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const proMeditationService = new ProMeditationService(MongoDB.client); // Chỉnh sửa tên service
        const deletedCount = await proMeditationService.deleteAll(); // Chỉnh sửa tên service
        return res.send({ message: `${deletedCount} ProMeditation đã được xóa thành công` });
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi xóa tất cả các ProMeditation") // Chỉnh sửa thông báo lỗi
        );
    }
};

exports.findByStatus = async (req, res, next) => {
    try {
        const proMeditationService = new ProMeditationService(MongoDB.client); // Chỉnh sửa tên service
        const { trangThaiDangKy } = req.query;
        if (trangThaiDangKy) {
            const documents = await proMeditationService.findByStatus(trangThaiDangKy); // Chỉnh sửa phương thức tìm kiếm
            return res.send(documents);
        } else {
            return next(new ApiError(400, "Vui lòng cung cấp trạng thái đăng ký"));
        }
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "Lỗi khi tìm kiếm ProMeditation theo trạng thái đăng ký"));
    }
};

exports.findByKhoaTuId = async (req, res, next) => {
    try {
        const proMeditationService = new ProMeditationService(MongoDB.client); // Chỉnh sửa tên service
        const { khoaTuId } = req.query;
        if (khoaTuId) {
            const documents = await proMeditationService.findByKhoaTuId(khoaTuId); // Chỉnh sửa phương thức tìm kiếm
            return res.send(documents);
        } else {
            return next(new ApiError(400, "Vui lòng cung cấp khoaTuId"));
        }
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "Lỗi khi tìm kiếm ProMeditation theo khoaTuId"));
    }
};

// ...
