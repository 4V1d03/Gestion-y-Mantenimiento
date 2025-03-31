const mysql = require("mysql");

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'toor',
    database: 'proyectoseminario',
    port: '3307'
});

conexion.connect((error)=>{
    if (error) {
        console.log("se presento un error: ", error); 
        return
    }
    console.log("conexion exitosa");
    
});

module.exports = conexion;