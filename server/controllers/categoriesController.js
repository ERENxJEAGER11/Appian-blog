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

exports.getCategoriesById = async (req, res) => {
    try {

    } catch(err) {
        console.error(err);
        return res.status(502).json({ error: err, message: err.message });
    }
}
