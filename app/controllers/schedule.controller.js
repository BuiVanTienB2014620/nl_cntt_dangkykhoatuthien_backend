const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");
const ScheduleService = require("../services/schedule.service"); // Đảm bảo chỉnh sửa tên service nếu cần
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body?.ngay || !req.body?.thoiGianBatDau || !req.body?.thoiGianKetThuc) {
        return next(
            new ApiError(400, "Ngày, thời gian bắt đầu và thời gian kết thúc không thể trống")
        );
    }
    try {
        const scheduleService = new ScheduleService(MongoDB.client);
        const document = await scheduleService.create(req.body);
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi tạo Schedule")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const scheduleService = new ScheduleService(MongoDB.client);
        const { hoTen } = req.query;
        if (hoTen) {
            // Chỉnh sửa nếu bạn muốn tìm kiếm theo tên hoặc chương trình khác
            documents = await scheduleService.findByName(hoTen);
        } else {
            documents = await scheduleService.findAll();
        }
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi truy xuất danh sách Schedule")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const scheduleService = new ScheduleService(MongoDB.client);
        const document = await scheduleService.findById(req.params.id);
        if (!document) {
            return next(
                new ApiError(404, "Schedule không được tìm thấy")
            );
        }
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Lỗi khi truy xuất Schedule có id=${req.params.id}`)
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
        const scheduleService = new ScheduleService(MongoDB.client);
        const document = await scheduleService.update(req.params.id, req.body);
        if (!document) {
            return next(
                new ApiError(404, "Schedule không được tìm thấy")
            );
        }
        return res.send({ message: "Schedule đã được cập nhật thành công" });
    } catch (error) {
        return next(
            new ApiError(500, `Lỗi khi cập nhật Schedule có id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const scheduleService = new ScheduleService(MongoDB.client);
        const document = await scheduleService.delete(req.params.id);
        if (!document) {
            return next(
                new ApiError(404, "Schedule không được tìm thấy")
            );
        }
        return res.send({ message: "Schedule đã được xóa thành công" });
    } catch (error) {
        return next(
            new ApiError(500, `Lỗi khi xóa Schedule có id=${req.params.id}`)
        );
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const scheduleService = new ScheduleService(MongoDB.client);
        const deletedCount = await scheduleService.deleteAll();
        return res.send({ message: `${deletedCount} Schedule đã được xóa thành công` });
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi xóa tất cả các Schedule")
        );
    }
};

exports.findByChuongTrinhId = async (req, res, next) => {
    try {
        const scheduleService = new ScheduleService(MongoDB.client);
        const { chuongTrinhId } = req.query;
        if (chuongTrinhId) {
            const documents = await scheduleService.findByChuongTrinhId(chuongTrinhId);
            return res.send(documents);
        } else {
            return next(
                new ApiError(400, "Vui lòng cung cấp chương trình ID")
            );
        }
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "Lỗi khi tìm kiếm Schedule theo chương trình ID")
        );
    }
};

// ...
