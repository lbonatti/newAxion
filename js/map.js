var map;
var geocoder= new google.maps.Geocoder();
var directionsDisplay;
var directionsService;
var direcciones = [];
var currentPositionToCenter;
var currentDirText = '';
var currentDirText2 = '';
var gpsEnabled = true;
var routeShow = false
/*var currentMarkerId;*/

var geoMarkerStart;
var geoMarkerEnd;

function initializeMap() {

    var ocultarChrome = obtenerQueryString("ocultar_chrome", 0);
    var mScrollWheel = true;
    if (ocultarChrome) {
        mScrollWheel = false;
    }

    directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
    directionsService = new google.maps.DirectionsService();
    var pos1 = new google.maps.LatLng(-34.639507,-58.4910882 );

    var myStyles =[
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        }
    ];

    var mapProp = {
        scrollwheel: mScrollWheel,
        center: pos1,
        zoom:14,
        zoomControl:true,
        disableDefaultUI: true,
        /* streetViewControl:false,*/
        /*mapTypeControlOptions: { mapTypeIds: []},*/
        mapTypeId:google.maps.MapTypeId.ROADMAP,  /*,
        styles: myStyles*/
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        }
    };
    map=new google.maps.Map(document.getElementById("googleMap") ,mapProp);
    directionsDisplay.setMap(map);

    google.maps.event.addListener(map, 'click', function(event) {

    });

    //console.log("por cargar las estaciones de servicio");
    var jqxhr = $.getJSON("js/estaciones_servicio.json", function (data) {
        //console.log("cargue las estaciones vamoooos");
        Estaciones = data;
        //console.log("por cargar las estaciones");
        procesarEstaciones();
        //console.log(Estaciones);
        dibujarEstaciones(Estaciones);

        //Cargar direcciones
        cargarDirecciones(Estaciones);
    }).error(function (jqXHR, textStatus, errorThrown) { alert(errorThrown); });

}

google.maps.event.addDomListener(window, 'load', initializeMap);

var myIconAxion = new google.maps.MarkerImage( 'img/marker_axion.png', null, null, null, new google.maps.Size(33,34));
var myIconEsso = new google.maps.MarkerImage( 'img/marker_esso.png', null, null, null, new google.maps.Size(45,32));

var myIconGeo = new google.maps.MarkerImage( 'img/geoloc.png', null, null,new google.maps.Point(57, 57), new google.maps.Size(114,114));

var geoMarker = null;

function centerMap(pos/*lat,lon*/){
    map.panTo(pos/*new google.maps.LatLng(lat,lon)*/);
}

/*var markers={};
var cantMarkers=-1;


function newMarker(theid,nombre,Latitude,Longitude){
    cantMarkers++;
    markers[cantMarkers] = new google.maps.Marker({
        position: new google.maps.LatLng(Latitude, Longitude),
        map: map, icon:myIcon
    });
    markers[cantMarkers].theid=theid;
    markers[cantMarkers].estNombre=nombre;


}*/

function dibujarEstaciones() {
    //console.log("por dibujar: " + Estaciones.length);
    //console.log(Estaciones);

    for(var i=0;i<Estaciones.length;i++){ //CantEstaciones
        //newMarker(i,Estaciones[i].nombre,Estaciones[i].lat,Estaciones[i].lon)

        var icon;
        if(Estaciones[i].tipo=='esso'){
            icon=myIconEsso;
        }else{
            icon=myIconAxion;
        }

        Estaciones[i].marker = new google.maps.Marker({
            position: new google.maps.LatLng(Estaciones[i].lat, Estaciones[i].lon),
            map: map, icon:icon
        });
        Estaciones[i].marker.idEstacion=i;

        google.maps.event.addListener(Estaciones[i].marker, 'click', function() {
             //var theid=this.theid;
             showDetail(this.idEstacion);
        });
    }

}

