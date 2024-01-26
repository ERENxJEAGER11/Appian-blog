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

exports.deletCategoryById = async (req, res) => {
     try {
        

     } catch (err){
        console.error(err);
        return res.status(502).json({
            error: "Internal Server Error",
            message: "Something went wrong",
        });
     }
}
