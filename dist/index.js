"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const severConfig_1 = require("./configs/severConfig");
const dbConfig_1 = __importDefault(require("./configs/dbConfig"));
const apiRouter_1 = __importDefault(require("./routes/apiRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', apiRouter_1.default);
app.get('/ping', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(http_status_codes_1.StatusCodes.OK).json({
        message: 'pong'
    });
}));
app.listen(severConfig_1.PORT, () => {
    (0, dbConfig_1.default)();
    console.log("server is up on port", severConfig_1.PORT);
});
