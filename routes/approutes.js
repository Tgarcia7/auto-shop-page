'use strict'
var appController = require('../controller/appController.js')

module.exports = (app) => {  
  
  app.route('/auto')
    .get(appController.listarTodos)
   
  app.route('/auto/:usuario')
    .get(appController.listarPorUsuario)

  app.route('/citas/:fecha')
    .get(appController.citas)

  app.route('/citas')
    .post(appController.agregarCita)

  app.route('/horarioDisponible/:fecha')
    .get(appController.HorarioDisponible_Ocupado)
  
  app.route('/citasAceptar/:idCita')
    .get(appController.AceptarCitas)

  app.route('/citasRechazar/:idCita')
    .get(appController.RechazarCitas)

  app.route('/usuario/:idUsuario')
    .get(appController.nombreUsuario)

  app.route('/autos')
    .post(appController.agregarAuto)

  app.get('*', (request, response) => {
    response.send('Ruta indefinida')
  })

}