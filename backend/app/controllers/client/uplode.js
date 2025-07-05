const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, process.env.FILE_UPLOAD_PATH);
    },
    filename: (req, file, cb) => {
      return cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
});

const upload = multer({
storage: storage,
limits: { fileSize: "1000000" },
fileFilter: (req, file, cb) => {
    const fileTypes = /pdf|docs/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
    return cb(null, true);
    }
    cb("Give proper file formate to upload");
},
}).single("document");


module.exports = upload;