const { ObjectId } = require("mongodb");

class ResMeditationService {
    constructor(client) {
        this.ResMeditation = client.db().collection("ResMeditation");
    }

    extractResMeditationData(payload) {
        const resMeditation = {
            hoTen: payload.hoTen,
            diaChi: payload.diaChi,
            soDienThoai: payload.soDienThoai,
            email: payload.email,
            phuongThucDangKy: payload.phuongThucDangKy,
            trangThaiDangKy: payload.trangThaiDangKy,
            khoaTuId: ObjectId.isValid(payload.khoaTuId) ? new ObjectId(payload.khoaTuId) : null,
        };
        // Xóa các trường không xác định
        Object.keys(resMeditation).forEach(
            (key) => resMeditation[key] === undefined && delete resMeditation[key]
        );
        return resMeditation;
    }

    async create(payload) {
        const resMeditation = this.extractResMeditationData(payload);
        const result = await this.ResMeditation.insertOne(resMeditation);
        return result.value;
    }

    async findById(id) {
        return await this.ResMeditation.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractResMeditationData(payload);
        const result = await this.ResMeditation.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.ResMeditation.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async findAll() {
        const cursor = await this.ResMeditation.find({});
        return await cursor.toArray();
    }
    async deleteAll() {
        const result = await this.ResMeditation.deleteMany({});
        return result.deletedCount;
    }

    async findByStatus(status) {
        return await this.ResMeditation.find({
            trangThaiDangKy: status,
        });
    }

    async findByKhoaTuId(khoaTuId) {
        return await this.ResMeditation.find({
            khoaTuId: ObjectId.isValid(khoaTuId) ? new ObjectId(khoaTuId) : null,
        });
    }
}

module.exports = ResMeditationService;
