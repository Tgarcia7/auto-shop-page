telegramBot = "https://api.telegram.org/bot687253249:AAH2AbmOPleH4VhYxNpE2bDPePLk2zrOx0o/sendmessage?";
telegramChatBilly = 685590582;

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

  var usuario = getUrlParameter("uid");

  if ( usuario !== undefined ){
    $('#usuario').val(usuario);
  }else{
    $('#usuario').val(1);
    usuario = 1;
  }

  cargarNombre(usuario);
  cargarAutos(usuario);
  cargarHorarios();

  //On change de calendario
  $('#datetimepicker1').on('dp.change', function(event) {
    cargarHorarios();  
  });

}

function cargarAutos(usuario){

  $('#carro').empty();

  $.ajax({
      type: 'GET',
      dataType: 'json',
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

            $('#horario').append('<option value="'+horasDisponibles[i]["horario"]+'">'+iFecha+'</option>');
             
          }

        }

      }
    })

}

function guardarCita(){

  var auto = $('#carro').val();
  var usuario = $('#usuario').val();
  var descripcion = $('#descripcion').val();
  var fecha = new Date($('#datetimepicker1').data('DateTimePicker').date());//Obtener fecha seleccionada
  fechaHora = fecha.getDate() + '-' + (fecha.getMonth()+1) + '-' + fecha.getFullYear() + ' a las ' + $('#horario option:selected').text();
  fecha = fecha.getFullYear() + '-' + (fecha.getMonth()+1) + '-' +  fecha.getDate() + ' ' + $('#horario').val();

  var form = $("#formCita");
  form.validate();
    
  if (form.valid()) {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3000/citas",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
        "Postman-Token": "de52df68-397b-417c-8d0f-c4abad952f3d"
      },
      "processData": false,
      "data": '{"usuario":'+usuario+',"carro":'+auto+',"descripcion":"'+descripcion+'", "fecha":"'+fecha+'"}'
    }

    $.ajax(settings).done(function (response) {
      console.log(response);
      
      cargarHorarios();
      $('#descripcion').val('');

      swal({
        title: 'Listo',
        text: "La cita ha sido solicitada con éxito",
        type: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      });

      notificacionTelegram(telegramChatBilly, fechaHora);

    });
  }  

}

function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
  }
}

function cargarNombre(usuarioId){
  $.ajax({
    type: 'GET',
    url: "http://localhost:3000/usuario/"+usuarioId,
    success:function(usuario){
      var nombre = usuario[0]["nombreCompleto"];

      $('#usuarioNombre').text(nombre);
          
    } 
  });
}

function guardarAuto(){

  var placa = $('#placa').val();
  var usuario = $('#usuario').val();
  var marca = $('#marca').val();
  var modelo = $('#modelo').val();

  var form = $("#formAuto");
  form.validate();
    
  if (form.valid()) {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3000/autos",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
        "Postman-Token": "de52df68-397b-417c-8d0f-c4abad952f3d"
      },
      "processData": false,
      "data": '{"placa":'+placa+',"usuario":'+usuario+',"marca":"'+marca+'", "modelo":"'+modelo+'"}'
    }

    $.ajax(settings).done(function (response) {
      console.log(response);
      
      cargarAutos(usuario);

      $('#modalAgregarAuto').modal('hide');

      const toast = swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000
      });
      
      toast({
        type: 'success',
        title: 'El auto ha sido agregado con éxito'
      })

      $('#placa').val("");
      $('#marca').val("");
      $('#modelo').val("");

    });
  }  

}

function notificacionTelegram(telegramChat, fechaHora){

  var usuarioNombre = $('#usuarioNombre').text();
  var telegramMensaje = "Billy, ha recibido una solicitud de cita para el día "+fechaHora+" departe de "+usuarioNombre+".";

  $.ajax({
    type: 'GET',
    url: telegramBot+'chat_id='+telegramChat+'&text='+telegramMensaje,
    success:function(resultado){
      
      console.log("Notificación enviada");

    },
    error:function(resultado){
      
      console.log("Hubo un problema al enviar la notificación");

    }
  });

}