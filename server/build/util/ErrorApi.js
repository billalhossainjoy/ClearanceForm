"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorApi extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.default = ErrorApi;
