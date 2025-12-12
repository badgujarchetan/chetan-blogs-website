import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" 
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed"), false);
  }
}

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
