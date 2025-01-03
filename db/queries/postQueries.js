module.exports={
    getPosts:'select post_id,title,content,created_at,picture,picture2,picture3 from post ORDER BY created_at DESC LIMIT 10 offset ?;',
    insertPost:'insert into post (user_id,title,content,created_at,picture,picture2,picture3) values (?,?,?,?,?,?,?) ',
    selectPost:'select post_id from post where user_id = ? and created_at =?',

    insertComment:'insert into comment (post_id,user_id,content,created_at) values (?,?,?,?)',
    getComments:'select content,created_at from comment where post_id=? ORDER BY created_at DESC'
}