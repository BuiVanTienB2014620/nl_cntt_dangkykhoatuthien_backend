const { ObjectId } = require("mongodb");

class GalleryService {
    constructor(client) {
        this.Gallery = client.db().collection("Gallery");
    }

    extractGalleryData(payload) {
        const galleryData = {
            ID: ObjectId.isValid(payload.ID) ? new ObjectId(payload.ID) : null,
            TieuDe: payload.TieuDe,
            MoTa: payload.MoTa,
            Loai: payload.Loai,
            DuongDan: payload.DuongDan,
            KhoaTuID: ObjectId.isValid(payload.KhoaTuID) ? new ObjectId(payload.KhoaTuID) : null,
        };
        // Xóa các trường không xác định
        Object.keys(galleryData).forEach(
            (key) => galleryData[key] === undefined && delete galleryData[key]
        );
        return galleryData;
    }

    async create(payload) {
        const galleryData = this.extractGalleryData(payload);
        const result = await this.Gallery.insertOne(galleryData);
        return result.value;
    }

    async findById(id) {
        return await this.Gallery.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractGalleryData(payload);
        const result = await this.Gallery.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Gallery.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async findAll() {
        const cursor = await this.Gallery.find({});
        return await cursor.toArray();
    }

    async deleteAll() {
        const result = await this.Gallery.deleteMany({});
        return result.deletedCount;
    }

    async findByKhoaTuId(KhoaTuID) {
        return await this.Gallery.find({
            KhoaTuID: ObjectId.isValid(KhoaTuID) ? new ObjectId(KhoaTuID) : null,
        });
    }
}

module.exports = GalleryService;
