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

function cargarHorarios(){

  var fecha = new Date($('#datetimepicker1').data('DateTimePicker').date());//Obtener fecha seleccionada
  fecha = fecha.getFullYear() + '-' + (fecha.getMonth()+1) + '-' +  fecha.getDate();

  $('#horario').empty();

  $.ajax({
      type: 'get',
      url: 'http://localhost:3000/citas/'+fecha,
      success: function(horasDisponibles) {

        if ( horasDisponibles.length == 0 ){
          $('#horario').append('<option value="" disabled>No hay citas disponibles para el día seleccionado</option>');
        }else{
          
          for (i = 0, len = horasDisponibles.length; i < len; i++) {
            
            iFecha = new Date('2018-01-01 '+horasDisponibles[i]["horario"]);//se le agrega una fecha para utilizar la conversión de formato
            iFecha = formatAMPM(iFecha); 

            $('#horario').append('<option value="'+horasDisponibles[i]["id"]+'">'+iFecha+'</option>');
             
          }

        }

      }
    })

}

function citas(){

  var hoy = new Date();
  var dayMin = new Date();
  var dayMax = new Date();

  dayMin.setDate(hoy.getDate()+2);//Las citas se pueden reservar mínimo 48 horas después del día actual
  dayMax.setDate(hoy.getDate()+15);//Días disponibles para citas a futuro
  
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
  cargarHorarios();

  //On change de calendario
  $('#datetimepicker1').on('dp.change', function(event) {
    cargarHorarios();  
  });

}