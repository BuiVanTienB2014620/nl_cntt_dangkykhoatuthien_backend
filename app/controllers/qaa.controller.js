const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");
const QaAService = require("../services/qaa.service"); // Đảm bảo chỉnh sửa tên service nếu cần
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body?.tenNguoiGui || !req.body?.email || !req.body?.cauHoi) {
        return next(
            new ApiError(400, "Tên người gửi, email và câu hỏi không thể trống")
        );
    }
    try {
        const qaAService = new QaAService(MongoDB.client);
        const document = await qaAService.create(req.body);
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi tạo câu hỏi và câu trả lời")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const qaAService = new QaAService(MongoDB.client);
        const { tenNguoiGui } = req.query;
        if (tenNguoiGui) {
            documents = await qaAService.findByName(tenNguoiGui);
        } else {
            documents = await qaAService.findAll();
        }
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi truy xuất danh sách câu hỏi và câu trả lời")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const qaAService = new QaAService(MongoDB.client);
        const document = await qaAService.findById(req.params.id);
        if (!document) {
            return next(
                new ApiError(404, "Câu hỏi và câu trả lời không được tìm thấy")
            );
        }
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Lỗi khi truy xuất câu hỏi và câu trả lời có id=${req.params.id}`)
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(
            new ApiError(400, "Dữ liệu để cập nhật không thể trống")
        );
    }
    try {
        const qaAService = new QaAService(MongoDB.client);
        const document = await qaAService.update(req.params.id, req.body);
        if (!document) {
            return next(
                new ApiError(404, "Câu hỏi và câu trả lời không được tìm thấy")
            );
        }
        return res.send({ message: "Câu hỏi và câu trả lời đã được cập nhật thành công" });
    } catch (error) {
        return next(
            new ApiError(500, `Lỗi khi cập nhật câu hỏi và câu trả lời có id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const qaAService = new QaAService(MongoDB.client);
        const document = await qaAService.delete(req.params.id);
        if (!document) {
            return next(
                new ApiError(404, "Câu hỏi và câu trả lời không được tìm thấy")
            );
        }
        return res.send({ message: "Câu hỏi và câu trả lời đã được xóa thành công" });
    } catch (error) {
        return next(
            new ApiError(500, `Lỗi khi xóa câu hỏi và câu trả lời có id=${req.params.id}`)
        );
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const qaAService = new QaAService(MongoDB.client);
        const deletedCount = await qaAService.deleteAll();
        return res.send({ message: `${deletedCount} câu hỏi và câu trả lời đã được xóa thành công` });
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi xóa tất cả các câu hỏi và câu trả lời")
        );
    }
};


