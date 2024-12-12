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
const argon2_1 = __importDefault(require("argon2"));
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        minLength: [3, 'must contain at least 3 characters'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        match: [
            /^[a-zA-Z0-9]+$/,
            'schema : username must contain only letters and numbers'
        ]
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minLength: [4, 'must contain at least 3 characters'],
    }
}, { timestamps: true });
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified("password")) {
            this.password = yield argon2_1.default.hash(this.password);
        }
        next();
    });
});
userSchema.methods.verifyPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield argon2_1.default.verify(this.password, password);
    });
};
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
