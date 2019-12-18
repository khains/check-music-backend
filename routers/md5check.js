const express = require("express")
const multer = require('multer');
const fs = require('fs');
const md5File = require('md5-file');
const md5checkRouter = express.Router();
const musicModel = require("../model/musics");
const {musicContract, web3} = require('../web3');

const mp3Uploader = multer({ dest: 'checkupload/' }); // (**)

md5checkRouter.post('/', mp3Uploader.single('mp32'), async (req, res) => {
    const processedFile = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
    let orgName = processedFile.originalname || ''; // Tên gốc trong máy tính của người upload
    orgName = orgName.trim().replace(/ /g, "-")
    const fullPathInServ = processedFile.path; // Đường dẫn đầy đủ của file vừa đc upload lên server
    // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
    const newFullPath = `${fullPathInServ}-${orgName}`;
    fs.renameSync(fullPathInServ, newFullPath);
    // console.log(newFullPath);
    
    await md5File(newFullPath, async (err, hash) => {
        if (err) throw err
       
        console.log(`Hash ${orgName} là: ${hash}`)
        // const name = orgName;
        const hashmp3 = `${hash}`;
        const accounts = await web3.eth.getAccounts();
        await musicContract.methods.getMusic().call({from: accounts[0]})
        .then(data => {
            console.log(data.length);
            console.log(data[0]._hashMusic);
            for(let i=0; i<data.length; i++){
                
                if(data[i]._hashMusic === hashmp3){
                    return res.json({
                        success: 1,
                        message: "Là nhạc chất lượng cao!!!"
                    })
                }
            }
        }).catch(err => {
            console.log(err);
        })
        res.json({
            success: 0,
            message: "Không phải nhạc chất lượng cao!!!"
        })
    })
    
    fs.unlinkSync(newFullPath);
})
module.exports = md5checkRouter;
