const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const keys = require('../keys.js');
const { User, Photo } = require("../../db/models");
const router = express.Router();
const asyncHandler = require('express-async-handler');

// configuring the DiscStorage engine.
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

//setting the credentials
//The region should be the region of the bucket that you created
//Visit this if you have any confusion - https://docs.aws.amazon.com/general/latest/gr/rande.html
AWS.config.update({
    accessKeyId: process.env.ACCESS_ID,
    secretAccessKey: process.env.SECRET_ID,
    region: 'us-east-1',
});

//Creating a new instance of S3:
const s3 = new AWS.S3();

//POST method route for uploading file
router.post('/post_file', upload.single('demo_file'), asyncHandler(async (req, res) => {
    //Multer middleware adds file(in case of single file ) or files(multiple files) object to the request object.
    //req.file is the demo_file
    // console.log('This is the ', req.body)
    const { userId, caption } = req.body;
    // console.log('this is the userId: ', userId);
    uploadFile(req.file.path, req.file.filename, res);
    // console.log(`https://img-bucket-shuttr-react-app.s3.amazonaws.com/images/${req.file.filename}`)
    const photo = await Photo.create({ 
        url: `https://img-bucket-shuttr-react-app.s3.amazonaws.com/images/${req.file.filename}`,
        userId,
        caption
    })
    // await photo.save()
    const photos = await Photo.findAll({where: {userId: userId}});
    res.json({ photos });
}))

//GET method route for downloading/retrieving file
router.get('/get_file/:file_name', (req, res) => {
    retrieveFile(req.params.file_name, res);
});

//The uploadFile function
function uploadFile(source, targetName, res) {
    console.log('preparing to upload...');
    fs.readFile(source, function (err, filedata) {
        if (!err) {
            const putParams = {
                Bucket: 'img-bucket-shuttr-react-app/images',
                Key: targetName,
                Body: filedata,
                ACL: 'public-read',
            };
            s3.putObject(putParams, function (err, data) {
                if (err) {
                    console.log('Could nor upload the file. Error :', err);
                    return
                }
                else {
                    // fs.unlink(source);// Deleting the file from uploads folder(Optional).Do Whatever you prefer.
                    console.log('Successfully uploaded the file');
                    return
                }
            });
        }
        else {
            console.log(err);
        }
    });
}

//The retrieveFile function
function retrieveFile(filename, res) {

    const getParams = {
        Bucket: 'img-bucket-shuttr-react-app/images',
        Key: filename
    };

    s3.getObject(getParams, function (err, data) {
        if (err) {
            return res.status(400).send({ success: false, err: err });
        }
        else {
            return res.send(data.Body);
        }
    });
}

module.exports = router;