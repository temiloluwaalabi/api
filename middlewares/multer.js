import multer from "multer";
import path  from "path";
let storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
  if (
  file.mimetype === "image/png" ||
  file.mimetype === "image/jpg" ||
  file.mimetype === "image/jpeg"
  ) {
  cb(null, true);
  } else {
  cb(new Error("File format should be PNG,JPG,JPEG"), false);
  }
};
export const upload = multer({ storage: storage, fileFilter: fileFilter });
