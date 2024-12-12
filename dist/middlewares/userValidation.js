"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationRequest = void 0;
const http_status_codes_1 = require("http-status-codes");
const validationRequest = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send(error);
    }
};
exports.validationRequest = validationRequest;
