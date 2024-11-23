require('dotenv').config();  // Pastikan dotenv hanya dipanggil sekali
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const pupukRoutes = require('./routes/pupukdb.js');
const bibitRoutes = require('./routes/bibitdb.js');
const path = require('path');

// Membuat koneksi ke database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pertanian'
});

// Menghubungkan ke database
connection.connect((err) => {
    if (err) {
        console.log('Error connecting to the database: ', err);
        return;
    }
    console.log('Connected to the database!');
});


const app = express();

// Atur lokasi folder views
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes
app.use('/pupuk', pupukRoutes);
app.use('/bibit', bibitRoutes);

// Home
app.get('/', (req, res) => res.render('index'));

// Server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));


module.exports = connection;