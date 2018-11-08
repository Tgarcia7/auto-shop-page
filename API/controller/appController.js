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

  exports.agregarAuto = function(req, res) {
    
    res.json(req.body);
  };

 exports.citas = function(req, res){
  Automovil.listarPorFecha(req.params.fecha, function(err, auto) {
    if (err)
      res.send(err);
    res.json(auto);
  });

};
