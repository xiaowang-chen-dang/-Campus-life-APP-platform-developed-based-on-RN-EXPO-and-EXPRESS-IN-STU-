const { constrainedMemory } = require('process');
const db = require('../config/dbConfig');  // 连接数据库
const pQ=require('../db/queries/postQueries');
const path = require('path')

exports.sendPost = async (userId, title, content, createdAt, pictures) => {
    console.log("正在尝试在数据库插入帖子");
    try {
        const insertResult = await db.query(pQ.insertPost, [userId, title, content, createdAt, pictures.picture, pictures.picture2, pictures.picture3]);

        if (insertResult.rowCount === 0) {
            throw { status: 500, message: '帖子插入失败' };
        }
        return;
    } catch (error) {
        if (error.status) {
            throw error;
        }
        console.error('数据库错误：', error.message);
        throw { status: 500, message: '创建帖子时，服务器出现错误' };
    }
};


exports.sendComment = async (postId,userId,content,createdAt) => {
    console.log("正在尝试插入评论");
    console.log(postId+userId+content+createdAt)
    try {
        await db.query(pQ.insertComment,[postId,userId,content,createdAt]);
        return;
    } catch (error) {    
        if (error.status) 
            throw error; 
        console.log(error.message);
        throw { status: 500, message: '发送评论时发生错误'};
    }
}

exports.getComments=async(postId)=>{
    console.log("正在尝试调用数据库");
    try {
        const results=await db.query(pQ.getComments,[postId]);

        const comments=results[0];

        return comments;
    } catch (error) {
        
        if (error.status) 
            throw error; 
        throw { status: 500, message: '加载评论区时发生错误'};
    }
}