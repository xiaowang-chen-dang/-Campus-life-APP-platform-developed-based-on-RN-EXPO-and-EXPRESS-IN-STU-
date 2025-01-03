const pool = require('../config/dbConfig');

// 新建查询连接
async function querySql(sql, params) {
  try {
    const [results] = await pool.query(sql, params); // 直接使用 query() 方法
    return results; // 返回查询结果
  } catch (err) {
    console.error('Database query error:', err);  // 打印错误信息
    throw err; // 捕获并抛出异常
  }
}

module.exports = {
  querySql
};
