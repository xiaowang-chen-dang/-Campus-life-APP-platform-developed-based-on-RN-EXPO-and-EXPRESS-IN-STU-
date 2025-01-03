const authServices = require('../services/authServices');

exports.login = async (req, res) => {
  const {email,password} = req.body;
  console.log("email:"+email);
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "请填写邮箱",
    });
  }
  if (!password) {
    return res.status(400).json({
      success: false,
      message: "请填写密码",
    });
  }

  try {

    // 验证密码
    const result = await authServices.authValidPwd(email, password);

    return res.status(200).json({
      success: true,
      message: '登录成功',
      token: result.token,
    });
  } catch (error) {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || '登录失败',
    });
  }
};



exports.register = async (req, res) => {
  const {email,password,code } = req.body;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "请填写邮箱",
    });
  }
  if (!password) {
    return res.status(400).json({
      success: false,
      message: "请填写密码",
    });
  }
  if (!code) {
    return res.status(400).json({
      success: false,
      message: "请填写验证码",
    });
  }
  try {
    // 调用验证码验证服务
    await authServices.verifyVerificationCode(email, code); // 服务调用
    const result = await authServices.authRegister(email, password);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    const statusCode = error.status || 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message || '注册失败',
    });
  }
};


exports.updateProfile = async (req, res) => {
  console.log('JWT Payload:', req.user);  // 打印 req.user，查看是否包含解码后的用户信息

  const userId = req.user?.userId;  // 安全访问 userId，避免 undefined 错误

  if (!userId) {
    return res.status(401).json({ message: '未找到用户ID' });  // 如果没有 userId，返回错误
  }

  const { idName, gender } = req.body;
  const img = req.file;

  try {
    // 调用 authServices 的 authUpdate 方法更新用户信息
    const response = await authServices.authUpdate(userId, idName, gender, img);
    return res.status(200).json(response);
   
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: '更新失败',
      error: error.message
    });
  }
};

exports.generateVerificationCode=async(req,res)=>{
  const email=req.body.email;
  if(!email){
    return res.status(400).json({
      success:false,
      message:"请填写邮箱"
    })
  }
  try{
    const response=await authServices.generateVerificationCode(email);
    return res.status(200).json({
      success:true,
      message:response.message
    })
  }catch(error){
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

/*exports.verifyVerificationCode = async (req, res) => {//验证验证码，在controller被调用于登录和注册
  const { email, code } = req.body;

  if (!code) {
    return res.status(400).json({
      success: "false",
      message: "请填写验证码",
    });
  }

  try {
    const response = await authServices.verifyVerificationCode(email, code);
    return res.status(200).json(response); 
  } catch (error) {
    const statusCode = error.status || 500; 
    return res.status(statusCode).json({
      success: "false",
      message: error.message || "验证码验证失败，请重新验证",
    });
  }
};*/

exports.remakePwd=async(req,res)=>{
  const {email,password,code}=req.body;

  console.log('JWT Payload:', req.user);  // 打印 req.user，查看是否包含解码后的用户信息
  
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "请填写邮箱",
    });
  }
  if (!password) {
    return res.status(400).json({
      success: false,
      message: "请填写密码",
    });
  }
  if (!code) {
    return res.status(400).json({
      success: false,
      message: "请填写验证码",
    });
  }
  try{
    await authServices.verifyVerificationCode(email, code);
    const result=await authServices.remakePwd(email,password);
    return res.status(200).json({
      success: true,
      message: result.message,
    });

  }catch(error){
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || '重置密码失败'
    })
  }
}