function filtrarEstaciones(){
    for(var i=0;i<Estaciones.length;i++){ //CantEstaciones
        Estaciones[i].visible=true;
        //Estaciones[i].marker.setMap(null);
    }
    for(var i=0;i<Estaciones.length;i++){ //CantEstaciones
        $.each(filtros, function(index, filtro){
            if(filtro.valor){
                if(! Estaciones[i].propiedades[index]){
                    Estaciones[i].visible=false;
                }
            }
            /*if((Estaciones[i].propiedades[index] && filtro.valor  ) || Estaciones[i].visible){
                Estaciones[i].marker.setMap(map);
                Estaciones[i].visible=true;
            }else{
                Estaciones[i].marker.setMap(null);
                Estaciones[i].visible=false;
            }*/
        });
        /**/
    }
    for(var i=0;i<Estaciones.length;i++){ //CantEstaciones
        if(Estaciones[i].visible){
            Estaciones[i].marker.setMap(map);
        }else{
            Estaciones[i].marker.setMap(null);
        }
        //Estaciones[i].marker.setMap(null);
    }
}
/*function getMarker(id){
    for(var i=0;i<=cantMarkers;i++){
        if(markers[i].theid==id)
            return markers[i];
    }
    return null;
}
function getMarkerByNombre(nombre){
    for(var i=0;i<=cantMarkers;i++){
        if(markers[i].estNombre.toUpperCase().contains(nombre.toUpperCase()))
            return markers[i];
    }
    return null;
}*/

function actualizarGeolocMarker (pos/*latitude, longitude*/){
    //var pos = new google.maps.LatLng(latitude, longitude);

    geoMarker = new google.maps.Marker({
        position: pos,
        map: map,
        icon:myIconGeo
    });

    var mistic = new google.maps.Geocoder();
}

//Centra el mapa en la posición según GPS
function centerMapCurrentLoc(){
    var punto = new google.maps.LatLng(globalLat,globalLon);
    actualizarGeolocMarker(punto);
    centerMap(punto);
    limpiarRuta();
}

/*function nuevaUbicacionActual(punto){
    PositionToDir(punto,function(dir){
        globalPositionStr=dir;
        $('#txBusqueda').val(globalPositionStr);
    });
}*/

function geoloc(){
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy : true, maximumAge : 3000, timeout : 8000 });
}

function onSuccess(position) {
    globalLat = position.coords.latitude;
    globalLon = position.coords.longitude;

    currentPositionToCenter = position;

    var punto = new google.maps.LatLng(globalLat,globalLon);
    actualizarGeolocMarker(punto);
    centerMap(punto);

    PositionToDir(punto,function(dir,pais){
        //estacionesAleatorias();
        globalPositionStr=dir;
        globalPais=pais;
        $('#txBusqueda, #txDesde').val(globalPositionStr);
        cambiarBandera(pais);
    });
    console.log('GeoLocation success!')
    $('.preloadMap').fadeOut();
    $('#googleMap').animate({opacity:1},500);
}
function onError(error) {
    gpsEnabled = false;
    try{
    navigator.notification.alert(
        'No hemos encontrado su ubicación. Active el GPS para una mejor experiencia con la aplicación.', // message
        function(){}, // callback to invoke with index of button pressed
        'GPS desactivado',            // title
        'Continuar'                  // buttonName
    );
    }catch(err){
        alert('No hemos encontrado su ubicación. Active el GPS para una mejor experiencia con la aplicación.')
    }
    var punto = new google.maps.LatLng(-34.639507,-58.4910882);
    currentPositionToCenter = punto;
    globalLat = '-38.4192641';globalLon = '-63.5989206';
    actualizarGeolocMarker(punto);
    centerMap(punto);

    PositionToDir(punto,function(dir,pais){
        //estacionesAleatorias();
        globalPositionStr=dir;
        globalPais=pais;
        $('#txBusqueda, #txDesde').val(globalPositionStr);
        cambiarBandera(pais);
    });
    console.log('GeoLocation success!')
    $('.preloadMap').fadeOut();
    $('#googleMap').animate({opacity:1},500);
    map.setZoom(7)
}


/////////////////////////////////////////////////////////////////////////////

//var routeMarkerArray = [];

var mostrandoRuta=false;

function calcRoute(start,end) {
    try{
        directionsDisplay.setMap(null);
        geoMarker.setMap(null);
        geoMarkerStart.setMap(null);
        geoMarkerEnd.setMap(null);
    }catch(err){}

    geoMarkerStart = new google.maps.Marker({
        position: start,
        map: map,
        icon:myIconGeo
    });

    geoMarkerEnd = new google.maps.Marker({
        position: end,
        map: map,
        icon:myIconGeo
    });

    var request = {
        origin: start,
        destination: end,

        /*waypoints: waypts,
        optimizeWaypoints: true,*/

        travelMode: google.maps.TravelMode.DRIVING
    };

    //var currentZoom=map.getZoom();
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay = new google.maps.DirectionsRenderer({
                suppressMarkers: true,
                polylineOptions: {
                    strokeColor: "#9E1F64"
                }
            });
            directionsDisplay.setMap(map);
            directionsDisplay.setDirections(response);

           //map.setZoom(currentZoom);
            mostrandoRuta=true;
            cargarPasos(response.routes[0].legs[0])
        }
    });

}
function limpiarRuta(){
    pasosOcultar();
    mostrandoRuta=false;
    initializeMap();
    var lastPosition = new google.maps.LatLng(globalLat,globalLon)
    centerMap(lastPosition);
    actualizarGeolocMarker(lastPosition)
    currentPositionToCenter = lastPosition;

}

