"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routers/index"));
const app = (0, express_1.default)();
const port = 404;
const cors = require('cors');
app.use(cors());
app.use('/api', index_1.default);
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const statusMessage = err.message || 'Error';
    res.status(statusCode).send({
        error: true,
        message: statusMessage,
        data: null,
    });
});
app.listen(port, () => {
    console.log(`🐣🐤🐥[server]: This Server Running at http://localhost:${port}`);
});
