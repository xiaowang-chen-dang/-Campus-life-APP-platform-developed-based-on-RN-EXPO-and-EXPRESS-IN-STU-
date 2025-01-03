const db = require('../config/dbConfig');  // 连接数据库
const oQ=require('../db/queries/objectsQueries');

//加载失物招领界面
exports.getLostFounds = async (userId) => {
    try {
      const results = await db.query(oQ.getLostFounds, [userId]);

      return results;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      console.log(error.message);
      throw { status: 500, message: '打开我的失物招领界面时发生错误' };
    }
  };

//加载二手商品界面
  exports.getTwoHands = async (userId) => {
    try {
      const results = await db.query(oQ.getTwoHands, [userId]);
      return results;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      console.log(error.message);
      throw { status: 500, message: '打开我的二手交易界面时发生错误' };
    }
  };

