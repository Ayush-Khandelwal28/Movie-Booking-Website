const aws=require("aws-sdk");
const multer=require("multer");
const multerS3=require("multer-s3");
require("dotenv").config({path:"../config.env"});
const s3=new aws.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: process.env.S3_BUCKET_REGION
}); 
exports.uploadMoviePoster = (req, res, next) => {
    // const upload = multer({
    //     storage: multerS3({
    //         s3: s3,
    //         bucket: process.env.S3_BUCKET_NAME,
    //         acl: "public-read",
    //         key: function (req, file, cb) {
    //             cb(null, file.originalname);
    //         },
    //     }),
    // });
    // const uploadMoviePoster = upload.single("moviePoster");
    // uploadMoviePoster(req, res, function (err) {
    //     if (err) {
    //         console.log(err);
    //         res.status(500).json({ error: err });
    //     }
    //     console.log(req.file);
    //     res.status(200).json({ message: "File uploaded successfully" });
    // });
    console.log(req.body);
    res.status(200).json({data:req.body});
}
