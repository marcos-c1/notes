"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const userRoute_1 = __importDefault(require("./routes/api/userRoute"));
const noteRoute_1 = __importDefault(require("./routes/api/noteRoute"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use('/', userRoute_1.default);
app.use('/', noteRoute_1.default);
//app.use('/notes', routerNote);
app.listen(port, () => {
    console.log(`[SERVER]: Server is running at http://localhost:${port}`);
});
