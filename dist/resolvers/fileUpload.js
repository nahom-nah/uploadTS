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
exports.deleteFile = exports.getFiles = exports.upload = void 0;
const fs = require("fs");
const fsPromises = fs.promises;
const mime = require("mime");
const uuid = require("uuid");
const Uploads_1 = require("./../entities/Uploads");
const index_1 = require("../index");
const upload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    console.log(req.file);
    res.send("hello");
    let filename = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    let size = (_b = req.file) === null || _b === void 0 ? void 0 : _b.size;
    const filepath = (_c = req.file) === null || _c === void 0 ? void 0 : _c.path;
    try {
        let file = index_1.DI.orm.em.create(Uploads_1.Uploads, { path: filepath, name: filename, size, createdAt: new Date() });
        try {
            yield index_1.DI.orm.em.persistAndFlush(file);
            res.status(200).json({
                status: "success",
                message: "successfully uploaded"
            });
        }
        catch (err) {
            console.log('upload error');
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.upload = upload;
const getFiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let files = yield index_1.DI.orm.em.find(Uploads_1.Uploads, {});
        res.status(200).json({
            status: 'success',
            files
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getFiles = getFiles;
const deleteFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = parseInt(req.body.id);
    try {
        const file = index_1.DI.orm.em.findOne(Uploads_1.Uploads, { id });
        index_1.DI.orm.em.remove(file);
        res.status(200).json({
            status: 'success',
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.deleteFile = deleteFile;
//# sourceMappingURL=fileUpload.js.map