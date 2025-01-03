const postServices=require('../services/postServices')

const path = require('path');

exports.sendPost = async (req, res) => {
    console.log("正在尝试插入帖子");
    const { title, content } = req.body;
    const createdAt=new Date();
    const files = req.files || []; // 获取上传的文件数组
    const userId = req.user?.userId;
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

    // 处理图片路径
    const imgPaths = files.map((file) => path.join('uploads', 'img', path.basename(file.path))); // 获取所有文件的相对路径

    // 动态分配图片字段
    const pictures = {
        picture: imgPaths[0] || null, 
        picture2: imgPaths[1] || null,
        picture3: imgPaths[2] || null, 
    };

    try {
        await postServices.sendPost(userId, title, content, createdAt, pictures);

        return res.status(201).json({
            success: true,
            message: "帖子创建成功",
        });
    } catch (error) {
        const statusCode = error.status || 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message || "创建帖子失败",
        });
    }
};

exports.sendComment=async(req,res)=>{
    console.log("正在尝试发表评论");
    const{postId,content,createdAt}=req.body;

    const userId = req.user?.userId;
   
    if(postId==null||postId<0){
        return res.status(401).json({ success:false,message: '没有上传当前评论帖子的id' });  
    }
    if (!userId) {
        return res.status(401).json({ success:false,message: '未找到用户ID' });  
      }
    if (!content) {
        return res.status(400).json({
            success: false,
            message: '评论内容不能为空'
        });
    }
    if(!createdAt){
        return res.status(401).json({ success:false,message: '没有上传当前评论的时间' });  
    }
    try{
        await postServices.sendComment(postId,userId,content,createdAt);
        return res.status(201).json({
            success: true,
            message: '评论发送成功'
        });
    }catch(error){
        const statusCode = error.status || 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message || '评论发送失败',
      });
    }
}

exports.getComments=async(req,res)=>{
    console.log("正在尝试加载评论区");
    const {postId}=req.body;
    if(postId==null)
        return res.status(400).json({success:false,message:"没有上传当前帖子的id"})
    try{
        const results=await postServices.getComments(postId);
        return res.status(200).json({
            success: true,
            message:"成功加载评论区",
            data:results
          });
    }catch(error){
        const statusCode = error.status || 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message || '加载评论区失败',
      });
    }
}