function routeFromGeoToStation(stationId){
    var directionFrom =geoMarker.getPosition() ; // new google.maps.LatLng(p[2],p[3]);
    var directionTo = Estaciones[stationId].marker.getPosition(); //getMarker(stationId).getPosition();
    calcRoute(directionFrom,directionTo);
}

function PositionToDir(latlng,callback){
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            //console.log(results);
            if (results[0]) {
                var address=results[0].formatted_address;
                var country='';
                for(var i=0;i<results.length;i++){
                    if(results[i].types[0]=='country'){
                        country=results[i].formatted_address;
                    }
                }
                callback(address,country);
            }
        }
    });
}

function DirToPosition(dir,callBack){
    var address = paisActual + ', ' + dir;
    geocoder.geocode( {"address":address}, function(results, status){
        if (status == google.maps.GeocoderStatus.OK){

            callBack(results[0].geometry.location, results[0].formatted_address);
        } else {
            callBack(null);
        }
    });
}

/*function routeFromGeoToDir(direction,errorCallback){
    var address = paisActual + ', ' + direction;
    geocoder.geocode( {"address":address}, function(results, status){
        if (status == google.maps.GeocoderStatus.OK){
            //map.setCenter(results[0].geometry.location);//center the map over the result

            var directionFrom = geoMarker.getPosition();// getMarker(stationId).getPosition(); // new google.maps.LatLng(p[2],p[3]);
            var directionTo = results[0].geometry.location;
            calcRoute(directionFrom,directionTo);

        } else {
            errorCallback();
        }
    });
}*/
function routeFromDirToDir(dir1,dir2){
    DirToPosition(dir1,function(pos1){
        if(pos1!=null){
            /*globalLat=pos1.k;
            globalLon=pos1.A;
            updateGeolocMarker(globalLat, globalLon);*/
            currentDirText2 = $('#txHasta').val();

            DirToPosition(dir2,function(pos2){
                if(pos2!=null){
                    calcRoute(pos1,pos2);
                }else{
                    //no se encuentra dir 2
                    /*centerMap(pos1.k,pos1.A);
                    limpiarRuta();*/
                    alert('no se encuentra direccion 2')
                }
            })
        }else{
            //no se encuentra dir 1
            alert('no se encuentra direccion 1')
        }
    })
}

function cargarDirecciones(estaciones){
    $.each(estaciones,function(index,value){
        var dir1 = estaciones[index].direccion1;
        var dir2 = estaciones[index].direccion2;
        direcciones[index] = dir1+', '+dir2;
    })
//    console.log(direcciones)
}


/////////////////////////////////////////////////////////////////////////////////

function resizeMap(ocultarChrome){
    var alturaScreen = $(window).height();
    var anchoScreen = $(window).width();

    if(isMobile()){
        var alturaHeader = 95;
        var alturaFoot = 58;
    }else{
        var alturaHeader = 50;
        var alturaFoot = 38;
    }

    $('#container').height(alturaScreen-alturaHeader);
    $('#googleMap').height(alturaScreen-alturaHeader-alturaFoot);

    $('#container').width($(window).width());
    $('#googleMap').width($(window).width());

    if(!isMobile()){
        $.each(Paises, function(index, value) {

            $($('.menu-pais').children()[index]).html('<img src="'+value.icon+'" />'+value.nombre)
        });
        $('.sec1 .pais ').html('<img src="'+$('img',$('.menu-pais div.selected')).attr('src')+'" />' /*+ $('.menu-pais div.selected').html()*/ );
        //$('.sec1 .pais img').show();
    }else{
        $.each(Paises, function(index, value) {
            $($('.menu-pais').children()[index]).html(value.abreviatura)
        });
        $('.sec1 .pais').html($('.menu-pais div.selected').html());
    };
    if (!mostrandoRuta){
        try{google.maps.event.trigger(map, "resize");map.panTo(geoMarker.getPosition());}catch(err){}
    }
}

// Listen for orientation changes
window.addEventListener("resize", function() {
    // Announce the new orientation number
        if(mostrandoRuta){
            directionsDisplay.setMap(map);
            resizeMap();
        }else{
            resizeMap();

            try{map.setCenter(currentPositionToCenter)}catch(err){}
        }
}, false);