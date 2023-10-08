const { ObjectId } = require("mongodb");

class ProMeditationService {
    constructor(client) {
        this.ProMeditation = client.db().collection("ProMeditation");
    }

    extractProMeditationData(payload) {
        const proMeditation = {
            tieuDe: payload.tieuDe,
            moTa: payload.moTa,
            thoiGianBatDau: new Date(payload.thoiGianBatDau),
            thoiGianKetThuc: new Date(payload.thoiGianKetThuc),
            khoaTuId: ObjectId.isValid(payload.khoaTuId) ? new ObjectId(payload.khoaTuId) : null,
        };
        // Xóa các trường không xác định
        Object.keys(proMeditation).forEach(
            (key) => proMeditation[key] === undefined && delete proMeditation[key]
        );
        return proMeditation;
    }

    async create(payload) {
        const proMeditation = this.extractProMeditationData(payload);
        const result = await this.ProMeditation.insertOne(proMeditation);
        return result.value;
    }

    async findById(id) {
        return await this.ProMeditation.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractProMeditationData(payload);
        const result = await this.ProMeditation.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.ProMeditation.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }
    async deleteAll() {
        const result = await this.ProMeditation.deleteMany({});
        return result.deletedCount;
    }


    async findAll() {
        const cursor = await this.ProMeditation.find({});
        return await cursor.toArray();
    }

    async findByKhoaTuId(khoaTuId) {
        return await this.ProMeditation.find({
            khoaTuId: ObjectId.isValid(khoaTuId) ? new ObjectId(khoaTuId) : null,
        });
    }
}

module.exports = ProMeditationService;
