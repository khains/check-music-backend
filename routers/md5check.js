const express = require("express")
const multer = require('multer');
const fs = require('fs');
const md5File = require('md5-file');
const md5checkRouter = express.Router();
const musicModel = require("../model/musics");

const mp3Uploader = multer({ dest: 'checkupload/' }); // (**)

md5checkRouter.post('/', mp3Uploader.single('mp32'), (req, res) => {
    const processedFile = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
    let orgName = processedFile.originalname || ''; // Tên gốc trong máy tính của người upload
    orgName = orgName.trim().replace(/ /g, "-")
    const fullPathInServ = processedFile.path; // Đường dẫn đầy đủ của file vừa đc upload lên server
    // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
    const newFullPath = `${fullPathInServ}-${orgName}`;
    fs.renameSync(fullPathInServ, newFullPath);
    // console.log(newFullPath);
    
    md5File(newFullPath, (err, hash) => {
        if (err) throw err
       
        console.log(`The MD5 sum of ${orgName} is: ${hash}`)
        // const name = orgName;
        const hashmp3 = `${hash}`;
        musicModel.findOne({ hashmp3 })
        .then(hashmp3Found => {
            if (!hashmp3Found || !hashmp3Found._id){
                res.json({
                    success: 0,
                    message: "Không phải nhạc original!!!"
                })
            }
            else{
                res.json({
                    success: 1,
                    message: "Là nhạc original!!!"
                })
            }
            
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                success: false,
                error,
            })
        })
      })
    
    // res.send({
    //     status: true,
    //     message: 'file uploaded',
    //     fileNameInServer: newFullPath
    // })
})
module.exports = md5checkRouter;
