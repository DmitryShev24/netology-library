const multer = require("multer")

const storage = multer.diskStorage({
    destination(req: any, file: any, cb: any) {
        cb(null, "public/bookfile")
    },
    filename(req: any, file: any, cb: any) {
        cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`)
    }
})

const allowedTypes = ['application/pdf', 'application/doc', 'application/epub']

const fileFilter = (req: any, file: any, cb: any) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multer({
    storage, fileFilter
})