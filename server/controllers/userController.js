const pool = require('../database');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const is_active = req?.body.is_active;
    const get_allUsers = req?.body.get_allUsers;

    const auth = req.headers;
    if (auth.role_id !== '1') {
      return res.status(400).json({
        error: 'Not authorized',
        message: 'user is not authorized to get all user info.',
      });
    }
    // respond based on passed parameters
    let query = `SELECT * FROM "users"`;

    if (!get_allUsers) {
      query += `WHERE is_active = ${
        is_active === true || is_active === false ? $1 : 'true'
      }`;
    }
    const values =
      !get_allUsers && (is_active === true || is_active === false)
        ? [is_active]
        : [];

    // console.log('query', query);

    const { rows } = await pool.query(query, values);

    // console.log('rows', rows);

    // Check if any users were retrieved
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'Internal server error',
      message: ' Something went wrong while fetching all users.',
    });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    // Access user_id from params or body using optional chaining
    const user_id = req.params?.user_id || req.body?.user_id;

    // Validation for user_id
    if (!user_id) {
      return res.status(400).json({
        error: 'no user Id found',
        message: 'user Id can not be null in request body',
      });
    }

    const query = 'SELECT * FROM "users" WHERE user_id = $1';
    const { rows } = await pool.query(query, [user_id]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: 'No user found with the provided user_id' });
    }

    if (rows[0].is_active === false) {
      return res
        .status(404)
        .json({ deactivatedUser: true, error: 'User has been deactivated' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong while fetching users.',
    });
  }
};

// Delete user by ID (Deactivate user)
exports.deleteUserById = async (req, res) => {
  try {
    const user_id = req.params?.user_id || req.body?.user_id;
    const auth = req.headers;
    if (auth.role_id !== '1' || auth.user_id !== user_id) {
      return res.status(400).json({
        error: 'Not authorized',
        message: 'user is not authorized to deactivate the user.',
      });
    }

    const query = 'UPDATE users SET is_active = false WHERE user_id = $1';
    const rows = await pool.query(query, [user_id]);

    if (rows.rowCount === 0) {
      return res
        .status(404)
        .json({ error: 'No user found with the provided user_id' });
    }

    res.json({ message: 'User deactivated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong while deleting users.',
    });
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
      return res
        .status(404)
        .json({ error: 'No user found with the provided user_id' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong while updateing all users.',
    });
  }
};

// Create user
exports.createUser = async (req, res) => {
  try {
    const { username, password, full_name, email, bio, role_id, is_active } =
      req.body;

    // Check if the username already exists
    const checkUsernameQuery = 'SELECT * FROM "users" WHERE username = $1';
    const checkUsernameValues = [username];
    const usernameResult = await pool.query(
      checkUsernameQuery,
      checkUsernameValues
    );

    if (usernameResult.rows.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const query =
      'INSERT INTO "users" (user_id, username, password_hash, full_name, email, bio, role_id, is_active) VALUES (nextval(\'user_user_id_sequence\'),$1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [
      username,
      password,
      full_name,
      email,
      bio,
      role_id,
      is_active,
    ];

    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User cannot be created' });
    }

    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong while creating user.',
    });
  }
};

// Method to login a user
// Added by Zaheer for SR-02
exports.login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.status(400).json({
        message: 'Username and password are required.',
      });
    }

    const query = `SELECT * FROM "users" WHERE username = $1 AND password_hash = $2`;
    const values = [username, password];
    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'No user found with the provided username and password',
      });
    }

    if (rows[0].is_active === false) {
      return res
        .status(404)
        .json({ deactivatedUser: true, message: 'User has been deactivated' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong while loging the users.',
    });
  }
};
