const jwt = require('jsonwebtoken');//库
const jwtConfig = require('../config/jwtConfig');

// 身份认证中间件
const JWTMiddleware = (req, res, next) => {
  // 从请求头中获取token
  const token = req.headers['authorization']?.split(' ')[1];  // 假设前端发送 Authorization: Bearer <token>
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: '没有提供身份验证的token'
    });
  }

  // 验证 token
  jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: '无效的token'
      });
    }

    // 将解码后的信息存储在请求对象中，后续可以使用
    req.user = decoded;
    next(); // 继续处理后续的路由
  });
};

module.exports = JWTMiddleware;
