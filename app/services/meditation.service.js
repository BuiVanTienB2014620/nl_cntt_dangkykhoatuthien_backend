const { ObjectId } = require("mongodb");

class MeditationService {
    constructor(client) {
        this.Meditation = client.db().collection("Meditation");
    }

    extractMeditationData(payload) {
        const meditation = {
            tenKhoaTu: payload.tenKhoaTu,
            thoiGianBatDau: payload.thoiGianBatDau,
            thoiGianKetThuc: payload.thoiGianKetThuc,
            diaDiem: payload.diaDiem,
            chuDe: payload.chuDe,
            moTa: payload.moTa,
            idGiangSu: ObjectId.isValid(payload.idGiangSu) ? new ObjectId(payload.idGiangSu) : null,
        };
        // Xóa các trường không xác định
        Object.keys(meditation).forEach(
            (key) => meditation[key] === undefined && delete meditation[key]
        );
        return meditation;
    }

    async create(payload) {
        const meditation = this.extractMeditationData(payload);
        const result = await this.Meditation.insertOne(meditation);
        return result.ops[0];
    }

    async findById(id) {
        return await this.Meditation.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractMeditationData(payload);
        const result = await this.Meditation.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Meditation.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async findAll() {
        const cursor = await this.Meditation.find({});
        return await cursor.toArray();
    }

    async findByTheme(theme) {
        return await this.Meditation.find({
            chuDe: { $regex: new RegExp(theme), $options: "i" },
        });
    }

    async findByName(name) {
        return await this.Meditation.find({
            tenKhoaTu: { $regex: new RegExp(name), $options: "i" },
        });
    }
}

module.exports = MeditationService;
