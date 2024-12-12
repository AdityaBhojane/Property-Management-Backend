"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInSchema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, 'username must be having at least 3 characters'),
    email: zod_1.z.string().email('invalid email'),
    password: zod_1.z.string().min(6, 'password must be at least 6 characters')
});
exports.signInSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, 'username must be having at least 3 characters'),
    password: zod_1.z.string().min(6, 'password must be at least 6 characters')
});
