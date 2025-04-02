const conexion = require('../db/db');


exports.index = (req, res) => {
    conexion.query("SELECT * FROM usuarios", (err, resultado) => {
        if (err) {
            console.log(err);
            return;
        }
        res.render("usuario/index", { usuarios: resultado });
    });
};

exports.crear = (req, res) => {
    res.render("usuario/crear");
};

exports.save = (req, res) => {
    const { nombre, email, contrasenia, rol, especialidad, telefono } = req.body;

    conexion.query("INSERT INTO usuarios SET ?", {
        nombre,
        email,
        contrasenia,
        rol,
        especialidad,
        telefono
    }, (err, resultado) => {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect("/usuarios");
    });
};

exports.ver = (req, res) => {
    const id = req.params.id;
    conexion.query("SELECT * FROM usuarios WHERE id = ?", [id], (err, resultado) => {
        if (err) {
            console.log(err);
            return;
        }
        res.render("usuario/ver", { usuario: resultado[0] });
    });
};

exports.editar = (req, res) => {
    const id = req.params.id;
    conexion.query("SELECT * FROM usuarios WHERE id = ?", [id], (err, resultado) => {
        if (err) {
            console.log(err);
            return;
        }
        res.render("usuario/editar", { usuario: resultado[0] });
    });
};

exports.update = (req, res) => {
    const id = req.body.id;
    const { nombre, email, contrasenia, rol, especialidad, telefono } = req.body;

    conexion.query("UPDATE usuarios SET ? WHERE id = ?", [{
        nombre,
        email,
        contrasenia,
        rol,
        especialidad,
        telefono
    }, id], (err, resultado) => {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect("/usuarios");
    });
};

exports.delete = (req, res) => {
    const id = req.body.id;

    conexion.query("DELETE FROM usuarios WHERE id = ?", [id], (err, resultado) => {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect("/usuarios");
    });
};
