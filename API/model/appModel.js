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
    sql.query("SELECT c.cita_id, c.cita_usuario, c.cita_descripcion, hd.id AS horario_id, c.estado,\
     hd.horario, CONCAT(a.auto_marca, ' ', a.auto_modelo) AS automovil, CONCAT(u.nombre, ' ', u.apellidos) AS nombreCompleto\
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
    // metodo aceptar
Automovil.AceptarCitas = function (AceptarCitas, callback){
    sql.query("UPDATE dbo.cita\
    SET estado = '1' WHERE cita_id = ?;")
}
   // metodo rechazar
   Automovil.RechazarCitas = function (RechazarCitas, callback){
       sql.query("UPDATE dbo.cita\
       SET estado = '0' WHERE cita_id = ?;")
   }
module.exports = Automovil;