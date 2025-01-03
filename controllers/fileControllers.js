const fileServices = require('../services/fileServices');
const path = require('path');
const fileDirectory = path.join(__dirname, '../uploads');
exports.downloadFile = (req, res) => {
  try {
    const filePath = path.join(fileDirectory, req.params[0]); // 获取文件路径
    const relativePath = path.relative(__dirname, filePath); 
    const fileName = path.basename(relativePath);

    if (fileServices.fileExists(filePath)) {
      // 设置下载文件的头部
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.setHeader('Content-Type', 'application/octet-stream');
      res.sendFile(filePath, (err) => {
        if (err) {
          console.error('文件发送失败:', err);
          return res.status(500).json({ success: false, message: '文件发送失败' });
        }
      });
    } else {
      throw { status: 404, message: '没有要下载的文件' };
    }
  } catch (error) {
    const statusCode = error.status || 500;
    console.error(error);
    return res.status(statusCode).json({
      success: false,
      message: error.message || '下载文件失败',
    });
  }
};

