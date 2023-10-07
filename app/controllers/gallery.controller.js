const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");
const GalleryService = require("../services/gallery.service"); // Sử dụng tên service mới
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body?.TieuDe) {
        return next(
            new ApiError(400, "Tiêu đề không thể trống")
        );
    }
    try {
        const galleryService = new GalleryService(MongoDB.client); // Sử dụng tên service mới
        const document = await galleryService.create(req.body);
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi tạo hình ảnh/video trong Gallery")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const galleryService = new GalleryService(MongoDB.client); // Sử dụng tên service mới
        const { TieuDe } = req.query;
        if (TieuDe) {
            documents = await galleryService.findByTieuDe(TieuDe); // Sử dụng phương thức tìm kiếm phù hợp
        } else {
            documents = await galleryService.findAll();
        }
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi truy xuất danh sách hình ảnh/video trong Gallery")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const galleryService = new GalleryService(MongoDB.client); // Sử dụng tên service mới
        const document = await galleryService.findById(req.params.id);
        if (!document) {
            return next(
                new ApiError(404, "Hình ảnh/video trong Gallery không được tìm thấy")
            );
        }
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Lỗi khi truy xuất hình ảnh/video trong Gallery có id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Dữ liệu để cập nhật không thể trống"));
    }
    try {
        const galleryService = new GalleryService(MongoDB.client); // Sử dụng tên service mới
        const document = await galleryService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Hình ảnh/video trong Gallery không được tìm thấy"));
        }
        return res.send({ message: "Hình ảnh/video trong Gallery đã được cập nhật thành công" });
    } catch (error) {
        return next(new ApiError(500, `Lỗi khi cập nhật hình ảnh/video trong Gallery có id=${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const galleryService = new GalleryService(MongoDB.client); // Sử dụng tên service mới
        const document = await galleryService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Hình ảnh/video trong Gallery không được tìm thấy"));
        }
        return res.send({ message: "Hình ảnh/video trong Gallery đã được xóa thành công" });
    } catch (error) {
        return next(new ApiError(500, `Lỗi khi xóa hình ảnh/video trong Gallery có id=${req.params.id}`));
    }
};
exports.deleteAll = async (req, res, next) => {
    try {
        const galleryService = new GalleryService(MongoDB.client); // Sử dụng tên service mới
        const deletedCount = await galleryService.deleteAll();
        return res.send({ message: `${deletedCount} hình ảnh/video trong Gallery đã được xóa thành công` });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi xóa tất cả các hình ảnh/video trong Gallery")
        );
    }
};

exports.findByKhoaTuId = async (req, res, next) => {
    try {
        const galleryService = new GalleryService(MongoDB.client); // Sử dụng tên service mới
        const { KhoaTuID } = req.query;
        if (KhoaTuID) {
            const documents = await galleryService.findByKhoaTuId(KhoaTuID);
            return res.send(documents);
        } else {
            return next(new ApiError(400, "Vui lòng cung cấp KhoaTuID"));
        }
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "Lỗi khi tìm kiếm hình ảnh/video trong Gallery theo KhoaTuID"));
    }
};

// ...
