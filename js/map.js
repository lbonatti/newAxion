var WSUrl = 'http://projectsunderdev.com/axion/webservice.php';
//var WSUrl = window.location.origin + '/newAxion/ws/webservice.php';


var map;
var geocoder = new google.maps.Geocoder();
var directionsDisplay;
var directionsService;
var direcciones = [];
var currentPositionToCenter;
var currentDirText = '';
var currentDirText2 = '';
var gpsEnabled = true;
var routeShow = false;
var currentMapType = 'ROADMAP';

var markerCluster;
var filterCluster = [];
var allMarkers = [];
var clusterStyles = {
    minimumClusterSize: 4,
    gridSize: 70,
    styles: [{
        width: 38,
        url: "img/clusters/1.png",
        height: 51,
        opt_textColor: 'white',
        opt_fontWeight: 'bold',
        opt_textSize: 13,
    }, {
        width: 38,
        url: "img/clusters/1.png",
        height: 51,
        opt_textColor: 'white',
        opt_fontWeight: 'bold',
        opt_textSize: 13,
    }, {
        width: 38,
        url: "img/clusters/1.png",
        height: 51,
        opt_textColor: 'white',
        opt_fontWeight: 'bold',
        opt_textSize: 13,
    }, {
        width: 38,
        url: "img/clusters/1.png",
        height: 51,
        opt_textColor: 'white',
        opt_fontWeight: 'bold',
        opt_textSize: 13,
    }, {
        width: 38,
        url: "img/clusters/1.png",
        height: 51,
        opt_textColor: 'white',
        opt_fontWeight: 'bold',
        opt_textSize: 13,
    }]
};

var geoMarkerStart;
var geoMarkerEnd;

function initializeMap() {

    var ocultarChrome = obtenerQueryString("ocultar_chrome", 0);
    var mScrollWheel = true;
    if (ocultarChrome) {
        mScrollWheel = false;
    }

    directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: false
    });
    directionsService = new google.maps.DirectionsService();
    var pos1 = new google.maps.LatLng(-34.6, -58.45);

    var myStyles = [{
        featureType: "poi",
        elementType: "labels",
        stylers: [{
            visibility: "off"
        }]
    }];

    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('txBusqueda'));
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        buscar();
    });

    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('txHasta'));
    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('txDesde'));

    var mapProp = {
        scrollwheel: mScrollWheel,
        center: pos1,
        zoom: 14,
        zoomControl: true,
        disableDefaultUI: true,
        /* streetViewControl:false,*/
        /*mapTypeControlOptions: { mapTypeIds: []},*/
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        /*,
         styles: myStyles*/
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        disableDefaultUI: true
    };
    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    directionsDisplay.setMap(map);

    google.maps.event.addListener(map, 'click', function (event) {

    });

    getVersionEESS()
}

google.maps.event.addDomListener(window, 'load', initializeMap);

var myIconAxion = new google.maps.MarkerImage('img/marker_axion.png', null, null, null, new google.maps.Size(33, 34));
var myIconEsso = new google.maps.MarkerImage('img/marker_esso.png', null, null, null, new google.maps.Size(45, 32));

var myIconGeo = new google.maps.MarkerImage('img/geoloc.png', null, null, new google.maps.Point(57, 57), new google.maps.Size(114, 114));

var geoMarker = null;

function centerMap(pos /*lat,lon*/) {
    try {
        map.panTo(pos /*new google.maps.LatLng(lat,lon)*/);
    } catch (err) {
    }
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
    try {
        for (var i = 0; i < Estaciones.length; i++) { //CantEstaciones
            //newMarker(i,Estaciones[i].nombre,Estaciones[i].lat,Estaciones[i].lon)

            var icon;
            if (Estaciones[i].tipo == 'esso') {
                icon = myIconEsso;
            } else {
                icon = myIconAxion;
            }

            Estaciones[i].marker = new google.maps.Marker({
                position: new google.maps.LatLng(Estaciones[i].lat, Estaciones[i].lon),
                map: map,
                icon: icon,
                zIndex: google.maps.Marker.MAX_ZINDEX + 1
            });
            Estaciones[i].marker.idEstacion = i;

            google.maps.event.addListener(Estaciones[i].marker, 'click', function () {
                //var theid=this.theid;
                showDetail(this.idEstacion);
                pasosOcultar();
            });
            allMarkers.push(Estaciones[i].marker);
        }
    } catch (err) {
    }
}

