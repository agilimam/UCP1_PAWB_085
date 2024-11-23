const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Get All Bibit
router.get('/', (req, res) => {
    db.query('SELECT * FROM bibit', (err, results) => {
        if (err) throw err;
        res.render('bibit', { data: results });
    });
});

// Add Bibit
router.post('/add', (req, res) => {
    const { Nama, Jenis, Harga } = req.body;
    db.query('INSERT INTO bibit (Nama, Jenis, Harga) VALUES (?, ?, ?)', [Nama, Jenis, Harga], (err) => {
        if (err) throw err;
        res.redirect('/bibit');
    });
});


// Delete Bibit
router.get('/delete/:id', (req, res) => {
    db.query('DELETE FROM bibit WHERE id = ?', [req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/bibit');
    });
});

router.post('/update/:id', (req, res) => {
    const { Nama, Jenis, Harga } = req.body;
    const { id } = req.params;

    console.log(`Updating Bibit: id=${id}, Nama=${Nama}, Jenis=${Jenis}, Harga=${Harga}`);

    db.query(
        'UPDATE bibit SET Nama = ?, Jenis = ?, Harga = ? WHERE id = ?',
        [Nama, Jenis, Harga, id],
        (err, result) => {
            if (err) {
                console.error("Error during update:", err.message);
                res.status(500).send('Error updating data');
                return;
            }
            console.log("Update successful:", result);
            res.redirect('/bibit');
        }
    );
});

module.exports = router;
