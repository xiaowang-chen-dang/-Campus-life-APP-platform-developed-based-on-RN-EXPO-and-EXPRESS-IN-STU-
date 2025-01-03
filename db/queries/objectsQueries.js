module.exports={
    getLostFounds:'select object_id,title,created_at,picture from object where user_id =? and type =1 ORDER BY created_at DESC ',//我的失物招领
    getTwoHands:'select object_id,title,price,created_at,picture from object where user_id =? and type =2 ORDER BY created_at DESC ',//我的二手交易


getPublicLostFounds :"SELECT o.object_id, o.user_id, o.title, o.created_at, o.picture,o.picture2,o.picture3, o.content, u.username, u.avatar AS user_avatar FROM "+
"object o LEFT JOIN userbasicinformation u ON o.user_id = u.id WHERE o.type = 1 ORDER BY o.created_at DESC LIMIT 10 OFFSET ?;",   // 公共失物招领


getPublicTwoHands :"SELECT o.object_id, o.user_id, o.title, o.price, o.created_at, o.picture, ,o.picture2,o.picture3,o.content, u.username, u.avatar "+
"AS user_avatar FROM object o LEFT JOIN userbasicinformation u ON o.user_id = u.id WHERE o.type = 2 ORDER BY o.created_at DESC LIMIT 10 OFFSET ?;",

    
    getLostFound:'select title,created_at,content,picture from object where object_id =? and type=1',
    getTwoHand:'select title,price,created_at,content,picture from object where object_id =? and type=2',

    getContact:'select contact from object where object_id=?',

    sendLostFound:'insert object (user_id,title,content,created_at,picture,contact,type) values(?,?,?,?,?,?,1)',
    sendTwohand:'insert object (user_id,title,price,content,created_at,picture,contact,type) values(?,?,?,?,?,?,?,2)'
}