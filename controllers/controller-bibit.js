const mysql = require("mysql");
const dbdatabase = require("../database/db");
const connection = mysql.createConnection(dbdatabase);


// Koneksi ke database
connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
        return;
    }
    console.log("Connected to the database!");
});

// Create a new pupuk
exports.createBibit = (req, res) => {
    const { Nama, Jenis, Harga } = req.body;
    const query = "INSERT INTO bibit (Nama, Jenis, Harga) VALUES (?, ?, ?)";
    connection.query(query, [Nama, Jenis, Harga], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err.message);
            res.status(500).send("Error inserting data");
        } else {
            console.log("Data successfully added:", result);
            res.redirect("/bibit");
        }
    });
};


// controller-pupuk.js
exports.getAllBibit = (req, res) => {
    const query = "SELECT * FROM bibit";
    connection.query(query, (err, result) => {
        if (err) {
            console.error("Error fetching data:", err.message);
            res.status(500).send("Error fetching data");
        } else {
            // Pass result ke view
            res.render("bibit", { data: result });  // Pastikan 'data' didefinisikan di sini
        }
    });
};

exports.updateBibit = (req, res) => {
    const { Nama, Jenis, Harga } = req.body;
    const { id } = req.params;  // Mengambil id dari params
    const query = "UPDATE bibit SET Nama = ?, Jenis = ?, Harga = ? WHERE id = ?";
    connection.query(query, [Nama, Jenis, Harga, id], (err) => {
        if (err) {
            console.error("Error updating data:", err.message);
            res.status(500).send("Error updating data");
        } else {
            res.redirect("/bibit");
        }
    });
};


// Delete pupuk
exports.deleteBibit = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM bibit WHERE id = ?";
    connection.query(query, [id], (err) => {
        if (err) {
            console.error("Error deleting data:", err.message);
            res.status(500).send("Error deleting data");
        } else {
            res.redirect("/bibit");
        }
    });
};
