function gestion(){

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

        $.each(citas, function(i, item) {
          
          idCita = item["cita_id"];

          horario = new Date('2018-01-01 '+ item["horario"])

          horario = formatAMPM(horario);
          usuario = item["nombreCompleto"];
          auto = item["automovil"];
          estado = item["estado"];

          if ( estado == '1' ){//cita aprobada
            acciones = '\
                      <div class="btn-group" role="group" aria-label="acciones">\
                      <button type="button" class="btn btn-success btn-sm cursor-default">\
                        <span>Aprobada</span>\
                      </button>\
                      <button type="button" class="btn btn-default btn-sm" title="Ver detalles de la cita" onClick="detalles('+idCita+')">\
                        <span class="hidden-xs">Detalles</span>  <i class="glyphicon glyphicon-list-alt text-info"></i>\
                      </button>\
                      <button type="button" class="btn btn-default btn-sm" title="Rechazar cita" onClick="rechazar('+idCita+')">\
                        <span class="hidden-xs">Rechazar</span>  <i class="glyphicon glyphicon-remove text-danger"></i>\
                      </button>\
                    </div>';
          }
          if ( estado == '0' ){//cita rechazada
            acciones = '\
                      <div class="btn-group" role="group" aria-label="acciones">\
                      <button type="button" class="btn btn-default btn-sm" title="Aprobar cita" onClick="aceptar('+idCita+')">\
                        <span class="hidden-xs">Aprobar</span> <i class="glyphicon glyphicon-ok text-success"></i>\
                      </button>\
                      <button type="button" class="btn btn-default btn-sm" title="Ver detalles de la cita" onClick="detalles('+idCita+')">\
                        <span class="hidden-xs">Detalles</span>  <i class="glyphicon glyphicon-list-alt text-info"></i>\
                      </button>\
                      <button type="button" class="btn btn-danger btn-sm cursor-default">\
                        <span>Rechazada</span>\
                      </button>\
                    </div>';
          }
          if ( estado == '2' ){//cita pendiente
            acciones = '\
                      <div class="btn-group" role="group" aria-label="acciones">\
                      <button type="button" class="btn btn-default btn-sm" title="Aprobar cita" onClick="aceptar('+idCita+')">\
                        <span class="hidden-xs">Aprobar</span> <i class="glyphicon glyphicon-ok text-success"></i>\
                      </button>\
                      <button type="button" class="btn btn-default btn-sm" title="Ver detalles de la cita" onClick="detalles('+idCita+')">\
                        <span class="hidden-xs">Detalles</span>  <i class="glyphicon glyphicon-list-alt text-info"></i>\
                      </button>\
                      <button type="button" class="btn btn-default btn-sm" title="Rechazar cita" onClick="rechazar('+idCita+')">\
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

      }
  });
}

function aceptar(idCita){

  swal({
    title: 'Confirmación',
    text: '¿Desea aprobar la cita seleccionada?',
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#5cb85c',
    confirmButtonText: "Sí, aceptar",
    cancelButtonText: "No, cancelar",
  }).then(function(result) {
    
    if ( result.value ){
      $.ajax({
        type: 'GET',
        url: "http://localhost:3000/aceptarCita/"+idCita,
        success:function(resultado){
          swal({
            title: '¡Listo!',
            text: 'La cita ha sido aprobada correctamente.',
            type: 'success',
            confirmButtonColor: '#5cb85c',
            confirmButtonText: 'Aceptar',
          }).then(function() {
            cargarHorarios();  
          });
        },
        error:function(resultado){
          swal({
            title: 'Error',
            text: 'Hubo un problema para aprobar la cita, conmuníquese con el encargado del sistema.',
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
    title: 'Confirmación',
    text: '¿Desea rechazar la cita seleccionada?',
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#5cb85c',
    confirmButtonText: "Sí, rechazar",
    cancelButtonText: "No, cancelar",
  }).then(function(result) {
    
    if ( result.value ){
      $.ajax({
        type: 'GET',
        url: "http://localhost:3000/rechazarCita/"+idCita,
        success:function(resultado){
          swal({
            title: '¡Listo!',
            text: 'La cita ha sido rechazada correctamente.',
            type: 'success',
            confirmButtonColor: '#5cb85c',
            confirmButtonText: 'Aceptar',
          }).then(function() {
            cargarHorarios();  
          });
        },
        error:function(resultado){
          swal({
            title: 'Error',
            text: 'Hubo un problema para rechazar la cita, conmuníquese con el encargado del sistema.',
            type: 'error',
            confirmButtonColor: '#5cb85c',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
    
  });	

}

function detalles(idCita){
  $('#modalDetalles').modal('show'); 
}