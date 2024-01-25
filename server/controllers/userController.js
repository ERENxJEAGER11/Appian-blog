const { user } = require('pg/lib/defaults');
const pool = require('../database');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const is_active = req.body.is_active;

        // Only respond with active users if is_active is not passed
        const query = `SELECT * FROM "users" WHERE is_active = ${is_active === true || is_active === false ? $1 : 'true'}`;
        const values = is_active === true || is_active === false ? [is_active] : [];

        const { rows } = await pool.query(query, values);

        // Check if any users were retrieved
        if (rows.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error: Something went wrong' });
    }
};

// Get user by ID
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
            return res.status(404).json({ error: 'No user found with the provided user_id' });
        }

        if (rows[0].is_active === false) {
            return res.status(404).json({ deactivatedUser: true, error: 'User has been deactivated' });
        }

        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error: Something went wrong' });
    }
};

// Delete user by ID (Deactivate user)
exports.deleteUserById = async (req, res) => {
    try {
        const user_id = req.params?.user_id || req.body?.user_id;
        const query = 'UPDATE users SET is_active = false WHERE user_id = $1';
        const rows = await pool.query(query, [user_id]);

        if (rows.rowCount === 0) {
            return res.status(404).json({ error: 'No user found with the provided user_id' });
        }

        res.json({ message: 'User deactivated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error: Something went wrong' });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const { username, password, full_name, email, bio } = req.body;

        const query = `
            UPDATE "users"
            SET 
                username = $1,
                password = $2,
                full_name = $3,
                email = $4,
                bio = $5
            WHERE user_id = $6
            RETURNING *;
        `;

        const values = [username, password, full_name, email, bio, user_id];
        const { rows } = await pool.query(query, values);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'No user found with the provided user_id' });
        }

        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error: Something went wrong' });
    }
};

// Create user
exports.createUser = async (req, res) => {
    try {
        const { username, password, full_name, email, bio, role_id, is_active } = req.body;

        // Check if the username already exists
        const checkUsernameQuery = 'SELECT * FROM "users" WHERE username = $1';
        const checkUsernameValues = [username];
        const usernameResult = await pool.query(checkUsernameQuery, checkUsernameValues);

        if (usernameResult.rows.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const query = 'INSERT INTO "users" (user_id, username, password_hash, full_name, email, bio, role_id, is_active) VALUES (nextval(\'user_user_id_sequence\'),$1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [username, password, full_name, email, bio, role_id, is_active];

        const { rows } = await pool.query(query, values);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User cannot be created' });
        }

        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error: Something went wrong' });
    }
};
