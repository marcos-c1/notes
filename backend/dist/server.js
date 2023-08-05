"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const verifyJWT_1 = __importDefault(require("./middleware/verifyJWT"));
const userRoute_1 = __importDefault(require("./routes/api/userRoute"));
const noteRoute_1 = __importDefault(require("./routes/api/noteRoute"));
const authRoute_1 = __importDefault(require("./routes/api/authRoute"));
const refreshRoute_1 = __importDefault(require("./routes/api/refreshRoute"));
var cors = require('cors');
const cookieParser = require("cookie-parser");
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT;
// Middleware for cookies
app.use(cookieParser());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// CORS
app.use(cors({
    origin: 'http://localhost:1420'
}));
// Routes
app.use('/', userRoute_1.default);
app.use('/', noteRoute_1.default);
app.use('/', authRoute_1.default);
app.use('/', refreshRoute_1.default);
app.use(verifyJWT_1.default);
app.listen(port, () => {
    console.log(`[SERVER]: Server is running at http://localhost:${port}`);
});
