'use strict';

var sql = require('./db');

var Automovil = function(){
    // this.auto_placa = automovil.auto_placa,
    // this.auto_marca = automovil.auto_marca
}
var citas = function(){
    // this.cita_fecha = citas.cita_fecha
}

Automovil.listarTodos = function (callback){
    sql.query("Select * from auto", function (err, res) {

        if(err) {
            console.log("error: ", err);
            callback(err);
        }
        else{
          console.log('auto : ', res);  

         callback(null, res);
        }
    });  
};

Automovil.listarPorUsuario = function (usuario, callback){
    sql.query("SELECT *\
                FROM auto\
                WHERE auto_usuario = ?\
                ORDER BY auto_marca, auto_modelo;", usuario, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else{
            callback(null, res);
        }
    });
};

Automovil.listarPorFecha = function (fecha, callback){
    sql.query("SELECT hd.*\
                FROM citas c\
                RIGHT JOIN horario_disponible hd\
                    ON TIME(cita_fecha) = hd.horario\
                    AND DATE(cita_fecha) = ?\
                WHERE c.cita_id IS NULL\
                AND hd.estado = '1'\
                ORDER BY horario;", fecha, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else{
            callback(null, res);
        }
    });
};

Automovil.HorarioDisponible_Ocupado = function (horario_disponible_Ocupado, callback){
    sql.query("SELECT c.cita_id, c.cita_usuario, c.cita_descripcion, DATE_FORMAT(c.cita_fecha, '%e-%m-%Y, %h:%i %p') AS cita_fecha , hd.id AS horario_id, c.estado,\
    hd.horario, CONCAT(a.auto_marca, ' ', a.auto_modelo) AS automovil, CONCAT(u.nombre, ' ', u.apellidos) AS nombreCompleto, u.telegram_chat_id,\
    DATE_FORMAT(c.cita_fecha, '%d-%m-%Y a las %h:%i %p') AS cita_fechaHora\
    FROM citas c\
    RIGHT JOIN horario_disponible hd\
        ON TIME(cita_fecha) = hd.horario\
        AND DATE(cita_fecha) = ?\
    LEFT JOIN auto a\
        ON c.cita_placa = a.auto_placa\
    LEFT JOIN usuario u\
        ON c.cita_usuario = u.id\
    WHERE hd.estado = '1'\
    ORDER BY horario;", horario_disponible_Ocupado, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else{
            callback(null, res);
        }
    });
};

//Método aceptar
Automovil.AceptarCitas = function (idCita, callback){
    sql.query("UPDATE dbo.citas\
    SET estado = '1' WHERE cita_id = ?;", idCita, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else{
            callback(null, res);
        }
    });
}
   
//Método rechazar
Automovil.RechazarCitas = function (idCita, callback){
    sql.query("UPDATE dbo.citas\
    SET estado = '0' WHERE cita_id = ?;", idCita, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else{
            callback(null, res);
        }
    });
}

//Método para mostrar el nombre del usuario
Automovil.nombreUsuario = function (idUsuario, callback){   
    sql.query("SELECT CONCAT(nombre, ' ', apellidos) AS nombreCompleto\
    FROM usuario\
    WHERE id = ?;", idUsuario, function (err, res) {      
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else{
            callback(null, res);
        }
    });
}

//Método para agregar citas
Automovil.agregarCita = function (req, callback){   
    
    let stmt = `INSERT INTO citas (cita_usuario, cita_placa, cita_descripcion, cita_fecha)
                VALUES(?,?,?,?)`;
    let values = [req.body.usuario, req.body.carro, req.body.descripcion, req.body.fecha];
    
    // execute the insert statment
    sql.query(stmt, values, (err, results, fields) => {
      if (err) {
        console.error(err.message);
        callback(err, null);
        }
        else{
            callback(null, results);
        }
    });

}

module.exports = Automovil;