function filtrarEstaciones() {
    filterCluster = [];

    for (var i = 0; i < Estaciones.length; i++) { //CantEstaciones
        Estaciones[i].visible = true;
    }
    for (var i = 0; i < Estaciones.length; i++) { //CantEstaciones
        $.each(filtros, function (index, filtro) {
            if (filtro.valor) {
                if (!Estaciones[i].propiedades[index]) {
                    Estaciones[i].visible = false;
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
    for (var i = 0; i < Estaciones.length; i++) { //CantEstaciones
        if (Estaciones[i].visible) {
            Estaciones[i].marker.setMap(map);
            filterCluster.push(Estaciones[i].marker)
        } else {
            Estaciones[i].marker.setMap(null);
        }
        //Estaciones[i].marker.setMap(null);
    }
    //markerCluster = new MarkerClusterer(map, filterCluster)
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

function actualizarGeolocMarker(pos /*latitude, longitude*/) {
    //var pos = new google.maps.LatLng(latitude, longitude);

    geoMarker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: myIconGeo
    });

    var mistic = new google.maps.Geocoder();
}

//Centra el mapa en la posición según GPS
function centerMapCurrentLoc() {
    var punto = new google.maps.LatLng(globalLat, globalLon);
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

function geoloc() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: true,
        maximumAge: 3000,
        timeout: 8000
    });
}

function onSuccess(position) {

    globalLat = position.coords.latitude;
    globalLon = position.coords.longitude;

    currentPositionToCenter = position;

    var punto = new google.maps.LatLng(globalLat, globalLon);
    actualizarGeolocMarker(punto);
    centerMap(punto);

    PositionToDir(punto, function (dir, pais) {
        //estacionesAleatorias();
        globalPositionStr = dir;
        globalPais = pais;
        $('#txBusqueda, #txDesde').val(globalPositionStr);
        $('#txBusqueda, #txDesde').attr('data-location', globalPositionStr);
        cambiarBandera(pais);
    });
    console.log('GeoLocation success!');
}

function onError(error) {
    gpsEnabled = false;
    try {
        navigator.notification.alert(
            'No hemos encontrado su ubicación. Active el GPS para una mejor experiencia con la aplicación.', // message
            function () {
            }, // callback to invoke with index of button pressed
            'GPS desactivado', // title
            'Continuar' // buttonName
        );
    } catch (err) {
        alert('No hemos encontrado su ubicación. Active el GPS para una mejor experiencia con la aplicación.')
    }
    var punto = new google.maps.LatLng(-34.639507, -58.4910882);
    currentPositionToCenter = punto;
    globalLat = '-38.4192641';
    globalLon = '-63.5989206';
    actualizarGeolocMarker(punto);
    centerMap(punto);

    PositionToDir(punto, function (dir, pais) {
        //estacionesAleatorias();
        globalPositionStr = dir;
        globalPais = pais;
        $('#txBusqueda, #txDesde').val(globalPositionStr);
        cambiarBandera(pais);
    });
    console.log('GeoLocation success!');
    $('.preloadMap').fadeOut();
    $('#googleMap').animate({
        opacity: 1
    }, 500);
    map.setZoom(3)
}


/////////////////////////////////////////////////////////////////////////////

//var routeMarkerArray = [];

var mostrandoRuta = false;

function calcRoute(start, end) {
    try {
        directionsDisplay.setMap(null);
        geoMarker.setMap(null);
        geoMarkerStart.setMap(null);
        geoMarkerEnd.setMap(null);
    } catch (err) {
    }

    geoMarkerStart = new google.maps.Marker({
        position: start,
        map: map,
        icon: myIconGeo
    });

    geoMarkerEnd = new google.maps.Marker({
        position: end,
        map: map,
        icon: myIconGeo
    });

    var request = {
        origin: start,
        destination: end,

        /*waypoints: waypts,
         optimizeWaypoints: true,*/

        travelMode: google.maps.TravelMode.DRIVING
    };

    //var currentZoom=map.getZoom();
    directionsService.route(request, function (response, status) {
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
            mostrandoRuta = true;
            cargarPasos(response.routes[0].legs[0])
        }
    });

}

function limpiarRuta() {
    directionsDisplay.setMap(null);
    if (currentDirText != '') {
        $('#txDesde, #txHasta').val('');
        $('.pasos').hide();
        globalModoBusqueda = 1;
        buscar();
    } else {
        try {
            directionsDisplay.setMap(null);
            geoMarker.setMap(null);
            geoMarkerStart.setMap(null);
            geoMarkerEnd.setMap(null);
        } catch (err) {
        }
        //initializeMap();
        geoloc();
        map.setZoom(14);
    }
    pasosOcultar();
}

function routeFromGeoToStation(stationId) {
    var directionFrom = geoMarker.getPosition(); // new google.maps.LatLng(p[2],p[3]);
    var directionTo = Estaciones[stationId].marker.getPosition(); //getMarker(stationId).getPosition();
    calcRoute(directionFrom, directionTo);
}

function PositionToDir(latlng, callback) {
    geocoder.geocode({
        'latLng': latlng
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            //console.log(results);
            if (results[0]) {
                var address = results[0].formatted_address;
                var country = '';
                for (var i = 0; i < results.length; i++) {
                    if (results[i].types[0] == 'country') {
                        country = results[i].formatted_address;
                    }
                }
                callback(address, country);
            }
        }
    });
}

