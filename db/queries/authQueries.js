module.exports={
    getPwd:'SELECT id,password,email FROM userbasicinformation WHERE email = ?',//通过邮箱查找id，密码和邮箱
    getEmail:'SELECT email FROM userbasicinformation where email =?',//通过邮箱查找邮箱

    insertBasicInfo:'insert into `userbasicinformation` (email,password) values(?,?)',//插入昵称，邮箱和密码

    updateIdName: 'UPDATE userbasicinformation SET username = ? WHERE id = ?',

    updateGender: 'UPDATE userbasicinformation SET gender = ? WHERE id = ?',

    updateImg: 'UPDATE userbasicinformation SET img = ? WHERE id = ?',

    insertVerification:'insert into `verification`(email,code,expiresAt) values(?,?,?)',//插入验证码
    getVerification:'SELECT code FROM verification WHERE email = ?',//获取验证码
    getCodeExpiresAt:'SELECT expiresAt FROM verification WHERE email = ?',//根据验证码验证是否过期
    deleteVerification: 'delete from `verification` where email = ?',
    updateVerification:'update verification set code=? , expiresAt=? where email=?',

    updatePwd:"update userbasicinformation set password=? where email=?",//

    getPostUser:'select id,username,img from userbasicinformation where id=?'
}