const objectServices=require('../services/objectServices')

exports.getLostFound=async(req,res)=>{
    const {objectId}=req.body;
    if(objectId === undefined || objectId === null || objectId === ""||objectId < 0){
        return res.status(400).json({
          success:false,
          message:"没有上传访问对象的id，无法查询"
        })
      }
    try{
        const results=await objectServices.getLostFound(objectId);
        return res.status(201).json({
            success: true,
            date:results
        });
    }catch(error){
        const statusCode = error.status || 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message || '打开失物招领详情页失败',
      });
    }
}

exports.getTwoHand=async(req,res)=>{
    const {objectId}=req.body;
    if(objectId === undefined || objectId === null || objectId === ""||objectId < 0){
        return res.status(400).json({
          success:false,
          message:"没有上传访问对象的id，无法查询"
        })
      }
    try{
        const results=await objectServices.getTwoHand(objectId);
        return res.status(201).json({
            success: true,
            date:results
        });
    }catch(error){
        const statusCode = error.status || 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message || '打开二手交易详情页失败',
      });
    }
}

exports.getContact=async(req,res)=>{
  const {objectId}=req.body;
  if(objectId === undefined || objectId === null || objectId === ""||objectId < 0){
      return res.status(400).json({
        success:false,
        message:"没有上传失物招领或二手交易的id"
      })
    }
  try{
      const results=await objectServices.getContact(objectId);
      return res.status(201).json({
          success: true,
          date:results
      });
  }catch(error){
      const statusCode = error.status || 500;
      return res.status(statusCode).json({
          success: false,
          message: error.message || '获取联系方式失败',
    });
  }
}

exports.sendLostFound=async(req,res)=>{
  const {title,content,contact}=req.body;
  const createdAt=new Date();
  const userId = req.user?.userId;
  const files = req.files || []; 
  if (!title || !content) {
    return res.status(400).json({
        success: "false",
        message: "标题或正文不能为空",
    });
}

if (!createdAt) {
    return res.status(400).json({
        success: "false",
        message: "缺少时间戳参数",
    });
}
  const imgPaths = files.map((file) => path.join('uploads', 'img', path.basename(file.path))); // 获取所有文件的相对路径
  const pictures = {
    picture: imgPaths[0] || null, 
    picture2: imgPaths[1] || null,
    picture3: imgPaths[2] || null, 
  };
  try{
      await objectServices.sendLostFound(userId,title,content,createdAt,contact,pictures);
      return res.status(201).json({
          success: true,
          message:"失物招领创建成功"
      });
  }catch(error){
      const statusCode = error.status || 500;
      return res.status(statusCode).json({
          success: false,
          message: error.message || '创建失物招领失败',
    });
  }
}

exports.sendTwoHand=async(req,res)=>{
  const {title,content,price,contact}=req.body;
  const createdAt=new Date();
  const userId = req.user?.userId;
  const files = req.files || []; 
  if (!title || !content) {
    return res.status(400).json({
        success: "false",
        message: "标题或正文不能为空",
    });
}
if(price === undefined || price === null ||price === ""||price < 0){
  return res.status(400).json({
    success:false,
    message:"没有上传价格，无法发布"
  })
}
if (!createdAt) {
    return res.status(400).json({
        success: "false",
        message: "缺少时间戳参数",
    });
}
if (!contact) {
  return res.status(400).json({
      success: "false",
      message: "缺少联系方式",
  });
}
const imgPaths = files.map((file) => path.join('uploads', 'img', path.basename(file.path))); 

const pictures = {
  picture: imgPaths[0] || null, 
  picture2: imgPaths[1] || null,
  picture3: imgPaths[2] || null, 
};
  try{
      await objectServices.sendLostFound(userId,title,price,content,createdAt,contact,pictures);
      return res.status(201).json({
          success: true,
          message:"二手交易创建成功"
      });
  }catch(error){
      const statusCode = error.status || 500;
      return res.status(statusCode).json({
          success: false,
          message: error.message || '创建二手交易失败',
    });
  }
}