function DirToPosition(dir, callBack) {
    var address = paisActual + ', ' + dir;
    geocoder.geocode({
        "address": address
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {

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
function routeFromDirToDir(dir1, dir2) {
    DirToPosition(dir1, function (pos1) {
        if (pos1 != null) {
            /*globalLat=pos1.k;
             globalLon=pos1.A;
             updateGeolocMarker(globalLat, globalLon);*/
            currentDirText2 = $('#txHasta').val();

            DirToPosition(dir2, function (pos2) {
                if (pos2 != null) {
                    calcRoute(pos1, pos2);
                } else {
                    //no se encuentra dir 2
                    /*centerMap(pos1.k,pos1.A);
                     limpiarRuta();*/
                    try {
                        navigator.notification.alert(
                            'no se encuentra direccion 2', // message
                            function () {
                            }, // callback to invoke with index of button pressed
                            'Oops!', // title
                            'Continuar' // buttonName
                        );
                    } catch (err) {
                        alert('no se encuentra direccion 2')
                    }
                }
            })
        } else {
            //no se encuentra dir 1
            try {
                navigator.notification.alert(
                    'no se encuentra direccion 1', // message
                    function () {
                    }, // callback to invoke with index of button pressed
                    'Oops!', // title
                    'Continuar' // buttonName
                );
            } catch (err) {
                alert('no se encuentra direccion 1')
            }
        }
    })
}

function cargarDirecciones(estaciones) {
    try {
        $.each(estaciones, function (index, value) {
            var dir1 = estaciones[index].direccion1;
            var dir2 = estaciones[index].direccion2;
            direcciones[index] = dir1 + ', ' + dir2;
        });
    } catch (err) {
    }

    //    console.log(direcciones)
}


/////////////////////////////////////////////////////////////////////////////////

function resizeMap(ocultarChrome) {
    var alturaScreen = $(window).height();
    var anchoScreen = $(window).width();

    if (isMobile()) {
        var alturaHeader = 61;
        var alturaFoot = 35;
    } else {
        var alturaHeader = 74;
        var alturaFoot = 35;
    }

    if (ocultarChrome) {
        //alturaHeader = 0;
        //$('#container').attr('style', 'margin-top: 0 !important');
    }

    $('#container').height(alturaScreen - alturaHeader);
    $('#googleMap').height(alturaScreen - alturaHeader - alturaFoot);

    //$('#container').width($(window).width());
    //$('#googleMap').width($(window).width());

    //if(!isMobile()){
    $.each(Paises, function (index, value) {

        $($('.menu-pais').children()[index]).html('<img src="' + value.icon + '" /></br>' + value.nombre)
    });
    $('.sec1 .pais ').html('<img src="' + $('img', $('.menu-pais div.selected')).attr('src') + '" />' /*+ $('.menu-pais div.selected').html()*/);
    //$('.sec1 .pais img').show();
    //}else{
    //    $.each(Paises, function(index, value) {
    //        $($('.menu-pais').children()[index]).html(value.abreviatura)
    //    });
    //    $('.sec1 .pais ').html('<img src="'+$('img',$('.menu-pais div.selected')).attr('src')+'" />');
    //    //$('.sec1 .pais').html($('.menu-pais div.selected').html());
    //};
    if (!mostrandoRuta) {
        try {
            google.maps.event.trigger(map, "resize");
            map.panTo(geoMarker.getPosition());
        } catch (err) {
        }
    }
}

// Listen for orientation changes
window.addEventListener("resize", function () {
    // Announce the new orientation number
    if (mostrandoRuta) {
        directionsDisplay.setMap(map);
        resizeMap();
    } else {
        resizeMap();

        try {
            map.setCenter(currentPositionToCenter)
        } catch (err) {
        }
    }
}, false);


function calculateDistance(to_lat, to_lng, from_lat, from_lng) {
    from_lat = typeof from_lat !== 'undefined' ? from_lat : globalLat;
    from_lng = typeof from_lng !== 'undefined' ? from_lng : globalLon;
    var f_latlng = from_lat + ',' + from_lng;
    var to_latlng = to_lat + ',' + to_lng;

    $('.detail .distancia').hide();

    var distanceService = new google.maps.DistanceMatrixService();
    distanceService.getDistanceMatrix({
            origins: [f_latlng],
            destinations: [to_latlng],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            durationInTraffic: true,
            avoidHighways: false,
            avoidTolls: false
        },
        function (response, status) {
            if (status !== google.maps.DistanceMatrixStatus.OK) {
                $('.detail .distancia').hide()
            } else {
                var distance = response.rows[0].elements[0].distance.text;
                if (distance) {
                    $('.detail .distancia').html(distance);
                    $('.detail .distancia').show()
                } else {
                    $('.detail .distancia').hide()
                }
            }
        });
}

function codeAddress(address, to_lat, to_lng) {
    //In this case it gets the address from an element on the page, but obviously you  could just pass it to the method instead
    var ret = [];
    geocoder.geocode({
        'address': address
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
            ret[0] = results[0].geometry.location.lat();
            ret[1] = results[0].geometry.location.lng();

            calculateDistance(to_lat, to_lng, ret[0], ret[1])
        }
    });
}
function updateEESS() {
    $.ajax({
        url: 'http://www.axionenergy.com/app/js/estaciones_servicio.txt',
        async: false,
        success: function (response) {
            window.localStorage.setItem('localEESS', response);
        },
        error: function (error) {

        }
    })
}

function getVersionEESS() {
    if (isMobile()) {
        $.ajax({
            url: 'http://www.axionenergy.com/app/js/version.json',
            method: 'POST',
            dataType: 'json',
            async: true,
            success: function (response) {
                //Check if exist versionEESS (first time open)
                if ((window.localStorage.getItem('versionEESS') == null || parseInt(window.localStorage.getItem('versionEESS')) < parseInt(response))) {
                    window.localStorage.setItem('versionEESS', response);
                    updateEESS();
                    //alert('Update to ' + response);
                }
            },
            complete: function () {
                Estaciones = $.parseJSON(window.localStorage.getItem('localEESS'));
                procesarUpdateEstaciones()
                markerCluster = new MarkerClusterer(map, allMarkers, clusterStyles);
            },
            error: function () {
                if (window.localStorage.getItem('localEESS') != null) {
                    Estaciones = $.parseJSON(window.localStorage.getItem('localEESS'));
                    procesarUpdateEstaciones()
                } else {
                    getLocalEESS();
                }
            }
        });
    } else {
        getLocalEESS()
    }

    $('.preloadMap').fadeOut();
    $('#googleMap').animate({
        opacity: 1
    }, 500);
}

function procesarUpdateEstaciones() {
    procesarEstaciones();
    dibujarEstaciones(Estaciones);
    cargarDirecciones(Estaciones);
    markerCluster = new MarkerClusterer(map, allMarkers, clusterStyles);
}

function getLocalEESS() {
    //alert('local file EESS')
    //local file EESS
    $.ajax({
        url: "js/estaciones_servicio.json",
        dataType: 'json',
        async: true,
        success: function (data) {
            Estaciones = data;
            procesarUpdateEstaciones()
        }
    })
}