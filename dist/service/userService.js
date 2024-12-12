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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignInService = exports.userSignUpService = void 0;
const userRespository_1 = require("../repository/userRespository");
const authUtil_1 = require("../utils/common/authUtil");
const userSignUpService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = (yield userRespository_1.userRepository).create(data);
        return response;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.userSignUpService = userSignUpService;
const userSignInService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = data;
        const user = yield userRespository_1.userRepository.findByEmail(email);
        if (!user)
            throw new Error('Invalid email and password');
        const isPasswordMatch = yield user.verifyPassword(password);
        if (!isPasswordMatch)
            throw new Error('Password is not valid');
        return {
            username: user.username,
            email,
            token: (0, authUtil_1.createJWT)({ id: user._id })
        };
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.userSignInService = userSignInService;
