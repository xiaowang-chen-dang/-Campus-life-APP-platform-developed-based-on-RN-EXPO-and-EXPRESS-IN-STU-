const db = require('../config/dbConfig');  // 连接数据库
const oQ=require('../db/queries/oaQueries');
const path = require('path');

exports.getOa = async (id) => {
  try {
    const oaIdResults = await db.query(oQ.verifyId, [id]);

    if (!oaIdResults || oaIdResults.length === 0) {
      throw { status: 404, message: '当前oa不存在或已经被删除' };
    }
  
    const fileIdResults = await db.query(oQ.getOaFileIds, [id]);
    const fileIds = fileIdResults[0].map(file => file.file_id);
    const oaResults = await db.query(oQ.getOa, [id]);
    const results = oaResults[0];
    
    if (fileIds.length === 0) {
      const fresults=[];
      return {
        results,
        fresults
      };
    } else {
      const fileResults = await db.query(oQ.getDocuments, [fileIds]);
      console.log('fileResults:', fileResults);
      const fresults = fileResults[0];
      return {
        results,
        fresults
      };
    }
  } catch (error) {
    console.log("Error:", error); // 打印后端的错误信息
    if (error.status) {
      throw error; 
    }
    throw { status: 500, message: '打开oa详情页出现错误' };
  }
};

exports.showOas=async(page,type)=>{

  try{
    if(type==0){
      const oaResults=await db.query(oQ.showOas,[page*10]);
      console.log("执行type=0");

      const results=oaResults[0];
      console.log(results);
      return results;
    }else{
      const oaResults=await db.query(oQ.showTypeOas,[type,page*10]);
      console.log("执行type!=0");

      const results=oaResults[0];
      console.log(results);
      return results
    }
  }catch(error){
    if (error.status) {
      throw error; 
    }
    console.log(error.message);
    throw { status: 500, message: '打开新闻出现错误'};
  }
}
exports.downloadDocument = async (file_id) => {
  try {
    const urlResult = await db.query(oQ.getUrl, [file_id]);
    if (!urlResult || urlResult.length === 0) {
      throw { status: 404, message: '文件未找到' };
    }
    const filePath = urlResult[0][0].path;
    const absolutePath = path.join(__dirname,'..', filePath);
    return absolutePath;
  } catch (error) {
    if (error.status) {
      throw error;
    }
    console.log(error.message);
    throw { status: 500, message: '无法获取文件路径' };
  }
};

exports.selectOas=async(keywords,page,type)=>{
  const searchKeywords = `%${keywords}%`;
  try{
    if(type==0)
      var oaResults=await db.query(oQ.selectOas,[searchKeywords,page*10]);
    else
      var oaResults=await db.query(oQ.selectTypeOas,[type,searchKeywords,page*10]);

    const results=oaResults[0];
    return  results; 
  }catch(error){
    if(error.status)
        throw error;
    throw {status:500,message:"无法进行检索"}
  }
}