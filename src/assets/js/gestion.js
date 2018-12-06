telegramBot = "https://api.telegram.org/bot687253249:AAH2AbmOPleH4VhYxNpE2bDPePLk2zrOx0o/sendmessage?";

function gestion(){

  $('#notificacionFechaPasada').hide();

  var hoy = new Date();
  hoy = hoy.getFullYear() + '-' + ("0" + (hoy.getMonth()+1)).slice(-2) + '-' + ("0" + hoy.getDate()).slice(-2);

  $('#fecha').val(hoy);

  initTableCitas();

  cargarHorarios();
  
}

function initTableCitas(){
  $('#citas').DataTable({
    "ordering": false,
    language: {
      "decimal": "",
      "emptyTable": "No hay información",
      "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
      "infoEmpty": "Mostrando 0 de 0 registros",
      "infoFiltered": "(Filtrado de _MAX_ registro(s))",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "Mostrar _MENU_ registros",
      "loadingRecords": "Cargando...",
      "processing": "Procesando...",
      "search": "Buscar:",
      "zeroRecords": "Sin resultados encontrados",
      "paginate": {
          "first": "Primero",
          "last": "Último",
          "next": "Siguiente",
          "previous": "Anterior"
      }
    }
  });
}

function cargarHorarios(){

  var fechaSeleccionada = $('#fecha').val();
  $('#citas').DataTable().clear();

  $.ajax({
      type: 'GET',
      url: "http://localhost:3000/horarioDisponible/"+fechaSeleccionada,
      success:function(citas){
          
        var horario = "";
        var usuario = "";
        var auto = "";
        var acciones = "";
        var idCita = "";
        var estado = "";
        var descripcion = "";
        var disabled = "";
        var hoy = new Date();
        hoy = hoy.getFullYear() + '-' + ("0" + (hoy.getMonth()+1)).slice(-2) + '-' + ("0" + hoy.getDate()).slice(-2);

        $.each(citas, function(i, item) {
          
          idCita = item["cita_id"];

          horario = new Date('2018-01-01 '+ item["horario"])

          horario = formatAMPM(horario);
          usuario = item["nombreCompleto"];
          auto = item["automovil"];
          estado = item["estado"];
          descripcion = item["cita_descripcion"];
          fechaCompleta = item["cita_fecha"];
          telegramChat = item["telegram_chat_id"];
          fechaHora = item["cita_fechaHora"];
          
          if ( fechaSeleccionada < hoy ){
            disabled = "disabled";
            $('#notificacionFechaPasada').show("slow");
          }else{
            disabled = "";
            $('#notificacionFechaPasada').hide("slow");
          }

          if ( estado == '1' ){//cita aprobada
            acciones = '\
                      <div class="btn-group" role="group" aria-label="acciones">\
                      <button type="button" class="btn btn-success btn-sm cursor-default" title="Cita aprobada">\
                        <span class="hidden-xs">Abrobada</span> <i class="glyphicon glyphicon-ok"></i>\
                      </button>\
                      <button type="button" class="btn btn-default btn-sm" title="Ver detalles de la cita" onClick="detalles(\''+fechaCompleta+'\', \''+usuario+'\', \''+auto+'\', \''+descripcion+'\')" data-toggle="modal" data-target="#modalDetalles">\
                        <span class="hidden-xs">Detalles</span>  <i class="glyphicon glyphicon-list-alt text-info"></i>\
                      </button>\
                      <button type="button" class="btn btn-default btn-sm" title="Rechazar cita" onClick="rechazar('+idCita+', '+telegramChat+', \''+fechaHora+'\')" '+disabled+'>\
                        <span class="hidden-xs">Rechazar</span>  <i class="glyphicon glyphicon-remove text-danger"></i>\
                      </button>\
                    </div>';
          }
          if ( estado == '0' ){//cita rechazada
            acciones = '\
                      <div class="btn-group" role="group" aria-label="acciones">\
                      <button type="button" class="btn btn-default btn-sm" title="Aprobar cita" onClick="aceptar('+idCita+', '+telegramChat+', \''+fechaHora+'\')" '+disabled+'>\
                        <span class="hidden-xs">Aprobar</span> <i class="glyphicon glyphicon-ok text-success"></i>\
                      </button>\
                      <button type="button" class="btn btn-default btn-sm" title="Ver detalles de la cita" onClick="detalles(\''+fechaCompleta+'\', \''+usuario+'\', \''+auto+'\', \''+descripcion+'\')" data-toggle="modal" data-target="#modalDetalles"">\
                        <span class="hidden-xs">Detalles</span>  <i class="glyphicon glyphicon-list-alt text-info"></i>\
                      </button>\
                      <button type="button" class="btn btn-danger btn-sm cursor-default" title="Cita rechazada">\
                        <span class="hidden-xs">Rechazada</span>  <i class="glyphicon glyphicon-remove"></i>\
                      </button>\
                    </div>';
          }
          if ( estado == '2' ){//cita pendiente
            acciones = '\
                      <div class="btn-group" role="group" aria-label="acciones">\
                      <button type="button" class="btn btn-default btn-sm" title="Aprobar cita" onClick="aceptar('+idCita+', '+telegramChat+', \''+fechaHora+'\')" '+disabled+'>\
                        <span class="hidden-xs">Aprobar</span> <i class="glyphicon glyphicon-ok text-success"></i>\
                      </button>\
                      <button type="button" class="btn btn-default btn-sm" title="Ver detalles de la cita" onClick="detalles(\''+fechaCompleta+'\', \''+usuario+'\', \''+auto+'\', \''+descripcion+'\')" data-toggle="modal" data-target="#modalDetalles">\
                        <span class="hidden-xs">Detalles</span>  <i class="glyphicon glyphicon-list-alt text-info"></i>\
                      </button>\
                      <button type="button" class="btn btn-default btn-sm" title="Rechazar cita" onClick="rechazar('+idCita+', '+telegramChat+', \''+fechaHora+'\')" '+disabled+'>\
                        <span class="hidden-xs">Rechazar</span>  <i class="glyphicon glyphicon-remove text-danger"></i>\
                      </button>\
                    </div>';
          }
          if ( estado == null ){//no hay cita
            acciones = "<span class='label label-default available'>Disponible</span>";
          }

          $('#citas').DataTable().row.add( [ horario, usuario, auto, acciones] ).draw();

        });

        $('#citas > tbody > tr > td').addClass('text-center');
        //$('#citas > tbody > tr > td:nth-child(2)').addClass('hidden-xs');
        $('#citas > tbody > tr > td:nth-child(3)').addClass('hidden-xs');

      }
  });
}

