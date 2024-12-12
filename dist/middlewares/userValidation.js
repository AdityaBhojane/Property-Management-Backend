"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationRequest = void 0;
const http_status_codes_1 = require("http-status-codes");
const customError_1 = __importDefault(require("../utils/customError"));
const validationRequest = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json((0, customError_1.default)('something is wrong with zod validation', error));
    }
};
exports.validationRequest = validationRequest;
