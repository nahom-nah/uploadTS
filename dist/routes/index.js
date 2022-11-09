"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileUpload_1 = require("../resolvers/fileUpload");
const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadm = multer({ dest: 'uploads/' });
router.post('/upload', uploadm.single('file'), fileUpload_1.upload);
router.get('/files', fileUpload_1.getFiles);
router.delete('/delete', fileUpload_1.deleteFile);
exports.default = router;
module.exports = router;
//# sourceMappingURL=index.js.map