function aceptar(idCita, telegramChat, fechaHora){

  swal({
    title: '¿Está seguro(a)?',
    text: 'Que desea aprobar la cita seleccionada',
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#5cb85c',
    confirmButtonText: "Sí, aceptar",
    cancelButtonText: "No, cancelar",
  }).then(function(result) {
    
    if ( result.value ){
      $.ajax({
        type: 'GET',
        url: "http://localhost:3000/citasAceptar/"+idCita,
        success:function(resultado){
          
          cargarHorarios();
          const toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000
          });
          
          toast({
            type: 'success',
            title: 'La cita ha sido aprobada correctamente'
          })
          
          notificacionTelegram(1, telegramChat, fechaHora);

        },
        error:function(resultado){
          swal({
            title: 'Error',
            text: 'Hubo un problema para aprobar la cita, comuníquese con el encargado del sistema.',
            type: 'error',
            confirmButtonColor: '#5cb85c',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
    
  });	

}

function rechazar(idCita, telegramChat, fechaHora){
  
  swal({
    title: '¿Está seguro(a)?',
    text: 'Que desea rechazar la cita seleccionada',
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#d9534f',
    confirmButtonText: "Sí, rechazar",
    cancelButtonText: "No, cancelar",
  }).then(function(result) {
    
    if ( result.value ){
      $.ajax({
        type: 'GET',
        url: "http://localhost:3000/citasRechazar/"+idCita,
        success:function(resultado){
          
          cargarHorarios();
          const toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000
          });
          
          toast({
            type: 'success',
            title: 'La cita ha sido rechazada correctamente'
          })

          notificacionTelegram(0, telegramChat, fechaHora);

        },
        error:function(resultado){
          swal({
            title: 'Error',
            text: 'Hubo un problema para rechazar la cita, comuníquese con el encargado del sistema.',
            type: 'error',
            confirmButtonColor: '#5cb85c',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
    
  });	

}

function notificacionTelegram(estadoSolicitud, telegramChat, fechaHora){

  if (estadoSolicitud){
    var telegramMensaje = "Taller Billy le informa que su cita del día "+fechaHora+" ha sido aprobada.";
  }else{
    var telegramMensaje = "Taller Billy le informa que su cita del día "+fechaHora+" ha sido rechazada, por favor inténtelo de nuevo.";
  }

  $.ajax({
    type: 'GET',
    url: telegramBot+'chat_id='+telegramChat+'&text='+telegramMensaje,
    success:function(resultado){
      
      setTimeout(function(){
        const toast = swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000
        });
        
        toast({
          type: 'success',
          title: 'Cliente notificado por Telegram'
        })
      }, 4000);

    },
    error:function(resultado){
      
      const toast = swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000
      });
      
      toast({
        type: 'error',
        title: 'Hubo un problema para notificar al cliente por telegram'
      })

    }
  });

}

function detalles(hora, solicitante, automovil, descripcion){
		
  $('#fechaDetalles').val(hora);
  $('#solicitanteDetalles').val(solicitante);
  $('#automovilDetalles').val(automovil);
  $('#descripcionDetalles').val(descripcion);

}