"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asycHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res)).catch((err) => next(err));
};
exports.default = asycHandler;
