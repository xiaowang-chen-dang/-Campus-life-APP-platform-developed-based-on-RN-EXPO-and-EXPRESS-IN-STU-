require('dotenv').config();  // 加载 .env 文件中的环境变量

module.exports = {
  secret: process.env.JWT_SECRET,  // 从环境变量中读取 JWT 密钥
  expiresIn: process.env.JWT_EXPIRES_IN || '1h',  // 从环境变量中读取过期时间，默认为 1 小时
};
