const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.index);

router.get("/crear", userController.crear);

router.post("/save", userController.save);

router.get("/ver/:id", userController.ver);

router.get("/editar/:id", userController.editar);

router.post("/update", userController.update);

router.post("/delete", userController.delete);

module.exports = router;
