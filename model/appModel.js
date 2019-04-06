"use strict"
var sql = require("./db")

var modelTaller = () => {}

modelTaller.listarTodos = callback => {
  let queryString = `SELECT * 
                    FROM auto;`

  sql.query(queryString, (err, res) => {
    if (err) {
      console.log("error: ", err.message)
      callback(err)
    } else {
      callback(null, res)
    }
  })
}

modelTaller.listarPorUsuario = (usuario, callback) => {
  let queryString = `SELECT *
                    FROM auto
                    WHERE auto_usuario = ?
                    ORDER BY auto_marca, auto_modelo`

  sql.query(queryString, usuario, (err, res) => {
    if (err) {
      console.log("error: ", err.message)
      callback(err, null)
    } else {
      callback(null, res)
    }
  })
}

modelTaller.listarPorFecha = (fecha, callback) => {
  let queryString = 
        `SELECT hd.*
        FROM citas c
        RIGHT JOIN horario_disponible hd
            ON TIME(cita_fecha) = hd.horario
            AND DATE(cita_fecha) = ?
        WHERE c.cita_id IS NULL
        AND hd.estado = '1'
        ORDER BY horario;`
  
  sql.query(queryString, fecha, (err, res) => {
      if (err) {
        console.log("error: ", err.message)
        callback(err, null)
      } else {
        callback(null, res)
      }
    }
  )
}

modelTaller.horarioDisponible = (fecha, callback) => {
  let queryString = 
      `SELECT c.cita_id, c.cita_usuario, c.cita_descripcion, DATE_FORMAT(c.cita_fecha, '%e-%m-%Y, %h:%i %p') AS cita_fecha , hd.id AS horario_id, c.estado,
      hd.horario, CONCAT(a.auto_marca, ' ', a.auto_modelo) AS automovil, CONCAT(u.nombre, ' ', u.apellidos) AS nombreCompleto, u.telegram_chat_id,
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

  sql.query(queryString, fecha, (err, res) => {
      if (err) {
        console.log("error: ", err)
        callback(err, null)
      } else {
        callback(null, res)
      }
    }
  )
}

modelTaller.aceptarCitas = (idCita, callback) => {
  let queryString = `UPDATE dbo.citas
                    SET estado = '1' WHERE cita_id = ?;`
  
  sql.query(queryString, idCita, (err, res) => {
      if (err) {
        console.log("error: ", err.message)
        callback(err, null)
      } else {
        callback(null, res)
      }
    }
  )
}

modelTaller.rechazarCitas = (idCita, callback) => {
  let queryString = `UPDATE dbo.citas
                    SET estado = '0' 
                    WHERE cita_id = ?;`
  
  sql.query(queryString, idCita, (err, res) => {
      if (err) {
        console.log("error: ", err.message);
        callback(err, null)
      } else {
        callback(null, res)
      }
    }
  )
}

modelTaller.nombreUsuario = (idUsuario, callback) => {
  let queryString = `SELECT CONCAT(nombre, ' ', apellidos) AS nombreCompleto
                    FROM usuario
                    WHERE id = ?;`

  sql.query(queryString, idUsuario, (err, res) => {
      if (err) {
        console.log("error: ", err.message)
        callback(err, null)
      } else {
        callback(null, res)
      }
    }
  )
}

modelTaller.agregarCita = (req, callback) => {
  let queryString = `INSERT INTO citas (cita_usuario, cita_placa, cita_descripcion, cita_fecha)
              VALUES(?,?,?,?)`
  let values = [
    req.body.usuario,
    req.body.carro,
    req.body.descripcion,
    req.body.fecha
  ]

  sql.query(queryString, values, (err, results, fields) => {
    if (err) {
      console.error(err.message)
      callback(err, null)
    } else {
      callback(null, results)
    }
  })
}

modelTaller.agregarAuto = (req, callback) => {
  let queryString = `INSERT INTO auto (auto_placa, auto_usuario, auto_marca, auto_modelo)
                    VALUES(?,?,?,?)`
  let values = [
    req.body.placa,
    req.body.usuario,
    req.body.marca,
    req.body.modelo
  ]

  sql.query(queryString, values, (err, results, fields) => {
    if (err) {
      console.error(err.message)
      callback(err, null)
    } else {
      callback(null, results)
    }
  })
}

module.exports = modelTaller