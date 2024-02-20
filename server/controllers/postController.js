const pool = require('../database.js');

exports.getPostByPostId = async(req,res) => {
    try{
        const post_id = req.body.post_id;
        if(!post_id){
            return res.status(400).json({
                error: 'Invalid Post id',
                message: 'Post Id must be a non-empty number in the request body',
            });
        }

        const query = 'SELECT * FROM posts WHERE post_id =$1';
        const { rows } = await pool.query(query,[post_id]);

        if(rows.length===0) {
            return res.status(404).json({
                error: "Not Found",
                message: "Requested Post doesn't exixt or has been deleted.",
            });
        }
        return res.json(rows[0]);

    } catch(err){
        console.error(err);
        return res.status(502).json({error:'Internal Server Error', messssge: 'Something went wrong while fetching post.'});
    }
}

exports.deletePostById = async(req,res) => {
    try{
        const post_id = req.body.post_id;
        const auth = req.params.auth;

        if(!post_id) {
            return res.status(400).json({
                error: 'Invalid post',
                message: "Requested Post doesn't exixt or has already been deleted.",
            });
        }
        const auth_query = 'SELECT user_id, is_active FROM posts WHERE post_id = $1';
        const { auth_data } =  await pool.query(auth_query, [post_id]);

        if (auth.role_id === '1' || user_id === post[auth_data].created_by) {
            // Delete the post
            const deleteQuery = 'UPDATE post SET is_active = false, modified_on = CURRENT_TIMESTAMP WHERE post_id = $1';
            await pool.query(deleteQuery, [post_id]);

            return res.status(200).json({
                message: 'Post deleted successfully',
            });
        } else {
            return res.status(403).json({
                error: 'Unauthorized',
                message: 'You do not have permission to delete this post.',
            });
        }

    } catch(err){
        console.error(err);
        return res.status(502).json({error:'Internal Server Error', messssge: 'Something went wrong while deleting post.'});
    }
}

exports.createPost = async(req,res) =>{
  function beginTransaction(connection) {
        return new Promise((resolve,reject) => {
            connection.beginTransaction((err)=>{
                if(err) {
                    reject(err)
                } else {
                    resolve()
                }
            });
        });
  }

  function commitTransaction(connection) {
    return new Promise((resolve,reject) => {
        connection.commitTransaction((err)=>{
            if(err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
  }

   function rollbackTransaction(connection) {
       return new Promise((resolve,reject) => {
         connection.rollback(()=>{
            resolve();
         });
       });
   }

function insertPost(connection, postData) {
    return new Promise((resolve,reject) => {
        const sql = 'INSERT INTO Posts ( , , , , ,) values ($1,$2,$3)';
        const { post } = connection.query(sql,[])
    });

}





    try {
        const auth = req.params.auth;
        if(!auth || auth.role_id!==1 || auth.role_id!==2) {
            return res.status(403).json({
                error: 'Unauthorized',
                message: 'You do not have permission to create posts.',
            }); 
        }
        const {title, desc, content} = req.body.post;
        const {category_id} = req.body.category_id;
        const {image_url} = req.body.title_image;

        let connection = await pool.getConnection();

        //transaction starts

    

    } catch(err){
        console.error(err);
        return res.status(502).json({error:'Internal Server Error', messssge: 'Something went wrong while deleting post.'});
    }
}