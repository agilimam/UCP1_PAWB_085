
const express = require("express");
const bodyParser = require("body-parser");
const routesbibit = require("./routes/bibitdb");  // Periksa apakah jalur file benar
const routespupuk = require("./routes/pupukdb");  // Periksa apakah jalur file benar
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");


// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// View engine setup

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use("/bibit", routesbibit);  // Routes for bibit
app.use("/pupuk", routespupuk);  // Routes for pupuk

// Home route
app.get("/", (req, res) => {
    res.render("index", { title: "Halaman Utama Pertanian" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
