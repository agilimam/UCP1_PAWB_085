const express = require("express");
const router = express.Router();
const db = require("../database/db");


// Get All Pupuk
router.get('/', (req, res) => {
    db.query('SELECT * FROM pupuk', (err, results) => {
        if (err) throw err;
        res.render('pupuk', { data: results });
    });
});

// Add Pupuk
router.post('/add', (req, res) => {
    const { Nama, Jenis, Harga } = req.body;
    db.query('INSERT INTO pupuk (Nama, Jenis, Harga) VALUES (?, ?, ?)', [Nama, Jenis, Harga], (err) => {
        if (err) throw err;
        res.redirect('/pupuk');
    });
});

// Delete Pupuk
router.get('/delete/:id', (req, res) => {
    db.query('DELETE FROM pupuk WHERE id = ?', [req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/pupuk');
    });
});

router.post('/update/:id', (req, res) => {
    const { Nama, Jenis, Harga } = req.body;
    const { id } = req.params;

    console.log(`Updating Pupuk: id=${id}, Nama=${Nama}, Jenis=${Jenis}, Harga=${Harga}`);

    db.query(
        'UPDATE pupuk SET Nama = ?, Jenis = ?, Harga = ? WHERE id = ?',
        [Nama, Jenis, Harga, id],
        (err, result) => {
            if (err) {
                console.error("Error during update:", err.message);
                res.status(500).send('Error updating data');
                return;
            }
            console.log("Update successful:", result);
            res.redirect('/pupuk');
        }
    );
});

module.exports = router;