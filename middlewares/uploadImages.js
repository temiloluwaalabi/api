import multer from "multer";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename)


const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/assets'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + ".jpeg")
    },
});


const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb({
            message: "Unsupported file format"
        }, false);
    };
};

export const uploadPhoto = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: {
        fieldSize: 5000000
    }
})


export const courseImgResize = async (req, res, next) => {
    if (!req.file) return next()
    await Promise.all(
        req.files.map(async (file) => {
            await sharp(file.path).resize(300, 300).toFormat('jpeg').jpeg({
                quality: 90
            }).toFile(`public/assets/courses/${file.filename}`)
        })
    );
    next()
};

export const profileResizeImg = async (req, res, next) => {
    if (!req.file) return next()
    await Promise.all(
        req.files.map(async (file) => {
            await sharp(file.path).resize(300, 300).toFormat('jpeg').jpeg({
                quality: 90
            }).toFile(`public/assets/profile/${file.filename}`)
        })
    );
    next()
};
