const multer = require("multer")

// defining file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname) // g = globally, adds hyphen and forward slash to prevent file upload errors
    }
  })
  
// specify accepted file formats
function fileFilter (req, file, cb) {
    if(
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" //mimetype identifies types of data
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
  }
  
  const upload = multer({ storage, fileFilter })
  const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const dm = decimal || 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"]; // reads file size
    const index = Math.floor(Math.log(bytes) / Math.log(1000)); // converts file size to KB
    return (
      parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
    );
  };
  module.exports = { upload, fileSizeFormatter }