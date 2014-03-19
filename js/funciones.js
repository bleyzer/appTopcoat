

    var idUsuario = 0;
    var eliminarId = 0;


    var app = {
        /**
        * Se crea el objeto global de la aplicación.
        * @name initialize
        * @event 
        */
        initialize: function() {
            this.bindEvents();
        },
        /**
         * Función encargada de registrar los eventos que utilizara la aplicación.
         * @function
         */
        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        /**
         * Evento ejecutado por el ambiente phonegap indicando que todo esta cargado y listo para usarse.
         * @name onDeviceReady
         * @event
         */
        onDeviceReady: function() {
            app.receivedEvent('deviceready');
        },
        /**
         * Función que propaga y uestra en consola cuando todo la inicialización esta lista..
         * @function
         */
        receivedEvent: function(id) {
            console.log('Evento recibido: ' + id);
        }
    };






        function createDb(tx) {
            tx.executeSql("DROP TABLE IF EXISTS usuarios");
            tx.executeSql("CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, nombre VARCHAR( 80 )  NOT NULL, apellidos VARCHAR( 80 )  NOT NULL);");
            //tx.executeSql("INSERT INTO [perfil] ([experiencia], [ubicacion], [claves], [nombre], [correo], [total]) VALUES ('70', 'bogota', 'sistemas', 'sistemas andres', 'andresgarcia@misena.edu.co','0');");
            //tx.executeSql("INSERT INTO [perfil] ([experiencia], [ubicacion], [claves], [nombre], [total]) VALUES ('30', 'meta', 'ingeniero', 'ingeniero monica', '0');");
        }




    $('#indice').bind('pageinit', function(event) {
            

        var db = window.openDatabase("empleate", "1.0", "DB Empleate", 1000000);
        db.transaction(createDb, mensajeError);
            
    });









$('#nuevo').bind('pagebeforeshow', function(event) {


                $.ajax({
                   type: "GET",
                   async: false,
                   url: "../iniciarSesion/controller/signin.php/get/"+idUsuario,
                   success: function(data){

                    $("#detallesUsuario").html('');
                    $("#detallesUsuario").append( 
                                                  "<p>" + data.id + "<br>" 
                                                        + data.email + "<br>" 
                                                        + data.pass + "<br>" + "</p>");
                    

                   },
                   error: function () {
                        alert("Error");
                   } 

                });

        });

//#################################################################################

$('#usuarios').click( function(event) {


                $.ajax({
                   type: "GET",
                   async: false,
                   url: "../iniciarSesion/controller/signin.php/getall",
                   success: function(data){

                    //var items = new Array();
                    $("#alluser").append('<h3 class="topcoat-list__header">Categoria</h3>');

                    //llenamos la lista de datos remotos
                    for (var i = 0; i < data.length; i++) {

                        //items[i] = new Array(data[i].id, data[i].nombre, data[i].apellidos);
                        $("#alluser").append('<li class="topcoat-list__item" data-name="'+ parseInt(data[i].id) +'" style="padding-top: 3px; padding-bottom: 3px; list-style:none;"><a href="#nuevo" data-transition="slide" data-role="button" class="topcoat-button--quiet">'+ data[i].email +'</a></li>');
                    }

                    $('#alluser').children('li').bind('click', function(e) {
                        idUsuario = parseInt($(this).attr('data-name'));
                    });

                    

                   },
                   error: function () {
                        alert("Error");
                   } 

                });

        });

//#################################################################################













function mensajeError(error) {
    console.log(error);
}



$("#eliminarBtn").click(function() {
   
    $.ajax({
        type: "GET",
        async: false,
        url: "../iniciarSesion/controller/signin.php/delete/"+eliminarId,
                   success: function(data){
                   

                    if(data)
                        alert("Con exito!!");
                    else
                        alert("No se pudo");


                   },
                   error: function () {
                        alert("Error");
                   } 

                });

});


/////////////////////////////////////////////////////////////////////////////////

$("#login").click(function() {

  var email = $("#login_email").val();
  var pass = $("#login_pass").val(); 
  
  
    
    $.ajax({
        type: "GET",
        async: false,
        url: "../iniciarSesion/controller/signin.php/comparar/"+email+"/"+pass,
                   success: function(data){
                   

                    if(data)
                        window.location = "#nuevo";
                    else
                        alert("No se pudo");


                   },
                   error: function () {
                        alert("Error");
                   } 

                });

});


/////////////////////////////////////////////////////////////////////////////////




 
$("#testLink").click(function(e) {
            e.preventDefault();

            $.ajax({
                   type: "GET",
                   async: false,
                   url: "../iniciarSesion/controller/singin.php/getall",
                   success: function(data){

                    var items = new Array();


                    //llenamos la lista de datos remotos
                    for (var i = 0; i < data.length; i++) {

                        //items[i] = new Array(data[i].id, data[i].nombre, data[i].apellidos);
                        $("#listarItemsRemotos").append('<li class="ui-li-has-alt" data-name="'+ parseInt(data[i].id) +'"><a href="#nuevo" data-transition="slide" data-role="button" class="ui-btn">' 
                                                  + "<h4>" + data[i].email + "</h4>"
                                                  + "<p>Password: "  + data[i].pass + "</p>" 
                                                  + "</a>" 
                                                  + '<a href="#"  data-name="'+  parseInt(data[i].id) +'" class="delete ui-btn ui-btn-icon-notext ui-icon-delete" data-rel="popup" data-icon="delete" data-position-to="window" data-role="button" data-inline="true" title="Eliminar" data-transition="pop"></a>'
                                          +"</li>");
                    }


                    $('#listarItemsRemotos').children('li').bind('click', function(e) {
                        idUsuario = parseInt($(this).attr('data-name'));
                    });



                    $(".delete").on( "click", function() {
                        eliminarId = parseInt($(this).attr('data-name'));       
                        $.mobile.changePage( "#confirmacionEliminar", { role: "dialog" } );
                    });


                   },
                   error: function () {
                        alert("Error");
                   } 

                });

        });








