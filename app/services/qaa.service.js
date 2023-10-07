const { ObjectId } = require("mongodb");

class QaAService {
    constructor(client) {
        this.QaA = client.db().collection("QaA");
    }

    async create(payload) {
        const qaA = {
            tenNguoiGui: payload.tenNguoiGui,
            email: payload.email,
            cauHoi: payload.cauHoi,
            traLoi: payload.traLoi,
            ngayGui: new Date(),
        };
        const result = await this.QaA.insertOne(qaA);
        return result.value;
    }

    async findById(id) {
        return await this.QaA.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = {
            tenNguoiGui: payload.tenNguoiGui,
            email: payload.email,
            cauHoi: payload.cauHoi,
            traLoi: payload.traLoi,
        };
        const result = await this.QaA.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.QaA.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAll() {
        const result = await this.QaA.deleteMany({});
        return result.deletedCount;
    }

    async findAll() {
        const cursor = await this.QaA.find({});
        return await cursor.toArray();
    }
}

module.exports = QaAService;
