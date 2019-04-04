'use strict';
var autoRouts = require('../controller/appController.js');

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
  
  app.route('/citasAceptar/:idCita')
    .get(autoRouts.AceptarCitas);

  app.route('/citasRechazar/:idCita')
    .get(autoRouts.RechazarCitas);

  app.route('/usuario/:idUsuario')
    .get(autoRouts.nombreUsuario);

  app.route('/autos')
    .post(autoRouts.agregarAuto);

};