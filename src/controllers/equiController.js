const conexion = require('../db/db');

// Mostrar todos los equipos
exports.index = (req, res) => {
    conexion.query("SELECT * FROM equipos", (err, resultado) => {
        if (err) {
            console.log(err);
            return;
        }
        res.render("equipo/index", { equipos: resultado });
    });
};

// Formulario para crear equipo
exports.crear = (req, res) => {
    res.render("equipo/crear");
};

// Guardar equipo
exports.save = (req, res) => {
    const { tipo, marca, modelo, numero_serie, estado, usuario_id } = req.body;

    conexion.query("INSERT INTO equipos SET ?", {
        tipo,
        marca,
        modelo,
        numero_serie,
        estado,
        usuario_id
    }, (err, resultado) => {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect("/equipos");
    });
};

// Ver equipo
exports.ver = (req, res) => {
    const id = req.params.id;
    conexion.query("SELECT * FROM equipos WHERE id = ?", [id], (err, resultado) => {
        if (err) {
            console.log(err);
            return;
        }
        res.render("equipo/ver", { equipo: resultado[0] });
    });
};

// Editar equipo
exports.editar = (req, res) => {
    const id = req.params.id;
    conexion.query("SELECT * FROM equipos WHERE id = ?", [id], (err, resultado) => {
        if (err) {
            console.log(err);
            return;
        }
        res.render("equipo/editar", { equipo: resultado[0] });
    });
};

// Actualizar equipo
exports.update = (req, res) => {
    const id = req.body.id;
    const { tipo, marca, modelo, numero_serie, estado, usuario_id } = req.body;

    conexion.query("UPDATE equipos SET ? WHERE id = ?", [{
        tipo,
        marca,
        modelo,
        numero_serie,
        estado,
        usuario_id
    }, id], (err, resultado) => {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect("/equipos");
    });
};

// Eliminar equipo
exports.delete = (req, res) => {
    const id = req.body.id;

    conexion.query("DELETE FROM equipos WHERE id = ?", [id], (err, resultado) => {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect("/equipos");
    });
};
