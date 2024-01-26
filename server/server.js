const express = require('express');
const userRoutes = require('./routes/userRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 30002

app.use(bodyParser.json());

// Enable CORS for all routes or specify origins as needed
app.use(cors());

// Use the user routes
app.use('/api', userRoutes);
app.use('/api',categoriesRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})