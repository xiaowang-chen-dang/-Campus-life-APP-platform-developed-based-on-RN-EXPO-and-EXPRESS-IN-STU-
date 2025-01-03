const multer = require('multer');

// 配置内存存储
const storageMemory = multer.memoryStorage();

// 创建 multer 实例，使用内存存储
const multerMiddleware= multer({
  storage: storageMemory,//内存存储
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('只允许上传图片文件'));
    }
    cb(null, true);
  }
}).single('image');


const path = require('path');

// 配置磁盘存储
const storageDisk = multer.diskStorage({
  destination: (req, file, cb) => {
    // 设置文件保存的目录，使用绝对路径
    cb(null, path.join(__dirname, '../uploads/img'));
  },
  filename: (req, file, cb) => {
    // 设置上传文件的文件名，避免重复
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname); // 获取文件扩展名
    cb(null, file.fieldname + '-' + uniqueSuffix + ext); // 设置文件名
  }
})

// 创建 multer 实例，使用磁盘存储
const multerPostMiddleware = multer({
  storage: storageDisk, 
  limits: { 
    fileSize: 5 * 1024 * 1024,
    files: 3 // 限制最多上传 3 个文件
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('只允许上传图片文件'));
    }
    cb(null, true); 
  }
}).array('images', 3); // 接受最多 3 个文件，字段名为 'images'

module.exports={multerMiddleware,
  multerPostMiddleware
}