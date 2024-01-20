const { user } = require('pg/lib/defaults');
const pool = require('../database');

exports.getAllUsers = async (req, res) => {
    try{
        const query = 'SELECT * FROM "users" WHERE is_active=true';
        const { rows } = await pool.query(query);
        // Check if any users were retrieved
        if (rows.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }
        res.json(rows);
    } catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error : Something went wrong'})
    }
};

exports.getUserById = async (req, res) => {
    try {
        // Access user_id from params or body using optional chaining
        const user_id = req.params?.user_id || req.body?.user_id;

        // Validation for user_id 
        if (!user_id) {
            return res.status(400).json({ error: 'xyz' });
        }

        const query = 'SELECT * FROM "users" WHERE user_id = $1';
        const { rows } = await pool.query(query, [user_id]);

        if (rows.length === 0) {
            return res.status(404).json({error: 'No user found with the provided user_id' });
        }
        if(rows[0].is_active === false) {
            return res.status(404).json({ deactivatedUser: true, error: 'user has been deactivated' });
        }

        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error: Something went wrong' });
    }
};

exports.deleteUserById = async (req, res) => {
    try {
        const user_id = req.params?.user_id || req.body?.user_id;
        const query = 'UPDATE users SET is_active = false WHERE user_id = $1';
        const rows = await pool.query(query, [user_id]);
        
        if (rows.rowCount === 0) {
            return res.status(404).json({ error: 'No user found with the provided user_id' });
        }

        res.json({ message: 'User deactivated  successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error: Something went wrong" });
    }
}