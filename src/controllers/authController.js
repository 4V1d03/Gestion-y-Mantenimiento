const conexion = require('../db/db.js');

// Mostrar la vista de login
const loginPage = (req, res) => {
    res.render('login/login'); 
};

// Manejar el login
const login = (req, res) => {
    const { email, password } = req.body;

    conexion.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error en la base de datos');
        }

        if (results.length === 0) {
            return res.render('login/login', { error: 'Correo o contraseña incorrectos' });
        }

        const user = results[0];

        
        if (password === user.contrasenia) {
            req.session.user = user;

            switch (user.rol) {
                case 'admin':
                    return res.redirect('/dashboard');
                case 'tecnico':
                    return res.redirect('/dashboardtecnico');
                case 'usuario':
                    return res.redirect('/dashboardusuario');
                default:
                    return res.redirect('/');
            }
        } else {
            return res.render('login/login', { error: 'Correo o contraseña incorrectos' });
        }
    });
};

// Dashboard para ADMIN
const dashboard = (req, res) => {
    if (!req.session.user || req.session.user.rol !== 'admin') {
        return res.redirect('/');
    }
    res.render('login/dashboard', { user: req.session.user });
};

// Dashboard para TECNICO
const dashboardTecnico = (req, res) => {
    if (!req.session.user || req.session.user.rol !== 'tecnico') {
        return res.redirect('/');
    }
    res.render('login/dashboardTechnical', { user: req.session.user });
};

// Dashboard para USUARIO
const dashboardUsuario = (req, res) => {
    if (!req.session.user || req.session.user.rol !== 'usuario') {
        return res.redirect('/');
    }
    res.render('login/dashboardUser', { user: req.session.user });
};

// Cerrar sesion
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/');
    });
};

module.exports = { loginPage, login, dashboard, dashboardTecnico, dashboardUsuario, logout };
