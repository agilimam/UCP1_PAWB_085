const express = require("express");
const router = express.Router();
const controllerPupuk = require("../controllers/controller-pupuk");

// Route for creating new pupuk
router.post("/", controllerPupuk.createPupuk);

// Route to display all pupuk
router.get("/", controllerPupuk.getAllPupuk);


// Route for updating pupuk
router.post("/update/:id", controllerPupuk.updatePupuk);

// Route for deleting pupuk
router.get("/delete/:id", controllerPupuk.deletePupuk);

module.exports = router;
