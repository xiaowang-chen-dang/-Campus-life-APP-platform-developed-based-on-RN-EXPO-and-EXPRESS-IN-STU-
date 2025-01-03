const db = require('../config/dbConfig');  // 连接数据库
const pQ=require('../db/queries/postQueries');
const oQ=require('../db/queries/objectsQueries')
const aQ=require('../db/queries/authQueries')


exports.getPosts=async (page)=>{
    try{
        const postResults=await db.query(pQ.getPosts,[page*10]);
        const results=postResults[0];
        console.log(results);
        return results;
    }catch(error){
        if (error.status) {
            throw error; 
          }
          console.log(error.message);
          throw { status: 500, message: '打开贴吧页时，服务器出现错误'};
    }
}

//加载失物招领界面
exports.getPublicLoseFounds = async (page) => {
    try {
      const results = await db.query(oQ.getPublicLostFounds, [page]);
      const result=results[0];
      return result;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      console.log(error.message);
      throw { status: 500, message: '打开失物招领界面时发生错误' };
    }
  };

//加载二手商品界面
  exports.getPublicTwoHands = async (page) => {
    try {
      const results = await db.query(oQ.getPublicTwoHands, [page]);
      const result=results[0];
      return result;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      console.log(error.message);
      throw { status: 500, message: '打开二手交易界面时发生错误' };
    }
  };
