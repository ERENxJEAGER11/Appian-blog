const pool = require('../database');

exports.getAllCategories = async (req, res) => {
    try {
        const query = 'SELECT * FROM categories WHERE is_active = true';
        const { rows } = await pool.query(query);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Not Found", message: "No category found" });
        }
        return res.json({ rows });
    } catch (err) {
        console.error(err);
        return res.status(502).json({ error: err, message: err.message });
    }
}

exports.getCategoryById = async (req, res) => {
    try {
        const category_ids = req.body.category_ids;

        if (!Array.isArray(category_ids) || category_ids.length === 0 || category_ids.some(id => typeof id !== 'number')) {
            return res.status(400).json({
                error: 'Invalid category Ids',
                message: 'Category Ids must be a non-empty array of numbers in the request body',
            });
        }

        const placeholders = category_ids.map((id, index) => `$${index + 1}`).join(',');

        const query = `SELECT * FROM categories WHERE category_id IN (${placeholders})`;
        const values = category_ids;

        const { rows } = await pool.query(query, values);

        if (rows.length === 0) {
            return res.status(404).json({
                error: "Not Found",
                message: "No categories found with these Ids",
            });
        }

        return res.json(rows);

    } catch (err) {
        console.error(err);
        return res.status(502).json({
            error: "Internal Server Error",
            message: "Something went wrong",
        });
    }
};

exports.deleteCategoryById = async (req, res) => {
     try {
        const category_id = req.body.category_id;
        const user = req.headers;

        if(!user.user_id) {
            return res.status(404).json({error:"Not authorized",message: "user is not authorized"});
        }

        if(!category_id) {
            return res.status(404).json({error:"Not found",message: "Category Id can not be null"})
        }
        
        const query = 'UPDATE categories SET is_active = false, modified_on = CURRENT_TIMESTAMP, modified_by = $1 WHERE category_id = $2 RETURNING *';
        const values = [Number(user.user_id),category_id];

        const { rows } = await pool.query(query, values);

        if(rows.length===0){
            return res.status(404).json({
                error: "Not Found",
                message: "No categories found with these Ids",
            });
        }
        return res.json(rows);

     } catch (err){
        console.error(err);
        return res.status(502).json({
            error: "Internal Server Error",
            message: "Something went wrong",
        });
     }
}

exports.createCategory = async(req,res) => {
    try {
        const { category_name, created_by, modified_by } = req.body;
        const user = req.headers;

        if(!user.user_id) {
            return res.status(404).json({error:"Not authorized",message: "user is not authorized"});
        }


    } catch (err) {
        console.error(err);
        return res.status(502).json({
            error: "Internal Server Error",
            message: "Something went wrong",
        });
    }
}