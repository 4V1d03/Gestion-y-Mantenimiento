const express = require("express");
const router = express.Router();
const equiController = require("../controllers/equiController");

router.get("/", equiController.index);

router.get("/crear", equiController.crear);

router.post("/save", equiController.save);

router.get("/ver/:id", equiController.ver);

router.get("/editar/:id", equiController.editar);

router.post("/update", equiController.update);

router.post("/delete", equiController.delete);

module.exports = router;
