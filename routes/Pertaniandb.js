const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Data Array untuk menyimpan sementara
let pupukArray = [];
let bibitArray = [];

// ---------------- CRUD untuk Pupuk ---------------- //
// GET: Tampilkan data pupuk (Array + Database)
router.get("/pupuk", (req, res) => {
    db.query("SELECT * FROM pertanian WHERE Jenis = 'Pupuk'", (err, result) => {
        if (err) {
            console.log(err);
        }
        // Kirimkan data tambahan, termasuk `title`
        res.render("pupuk", { contacts: result, title: "Pupuk" });
    });
});


// POST: Tambahkan pupuk (Array + Database)
router.post("/pupuk", (req, res) => {
    const { Nama, Jenis, Harga } = req.body;

    // Validasi Input
    if (!Nama || !Jenis || !Harga) {
        return res.status(400).send("Semua field harus diisi!");
    }

    // Tambah ke Array
    pupukArray.push({ Nama, Jenis, Harga });

    // Tambah ke Database
    db.query(
        "INSERT INTO pupuk (Nama, Jenis, Harga) VALUES (?, ?, ?)",
        [Nama, Jenis, Harga],
        (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error saving data to database.");
            }
            res.redirect("/pupuk");
        }
    );
});

// ---------------- CRUD untuk Bibit ---------------- //
// GET: Tampilkan data bibit (Array + Database)
router.get("/bibit", (req, res) => {
    db.query("SELECT * FROM pertanian WHERE Jenis = 'Bibit'", (err, result) => {
        if (err) {
            console.log(err);
        }
        // Kirimkan data tambahan, termasuk `title`
        res.render("bibit", { contacts: result, title: "Bibit" });
    });
});

// POST: Tambahkan bibit (Array + Database)
router.post("/bibit", (req, res) => {
    const { Nama, Jenis, Harga } = req.body;

    // Validasi Input
    if (!Nama || !Jenis || !Harga) {
        return res.status(400).send("Semua field harus diisi!");
    }

    // Tambah ke Array
    bibitArray.push({ Nama, Jenis, Harga });

    // Tambah ke Database
    db.query(
        "INSERT INTO bibit (Nama, Jenis, Harga) VALUES (?, ?, ?)",
        [Nama, Jenis, Harga],
        (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error saving data to database.");
            }
            res.redirect("/bibit");
        }
    );
});

module.exports = router;
