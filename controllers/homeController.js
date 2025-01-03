const homeServices=require('../services/homeServices')

exports.getPosts=async (req,res)=>{
    const {page}=req.body;
    if(page === undefined || page === null || page === ""||page < 0){
        return res.status(400).json({
          success:false,
          message:"没有输入页码或页码无效，无法查询"
        })
      }
    try{
        const results=await homeServices.getPosts(page);
        res.status(200).json({
            success: true,
            data:results
          });
    }catch(error){
        const statusCode = error.status || 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message || '打开贴吧页失败',
      });
    }
}

exports.getPublicLostFounds=async(req,res)=>{
    const {page}=req.body;
    if(page === undefined || page === null || page === ""||page < 0){
        return res.status(400).json({
          success:false,
          message:"没有输入页码或页码无效，无法查询"
        })
      }
    try{
        const results=await homeServices.getPublicLoseFounds(page);
        res.status(200).json({
            success: true,
            data:results
          });
    }catch(error){
        const statusCode = error.status || 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message || '打开失物招领页失败',
      });
    }
}

exports.getPublicTwoHands=async(req,res)=>{
    const {page}=req.body;
    if(page === undefined || page === null || page === ""||page < 0){
        return res.status(400).json({
          success:false,
          message:"没有输入页码或页码无效，无法查询"
        })
      }
    try{
        const results=await homeServices.getPublicTwoHands(page);
        res.status(200).json({
            success: true,
            data:results
          });
    }catch(error){
        const statusCode = error.status || 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message || '打开二手交易页失败',
      });
    }
}
