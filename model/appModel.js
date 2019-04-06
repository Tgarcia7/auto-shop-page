'use strict'
var sql = require('./db')
var modelCitas = () => {}

modelCitas.listarTodos = (callback) => {
    let queryStr = `SELECT * 
                    FROM auto`

    sql.query(queryStr, (err, res) => {

        if(err) {
            console.log("error: ", err.message);
            callback(err)
        }
        else{
          console.log('auto : ', res)
          callback(null, res)
        }
    })
}

modelCitas.listarPorUsuario = (usuario, callback) => {
    let queryStr = `SELECT *
                    FROM auto
                    WHERE auto_usuario = ?
                    ORDER BY auto_marca, auto_modelo;`

    sql.query(queryStr, usuario, (err, res) => {
        if(err) {
            console.log("error: ", err.message)
            callback(err, null)
        }
        else{
            callback(null, res)
        }
    })
}

modelCitas.listarPorFecha = (fecha, callback) => {
    let queryStr = `SELECT hd.*
                    FROM citas c
                    RIGHT JOIN horario_disponible hd
                        ON TIME(cita_fecha) = hd.horario
                        AND DATE(cita_fecha) = ?
                    WHERE c.cita_id IS NULL
                    AND hd.estado = '1'
                    ORDER BY horario;`
    
    sql.query(queryStr, fecha, (err, res) => {
        if(err) {
            console.log("error: ", err.message)
            callback(err, null)
        }
        else{
            callback(null, res)
        }
    })
}

modelCitas.HorarioDisponible_Ocupado = (horario_disponible_Ocupado, callback) => {
    let queryStr = `SELECT c.cita_id, c.cita_usuario, c.cita_descripcion, 
                    DATE_FORMAT(c.cita_fecha, '%e-%m-%Y, %h:%i %p') AS cita_fecha , hd.id AS horario_id, c.estado,
                    hd.horario, CONCAT(a.auto_marca, ' ', a.auto_modelo) AS automovil, 
                    CONCAT(u.nombre, ' ', u.apellidos) AS nombreCompleto, u.telegram_chat_id,
                    DATE_FORMAT(c.cita_fecha, '%d-%m-%Y a las %h:%i %p') AS cita_fechaHora
                    FROM citas c
                    RIGHT JOIN horario_disponible hd
                        ON TIME(cita_fecha) = hd.horario
                        AND DATE(cita_fecha) = ?
                    LEFT JOIN auto a
                        ON c.cita_placa = a.auto_placa
                    LEFT JOIN usuario u
                        ON c.cita_usuario = u.id
                    WHERE hd.estado = '1'
                    ORDER BY horario;`
    
    sql.query(queryStr, horario_disponible_Ocupado, (err, res) => {             
        if(err) {
            console.log("error: ", err.message)
            callback(err, null)
        }
        else{
            callback(null, res)
        }
    });
}

modelCitas.AceptarCitas = (idCita, callback) => {
    let queryStr = `UPDATE dbo.citas
                    SET estado = '1' 
                    WHERE cita_id = ?;`
    
    sql.query(queryStr, idCita, (err, res) => {             
        if(err) {
            console.log("error: ", err.message)
            callback(err, null)
        }
        else{
            callback(null, res)
        }
    });
}
   
modelCitas.RechazarCitas = (idCita, callback) => {
    let queryStr = `UPDATE dbo.citas
                    SET estado = '0' 
                    WHERE cita_id = ?;`

    sql.query(queryStr, idCita, (err, res) => {             
        if(err) {
            console.log("error: ", err.message)
            callback(err, null)
        }
        else{
            callback(null, res)
        }
    })
}

modelCitas.nombreUsuario = (idUsuario, callback) => {   
    let queryStr = `SELECT CONCAT(nombre, ' ', apellidos) AS nombreCompleto
                    FROM usuario
                    WHERE id = ?;`
    
    sql.query(queryStr, idUsuario, (err, res) => {      
        if(err) {
            console.log("error: ", err.message)
            callback(err, null)
        }
        else{
            callback(null, res)
        }
    });
}

modelCitas.agregarCita = (req, callback) => {   
    let queryStr = `INSERT INTO citas (cita_usuario, cita_placa, cita_descripcion, cita_fecha)
                    VALUES(?,?,?,?)`
    let values = [req.body.usuario, req.body.carro, req.body.descripcion, req.body.fecha]
    
    sql.query(queryStr, values, (err, results, fields) => {
        if (err) {
            console.log("error: ", err.message);
            callback(err, null)
        }
        else{
            callback(null, results)
        }
    });

}

modelCitas.agregarAuto = (req, callback) => {   
    let queryStr = `INSERT INTO auto (auto_placa, auto_usuario, auto_marca, auto_modelo)
                    VALUES(?,?,?,?)`
    let values = [req.body.placa, req.body.usuario, req.body.marca, req.body.modelo]
    
    sql.query(queryStr, values, (err, results, fields) => {
        if (err) {
            console.log("error: ", err.message);
            callback(err, null)
        }else{
            callback(null, results)
        }
    })
}

module.exports = modelCitas