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

  //$('#carro').empty();
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

        $.each(citas, function(i, item) {
          
          idCita = item["cita_id"];

          horario = new Date('2018-01-01 '+ item["horario"])

          horario = formatAMPM(horario);
          usuario = item["nombreCompleto"];
          auto = item["automovil"];

          if ( idCita !== null ){
            acciones = '\
                      <div class="btn-group" role="group" aria-label="acciones">\
                      <button type="button" class="btn btn-success btn-sm" title="Aceptar cita" onClick="aceptar('+idCita+')">\
                        <span class="hidden-xs">Aceptar</span> <i class="glyphicon glyphicon-ok"></i>\
                      </button>\
                      <button type="button" class="btn btn-default btn-sm" title="Ver detalles de la cita" onClick="detalles('+idCita+')">\
                        <span class="hidden-xs">Detalles</span>  <i class="glyphicon glyphicon-list-alt"></i>\
                      </button>\
                      <button type="button" class="btn btn-danger btn-sm" title="Rechazar cita" onClick="rechazar('+idCita+')">\
                        <span class="hidden-xs">Rechazar</span>  <i class="glyphicon glyphicon-remove"></i>\
                      </button>\
                    </div>';
          }else{
            acciones = "";
          }

          $('#citas').DataTable().row.add( [ horario, usuario, auto, acciones] ).draw();

        });

        $('#citas > tbody > tr > td').addClass('text-center');

      }
  });
}