const express = require("express")
const multer = require('multer');
const fs = require('fs');
const md5File = require('md5-file');
const md5Router = express.Router();
const musicModel = require("../model/musics");

const mp3Uploader = multer({ dest: 'upload/' }); // (**)

md5Router.post('/', mp3Uploader.single('mp32'), (req, res) => {
    const processedFile = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
    let orgName = processedFile.originalname || ''; // Tên gốc trong máy tính của người upload
    orgName = orgName.trim().replace(/ /g, "-")
    const fullPathInServ = processedFile.path; // Đường dẫn đầy đủ của file vừa đc upload lên server
    // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
    const newFullPath = `${fullPathInServ}-${orgName}`;
    fs.renameSync(fullPathInServ, newFullPath);
    // console.log(newFullPath);
    
    md5File(newFullPath, (err, hash) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "File đã được tải lên, hãy chọn file khác!!!",
                error,
            })
        }
        console.log(`The MD5 sum of ${orgName} is: ${hash}`)
        const name = orgName;
        const hashmp3 = `${hash}`;
        musicModel.create({ name, hashmp3 })
        .then(hashmp3Created => {
            console.log(hashmp3Created);
            res.status(201).json({
                success: true,
                message: 'File upload success!!!',
                data: hashmp3Created,
            })

        }).catch(error => {
            console.log(error);
            res.status(501).json({
                success: false,
                message: "File đã được tải lên, hãy chọn file khác!!!",
                error,
            })
        })
      })
    
    res.send({
        status: true,
        message: 'file uploaded',
    })
})
module.exports = md5Router;