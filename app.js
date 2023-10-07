const express = require("express");
const cors = require("cors");
const meditationRouter = require("./app/routes/meditation.route"); // Thay đổi tên tệp route
const resMeditionRouter = require("./app/routes/resmeditation.route");
const proMeditationRouter = require("./app/routes/promeditation.route"); 
const scheduleRouter = require("./app/routes/schedule.route");
const qaARouter = require("./app/routes/qaa.route");
const monksRouter = require("./app/routes/monks.route");
const galleryRouter = require("./app/routes/gallery.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/meditations", meditationRouter); // Thay đổi đường dẫn cho route của Meditation
app.use("/api/res-meditations", resMeditionRouter);
app.use("/api/promeditations", proMeditationRouter);
app.use("/api/schedules", scheduleRouter);
app.use("/api/qa-a", qaARouter);
app.use("/api/monks", monksRouter);
app.use("/api/gallery", galleryRouter);
// Xử lý 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

// Xử lý lỗi cuối cùng
app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to meditation book application." });
});

module.exports = app;
