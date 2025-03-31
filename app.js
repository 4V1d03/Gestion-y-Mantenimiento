const express = require("express");
const session = require("express-session");
const path = require("path");

const authRoutes = require("./src/routes/authRoutes");  
const userRoutes = require("./src/routes/userRoutes");
const equiRoutes = require("./src/routes/equiRoutes");

const app = express();

app.set("views", path.join(__dirname, "src", "views"));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
    session({
        secret: 'mi_secreto',
        resave: false,
        saveUninitialized: true
    })
);

// Rutas
app.use("/", authRoutes);            // Login y autenticación
app.use("/usuarios", userRoutes);    // Módulo Usuario
app.use("/equipos", equiRoutes);     // Módulo Equipo

// Servidor
app.listen(5000, () => {
    console.log("Servidor local http://localhost:5000");
});
