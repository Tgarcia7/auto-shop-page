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

  //Método para agregar autos
  app.route('/autos')
  .post(autoRouts.agregarAuto);

};