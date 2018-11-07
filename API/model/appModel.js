'use strict';

var sql = require('./db');

var Automovil = function(){
    // this.auto_placa = automovil.auto_placa,
    // this.auto_marca = automovil.auto_marca
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
    sql.query("Select * from auto where auto_usuario = ? ", usuario, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else{
            callback(null, res);
        }
    });
};

module.exports = Automovil;