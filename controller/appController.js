'use strict'
var Automovil = new require("../model/appModel");

exports.listarTodos = function(req, res){
    console.log("DEBU:", Automovil)
    Automovil.listarTodos(function(err, auto){
        console.log('controller');
        if(err)
            res.send(err);
            console.log('res', auto);
        res.json(auto);
    });
};

exports.listarPorUsuario = function(req, res) {
  Automovil.listarPorUsuario(req.params.usuario, function(err, auto) {
    if (err)
      res.send(err);
    res.json(auto);
  });
};

exports.citas = function(req, res){
  Automovil.listarPorFecha(req.params.fecha, function(err, auto) {
    if (err)
      res.send(err);
    res.json(auto);
  });
};

exports.HorarioDisponible_Ocupado = function(req, res){
  Automovil.HorarioDisponible_Ocupado(req.params.fecha, function(err, hor_disp) {
    if (err)
      res.send(err);
    res.json(hor_disp);
  });
};

//Método aceptar
exports.AceptarCitas = function(req, res){
  Automovil.AceptarCitas(req.params.idCita, function(err, aceptar){
    if(err)
    res.send(err);
    res.json(aceptar)
  });
};

//Método de rechazar
exports.RechazarCitas = function(req, res){
  Automovil.RechazarCitas(req.params.idCita, function(err, rechazar){
  if(err)
  res.send(err);
  res.json(rechazar)
  });
};

//Método para mostrar le nombre del usuario
exports.nombreUsuario = function(req, res){
  Automovil.nombreUsuario(req.params.idUsuario, function(err, user){
  if(err)
    res.send(err);
  res.json(user)
  });
};

exports.agregarCita = function(req, res) {
  Automovil.agregarCita(req, function(err, cita) {
    if (err) {res.send(err)}
    
    res.json(req.body);
  });
}

exports.agregarAuto = function(req, res) {
  Automovil.agregarAuto(req, function(err, cita) {
    if (err) {res.send(err)}
    
    res.json(req.body);
  });
}