const msql = require('mysql')
require('dotenv').config();

const connection = msql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

});

connection.connect((error) => {
    if (error) {
        console.error('error connecting ' + error.stack);
        return;
    }
    console.log('Berhasil Melakukan Koneksi, Brow!');
});


module.exports = connection;