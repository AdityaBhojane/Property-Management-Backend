"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = customSuccessResponse;
function customSuccessResponse(message, data) {
    return ({
        success: true,
        message: message,
        data: data
    });
}
