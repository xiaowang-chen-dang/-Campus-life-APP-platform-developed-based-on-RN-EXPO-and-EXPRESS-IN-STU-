module.exports={
    verifyId:'select id from oa where id =?',
    getOa:'select title,content,publish_date,author from oa where id=?',
    getDocuments:'select id,name,path from file where id in (?)',
    getOaFileIds: 'select file_id from oa_file where oa_id = ?',

    showTypeOas: 'select id,title, publish_date, author from oa where type=? ORDER BY publish_date DESC LIMIT 10 OFFSET ? ',
    showOas: 'select id,title, publish_date, author from oa ORDER BY publish_date DESC LIMIT 10 OFFSET ? ',

    getUrl:'select path from file where id=?',

    selectOas: `SELECT id, title, publish_date, author FROM oa WHERE title LIKE ? ORDER BY publish_date DESC LIMIT 10 OFFSET ?`,
    selectTypeOas:'SELECT id, title, publish_date, author FROM oa WHERE type=? and title LIKE ? ORDER BY publish_date DESC LIMIT 10 OFFSET ?'

}