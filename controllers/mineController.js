const mineServices=require('../services/mineServices')


exports.getLostFounds=async(req,res)=>{
    const userId=req.user?.userId;
    try{
        const results=await mineServices.getLostFounds(userId);
        return res.status(201).json({
            success: true,
            date:results
        });
    }catch(error){
        const statusCode = error.status || 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message || '打开我的失物招领页失败',
      });
    }
}

exports.getTwoHands=async(req,res)=>{
    const userId=req.user?.userId;
    try{
        const results=await mineServices.getTwoHands(userId);
        return res.status(201).json({
            success: true,
            date:results
        });
    }catch(error){
        const statusCode = error.status || 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message || '打开我的二手交易页失败',
      });
    }
}

