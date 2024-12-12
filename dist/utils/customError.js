"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = customErrorResponse;
function customErrorResponse(message, error) {
    return ({
        success: false,
        message: message,
        error: error
    });
}
