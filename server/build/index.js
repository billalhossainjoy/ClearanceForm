"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config/config");
const db_1 = __importDefault(require("./db"));
(0, db_1.default)().then(() => {
    app_1.default.listen(config_1.config.PORT, () => {
        console.log(`server running on port http://${"localhost"}:${config_1.config.PORT}`);
    });
}).catch(err => {
    console.error("server is not connected");
});
