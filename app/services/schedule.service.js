const { ObjectId } = require("mongodb");

class ScheduleService {
    constructor(client) {
        this.Schedule = client.db().collection("Schedule");
    }

    extractScheduleData(payload) {
        const schedule = {
            ngay: new Date(payload.ngay),
            thoiGianBatDau: new Date(payload.thoiGianBatDau),
            thoiGianKetThuc: new Date(payload.thoiGianKetThuc),
            noiDung: payload.noiDung,
            chuongTrinhId: ObjectId.isValid(payload.chuongTrinhId) ? new ObjectId(payload.chuongTrinhId) : null,
        };
        // Xóa các trường không xác định
        Object.keys(schedule).forEach(
            (key) => schedule[key] === undefined && delete schedule[key]
        );
        return schedule;
    }

    async create(payload) {
        const schedule = this.extractScheduleData(payload);
        const result = await this.Schedule.insertOne(schedule);
        return result.value;
    }

    async findById(id) {
        return await this.Schedule.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractScheduleData(payload);
        const result = await this.Schedule.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Schedule.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }
    async deleteAll() {
        const result = await this.Schedule.deleteMany({});
        return result.deletedCount;
    }
    

    async findAll() {
        const cursor = await this.Schedule.find({});
        return await cursor.toArray();
    }

    async findByChuongTrinhId(chuongTrinhId) {
        return await this.Schedule.find({
            chuongTrinhId: ObjectId.isValid(chuongTrinhId) ? new ObjectId(chuongTrinhId) : null,
        });
    }
}

module.exports = ScheduleService;
