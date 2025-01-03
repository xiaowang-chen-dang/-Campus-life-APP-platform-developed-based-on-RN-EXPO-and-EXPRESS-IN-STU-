const oaServices=require('../services/oaServices')

exports.getOa=async (req,res)=>{
  console.log("正在尝试打开详情页");
    const {id}=req.body;
    if (id === undefined || id === null || id === ""||id < 0) {
        return res.status(400).json({
          success: false,
          message: "没有访问的对象",
        });
      }
    try{
      const result = await oaServices.getOa(id);
      return res.status(200).json({
        success: true,
        data:result
      });
    }catch(error){
      console.log(error.message);
      const statusCode = error.status || 500;
      return res.status(statusCode).json({
        success: false,
        message: error.message || '打开oa详情页失败',
      });
    }
}

exports.showOas = async (req, res) => {
  console.log("正在尝试调用");

  // 解构查询参数
  let { page, type } = req.query;

  if (page < 0) {
      return res.status(400).json({
          success: false,
          message: "传入的 page 有错误，必须为非负整数",
      });
  }

  if ([0, 1, 2].includes(type)) {
      return res.status(400).json({
          success: false,
          message: "没有选择有效的筛选类型，type 必须为 0, 1 或 2",
      });
  }
  try{
    const results=await oaServices.showOas(page,type);
    return res.status(200).json({
      success: true,
      message:"成功进入新闻页",
      data:results
    });
  }catch(error){
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || '打开新闻页失败',
    });
  }
}

exports.downloadDocuments = async (req, res) => {
  const { file_id } = req.body;

  if (!file_id) {
    return res.status(400).json({
      success: false,
      message: '没有指定要下载的文件的 ID',
    });
  }

  try {

    const filePath = await oaServices.downloadDocument(file_id);

    res.download(filePath, (err) => {
      if (err) {
        console.error('下载文件出错:', err.message);
        return res.status(500).json({
          success: false,
          message: '文件下载失败',
        });
      }
    });
  } catch (error) {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || '文件下载失败',
    });
  }
};


exports.selectOas=async (req,res)=>{
  const {keywords,page,type}=req.body;

  if(!keywords){
    return res.status(400).json({
      success:false,
      message:"没有输入关键字，无法查询"
    })
  }
  if(page === undefined || page === null || page === ""||page < 0){
    return res.status(400).json({
      success:false,
      message:"没有输入页码或页码无效，无法查询"
    })
  }
  if (![0, 1, 2].includes(type)) {
    return res.status(400).json({
        success: false,
        message: "没有选择有效的筛选类型,type 必须为 0, 1 或 2",
    });
}
  try{
    const results=await oaServices.selectOas(keywords,page,type);
    console.log(results);
    return res.status(200).json({
      success:true,
      message:"查询成功",
      data:results
    })
  }catch(error){
    const statusCode=error.status||500;
    return res.status(statusCode).json({
      success:false,
      message:error.message||"检索失败"
    })
  }
}