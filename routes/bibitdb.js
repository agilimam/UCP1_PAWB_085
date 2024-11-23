const express = require("express");
const router = express.Router();
const controllerBibit = require("../controllers/controller-bibit");  // Pastikan path ini benar

// Route for creating new bibit
router.post("/", controllerBibit.createBibit);  // Pastikan controllerBibit.createBibit ada

// Route to display all bibit
router.get("/", controllerBibit.getAllBibit);

// Route for updating bibit
router.post("/update/:id", controllerBibit.updateBibit);

// Route for deleting bibit
router.get("/delete/:id", controllerBibit.deleteBibit);

module.exports = router;
