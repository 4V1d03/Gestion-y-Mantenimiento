const express = require('express');
const authController = require('../controllers/authController.js');

const router = express.Router();


router.get('/', authController.loginPage);

router.post('/login', authController.login);

router.get('/dashboard', authController.dashboard);
router.get('/dashboardtecnico', authController.dashboardTecnico);
router.get('/dashboardusuario', authController.dashboardUsuario);

router.get('/logout', authController.logout);

module.exports = router;
