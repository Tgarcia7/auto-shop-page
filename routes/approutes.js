'use strict';
var autoRouts = require('../controller/appController.js');

var sql = require('../model/db');//temporal para pruebas

module.exports = function(app) {  
  
  app.route('/auto')
    .get(autoRouts.listarTodos);
   
  app.route('/auto/:usuario')
    .get(autoRouts.listarPorUsuario);

  app.route('/citas/:fecha')
  .get(autoRouts.citas);

  app.route('/citas')
  .post(autoRouts.agregarCita);

  app.route('/horarioDisponible/:fecha')
  .get(autoRouts.HorarioDisponible_Ocupado);
  
  //Método aceptar
  app.route('/citasAceptar/:idCita')
  .get(autoRouts.AceptarCitas);

  //Método de rechazar
  app.route('/citasRechazar/:idCita')
  .get(autoRouts.RechazarCitas);

  //Método para mostrar el nombre del usuario
  app.route('/usuario/:idUsuario')
  .get(autoRouts.nombreUsuario);


  app.route('/autos')
  .post(function(req, res){

    let stmt = `INSERT INTO auto (auto_placa, auto_usuario, auto_marca, auto_modelo)
                VALUES(?,?,?,?)`;
    let values = [req.body.placa, req.body.usuario, req.body.marca, req.body.modelo];
    
    // execute the insert statment
    sql.query(stmt, values, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
    });

      res.json(req.body);
      return console.error("agregado");;
  });

};