const { ObjectId } = require("mongodb");

class MonksService {
    constructor(client) {
        this.Monks = client.db().collection("Monks");
    }

    extractMonksData(payload) {
        const monksData = {
            IDGiangSu: payload.IDGiangSu,
            TenGiangSu: payload.TenGiangSu,
            HinhAnh: payload.HinhAnh,
            TieuSu: payload.TieuSu,
            IDVienTruong: ObjectId.isValid(payload.IDVienTruong) ? new ObjectId(payload.IDVienTruong) : null,
        };
        // Xóa các trường không xác định
        Object.keys(monksData).forEach(
            (key) => monksData[key] === undefined && delete monksData[key]
        );
        return monksData;
    }

    async create(payload) {
        const monksData = this.extractMonksData(payload);
        const result = await this.Monks.insertOne(monksData);
        return result.value;
    }

    async findById(id) {
        return await this.Monks.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractMonksData(payload);
        const result = await this.Monks.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Monks.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async findAll() {
        const cursor = await this.Monks.find({});
        return await cursor.toArray();
    }
    async deleteAll() {
        const result = await this.Monks.deleteMany({});
        return result.deletedCount;
    }

    async findByVienTruongId( IDVienTruong) {
        return await this.Monks.find({
            IDVienTruong: ObjectId.isValid( IDVienTruong) ? new ObjectId( IDVienTruong) : null,
        });
    }
}

module.exports = MonksService;
