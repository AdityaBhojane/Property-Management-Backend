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
exports.default = crudRepository;
function crudRepository(model) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            create: (data) => __awaiter(this, void 0, void 0, function* () { return yield model.create(data); }),
            get: (id) => __awaiter(this, void 0, void 0, function* () { return yield model.findById(id); }),
            update: (id, data) => __awaiter(this, void 0, void 0, function* () { return yield model.findByIdAndUpdate(id, data, { new: true }); }),
            delete: (id) => __awaiter(this, void 0, void 0, function* () { return yield model.findByIdAndDelete(id); }),
            deleteMany: (ids) => __awaiter(this, void 0, void 0, function* () { return yield model.deleteMany({ _id: { $in: ids } }); })
        };
    });
}
