import { deleteFile, getFiles, upload } from "../resolvers/fileUpload";

const express = require('express')

const router = express.Router();
const multer  = require('multer')
const uploadm = multer({ dest: 'uploads/' })

router.post('/upload',uploadm.single('file'), upload);
router.get('/files',getFiles);
router.delete('/delete',deleteFile)

export default router;module.exports = router; 