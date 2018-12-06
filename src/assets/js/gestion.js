function gestion(){

  $('#notificacionFechaPasada').hide();

  var hoy = new Date();

  $('#fecha').val(hoy.getFullYear() + '-' + (hoy.getMonth()+1) + '-' +  hoy.getDate());

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
        hoy = hoy.getFullYear() + '-' + (hoy.getMonth()+1) + '-' +  hoy.getDate();

        $.each(citas, function(i, item) {
          
          idCita = item["cita_id"];

          horario = new Date('2018-01-01 '+ item["horario"])

          horario = formatAMPM(horario);
          usuario = item["nombreCompleto"];
          auto = item["automovil"];
          estado = item["estado"];
          descripcion = item["cita_descripcion"];
          fechaCompleta = item["cita_fecha"];
          
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
                      <button type="button" class="btn btn-default btn-sm" title="Rechazar cita" onClick="rechazar('+idCita+')" '+disabled+'>\
                        <span class="hidden-xs">Rechazar</span>  <i class="glyphicon glyphicon-remove text-danger"></i>\
                      </button>\
                    </div>';
          }
          if ( estado == '0' ){//cita rechazada
            acciones = '\
                      <div class="btn-group" role="group" aria-label="acciones">\
                      <button type="button" class="btn btn-default btn-sm" title="Aprobar cita" onClick="aceptar('+idCita+')" '+disabled+'>\
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
                      <button type="button" class="btn btn-default btn-sm" title="Aprobar cita" onClick="aceptar('+idCita+')" '+disabled+'>\
                        <span class="hidden-xs">Aprobar</span> <i class="glyphicon glyphicon-ok text-success"></i>\
                      </button>\
                      <button type="button" class="btn btn-default btn-sm" title="Ver detalles de la cita" onClick="detalles(\''+fechaCompleta+'\', \''+usuario+'\', \''+auto+'\', \''+descripcion+'\')" data-toggle="modal" data-target="#modalDetalles">\
                        <span class="hidden-xs">Detalles</span>  <i class="glyphicon glyphicon-list-alt text-info"></i>\
                      </button>\
                      <button type="button" class="btn btn-default btn-sm" title="Rechazar cita" onClick="rechazar('+idCita+')" '+disabled+'>\
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

function aceptar(idCita){

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

function rechazar(idCita){

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

function detalles(hora, solicitante, automovil, descripcion){
		
  $('#fechaDetalles').val(hora);
  $('#solicitanteDetalles').val(solicitante);
  $('#automovilDetalles').val(automovil);
  $('#descripcionDetalles').val(descripcion);

}