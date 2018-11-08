function cargarAutos(usuario){

  $('#carro').empty();

  $.ajax({
      type: 'GET',
      url: "http://localhost:3000/auto/"+usuario,
      success:function(auto){
        
        var marca = "";

        if ( auto.length == 0 ){
          $('#carro').append('<option value="" selected disabled>No ha registrado automóviles</option>');
        }else{

          for (i = 0, len = auto.length; i < len; i++) {
            
            marca = auto[i]["auto_marca"] + ' ' + auto[i]["auto_modelo"];

            $('#carro').append('<option value="'+auto[i]["auto_placa"]+'">'+marca+'</option>');
            
          }

        }
      }
  });
}

function cargarHorarios(fecha){

  $('#horario').empty();

  $.ajax({
      type: 'get',
      url: 'http://localhost:3000/citas/'+fecha,
      success: function(horasDisponibles) {

        var idCita = "";
        var horaCita = "";

        if ( horasDisponibles.length == 0 ){
          $('#horario').append('<option value="" disabled>No hay citas disponibles para el día seleccionado</option>');
        }else{
          
          for (i = 0, len = horasDisponibles.length; i < len; i++) {
            
            $('#horario').append('<option value="'+idCita+'">'+horaCita+'</option>');
             
          }

        }

      }
    })

}

function citas(){

  //On change de calendario
  $('#datetimepicker1').on('dp.change', function(event) {
    var fechaSeleccionada = new Date(event.date); 
    fechaSeleccionada = fechaSeleccionada.getFullYear() + 1 + '-' + fechaSeleccionada.getMonth() + '-' +  fechaSeleccionada.getDay();
    console.log(fechaSeleccionada);

    //cargarHorarios(fechaSeleccionada);
    
  });

  var today = new Date();
  var dayMin = new Date().setDate(today.getDate()+2);//Las citas se pueden reservar mínimo 48 horas después del día actual
  var dayMax = new Date().setDate(today.getDate()+15);//Días disponibles para citas a futuro

  today = today.getFullYear() + 1 + '-' + today.getMonth() + '-' +  today.getDay();
  
  //Inicialización de calendario
  $('#datetimepicker1').datetimepicker({
    locale: 'en',
    inline: true,
    daysOfWeekDisabled: [0, 6],
    minDate: dayMin,
    maxDate: dayMax,
    format: 'L'
  });

  cargarAutos(1);

}