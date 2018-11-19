function gestion(){

  var hoy = new Date();

  $('#fecha').val(hoy.getFullYear() + '-' + (hoy.getMonth()+1) + '-' +  hoy.getDate());

  initTableCitas();

  cargarHorarios();
  
}

function initTableCitas(){
  $('#citas').DataTable({
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
        
        console.log(citas);
        //$('#citas').DataTable().row.add( [ 'Fiona White', 32, 'Edinburgh','sfa'] ).draw();

      }
  });
}