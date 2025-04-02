const conexion = require('../db/db');

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
// exports.crear = (req, res) => {
//     res.render("equipo/crear");
// };
exports.crear = (req, res) => {
    conexion.query("SELECT id, nombre, email FROM usuarios", (err, resultado) => {
        if (err) {
            console.log(err);
            return;
        }
        res.render("equipo/crear", { usuarios: resultado });
    });
};

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

// exports.editar = (req, res) => {
//     const id = req.params.id;
//     conexion.query("SELECT * FROM equipos WHERE id = ?", [id], (err, resultado) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         res.render("equipo/editar", { equipo: resultado[0] });
//     });
// };

exports.editar = (req, res) => {
    const id = req.params.id;

    conexion.query("SELECT * FROM equipos WHERE id = ?", [id], (err, equipoResultado) => {
        if (err) {
            console.log(err);
            return;
        }

        conexion.query("SELECT id, nombre, email FROM usuarios", (err2, usuariosResultado) => {
            if (err2) {
                console.log(err2);
                return;
            }

            res.render("equipo/editar", {
                equipo: equipoResultado[0],
                usuarios: usuariosResultado
            });
        });
    });
};

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
