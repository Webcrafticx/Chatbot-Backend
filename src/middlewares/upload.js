const multer = require('multer');
const path = require('path');
const fs = require('fs');
const UP = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(UP)) fs.mkdirSync(UP, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UP),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2,8)}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) cb(null, true);
    else cb(new Error('Invalid file type'));
  }
});

module.exports = upload;
