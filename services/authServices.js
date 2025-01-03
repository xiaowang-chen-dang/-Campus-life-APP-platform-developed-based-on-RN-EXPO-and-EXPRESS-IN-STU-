const bcrypt = require('bcrypt');
const db = require('../config/dbConfig');  // 连接数据库
const aQ = require('../db/queries/authQueries');
const jwtUtils = require('../utils/jwtUtils');

exports.authValidPwd = async (email, password) => {
  console.log("正在尝试登录");
  try {
    const results = await db.query(aQ.getPwd, [email]);

    if (results[0].length === 0) {
      throw { status: 404, message: '邮箱未注册' };
    }

    const user = results[0][0]; 

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw { status: 401, message: '密码错误' }; 
    }

    const token = jwtUtils.generateJWT(user);
    return { success: true, token };
  } catch (error) {
  
    if (error.status) {
      throw error; 
    }
    throw { status: 500, message: '服务器内部错误'};
  }
};


exports.authRegister = async (email, password) => {
  try {
     // 检查邮箱是否已存在
     const results = await db.query(aQ.getEmail, [email]);
     if (results[0].length !== 0) {
       throw { status: 400, message: '邮箱已注册' };
     }
    // 密码加密
    
    const hashedPwd = await bcrypt.hash(password, 10);

    // 插入基本信息
    await db.query(aQ.insertBasicInfo, [email, hashedPwd]);

    return { success: true, message: '注册成功' };
  } catch (error) {
    if (error.status) {
      throw error; 
    } 
    throw { status: 500, message: '服务器内部错误：注册失败' }; 
  }
};


// 更新用户信息
exports.authUpdate = async (id, idName, gender, img) => {
  try {
    let updateQueries = [];
  
    if (idName) {
      updateQueries.push(db.query(aQ.updateIdName, [idName, id]));
    }

    if (gender) {
      updateQueries.push(db.query(aQ.updateGender, [gender, id]));
    }

    if (img) {
      updateQueries.push(db.query(aQ.updateImg, [img.buffer, id]));
    }

    if (updateQueries.length === 0) {
      return { success: true, message: '没有更新的内容' };
    }

    // 并行执行所有更新查询
    const results = await Promise.all(updateQueries);

    const updatedResults = results.map((result, index) => {
      return result[0]?.affectedRows > 0 ? '更新成功' : '未做任何更改';
    });

    return {
      success: true,
      message: '个人信息更新成功',
      updatedResults
    };
  } catch (err) {
    throw new Error('更新个人信息失败'+err.message);
  }
};

exports.generateVerificationCode = async (email) => {
  console.log("正在尝试生成验证码");
  try{
    const codeResults=await db.query(aQ.getVerification,[email]);
    
    if(codeResults[0].length===0){
      // 生成 6 位随机验证码
      const code= Math.floor(100000 + Math.random() * 900000);

      // 存储验证码到数据库，设置过期时间 5 分钟
      const expiresAt= new Date(Date.now() + 5 * 60 * 1000);

      await(db.query(aQ.insertVerification,[email,code,expiresAt]));

      return{
        success:true,
        message:"验证码发送成功,请耐心等待"
      };
    }else{
      const expiresAtResults=await db.query(aQ.getCodeExpiresAt,[email]);
      if(expiresAtResults.length > 0 && new Date()>new Date(expiresAtResults[0].expiresAt)){
        const newCode = Math.floor(100000 + Math.random() * 900000);
        const newExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
        await db.query(aQ.updateVerification,[newCode,newExpiresAt,email]);
        return{
          success:true,
          message:"验证码已经重新发送，请耐心等待"
        }
      }else{
        throw {status:429,message:"请不要重复请求发送验证码"}
      }
    }
    }catch(error){
      console.log("error,message:"+error.message);
      if (error.status) {
        throw error;
      }else
        throw {status:500,message:"生成验证码失败，请重新发送"}
  }
};


exports.verifyVerificationCode = async (email, code) => {
  const codeResults = await db.query(aQ.getVerification, [email]);
  const localCode=codeResults[0];
  try {
    if (!localCode) {
      throw { status: 404, message: "验证码不存在，请重新发送" };
    }
    if (localCode[0].code !== code) {
      throw { status: 400, message: "验证码错误" };
    }

    const expiresAt = await db.query(aQ.getCodeExpiresAt, [code]);
    if (new Date(expiresAt) < new Date()) {
      throw { status: 410, message: "验证码已过期，请重新发送" };
    }

    await db.query(aQ.deleteVerification, [email]);
    return { success: true, message: "验证码验证成功" };
  } catch (error) {
    if (error.status) {
      throw error;
    }

    throw { status: 500, message: "验证码验证失败 "};
  }
};

exports.remakePwd=async(email,password)=>{
  try{
    const hashedPwd = await bcrypt.hash(password, 10);
    await db.query(aQ.updatePwd,[hashedPwd,email]);
    return { success: true, message: '重置密码成功，请重新登录' };
  }catch(error){
    if (error.status) {
      throw error;
    }
    throw { status: 500, message: "重置密码失败 "};
  }
};