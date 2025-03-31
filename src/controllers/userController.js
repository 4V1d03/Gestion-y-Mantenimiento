const conexion = require('../db/db');

// Mostrar lista de usuarios
exports.index = (req, res) => {
    conexion.query("SELECT * FROM usuarios", (err, resultado) => {
        if (err) {
            console.log(err);
            return;
        }
        res.render("usuario/index", { usuarios: resultado });
    });
};

// Mostrar formulario para crear usuario
exports.crear = (req, res) => {
    res.render("usuario/crear");
};

// Guardar nuevo usuario
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

// Ver detalle del usuario
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

// Mostrar formulario de edición
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

// Actualizar datos
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

// Eliminar usuario
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
