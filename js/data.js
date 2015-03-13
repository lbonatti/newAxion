var Paises = {
    0: {
        nombre: 'Argentina', abreviatura: 'Arg.', lat: -34.639507, lon: -58.4910882, icon: 'img/flag-arg.png'
    },
    1: {
        nombre: 'Paraguay', abreviatura: 'Par.', lat: -25.3062274, lon: -57.5957806, icon: 'img/flag-par.png'
    },
    2: {
        nombre: 'Uruguay', abreviatura: 'Uru.', lat: -34.8767092, lon: -56.1424982, icon: 'img/flag-uru.png'
    }
}
var paisActual = 'Argentina';
var paisCambiado = false;
function cargarPaises() {
    var res = "";
    var i = 0;

    $.each(Paises, function (index, value) {
        if (i == 0)
            res += '<div class="selected" data-value="' + value.nombre + '"> <img src="' + value.icon + '" />' + value.nombre + '</div>';
        else
            res += '<div data-value="' + value.nombre + '"> <img src="' + value.icon + '" />' + value.nombre + '</div>';
        i++;
    });

    $('.menu-pais').html(res)
        .css('margin-top', '-' + ((i-1) * 59) + 'px')
        .css('height', ((i-1) * 59) + 'px');

    $('.menu-pais div').on('touchstart',function () {

        paisActual = $(this).attr('data-value');
        var paisActualAb = $(this).text();

        $('.menu-pais div').removeClass('selected');
        $(this).addClass('selected');
        $('.sec1 .pais img').attr('src', $('img', this).attr('src'));


        //Regirigir mapa
        for (var i = 0; i < 3; i++) {
            if (Paises[i].nombre == paisActual) {
                console.log(Paises)
                var punto = new google.maps.LatLng(Paises[i].lat, Paises[i].lon);
                centerMap(punto);
                try{geoMarkerStart.setMap(null);geoMarkerEnd.setMap(null)}catch(err){}
                try{directionsService.setMap(null)}catch(err){}
                try{geoMarker.setMap(null)}catch(err){}
                actualizarGeolocMarker(punto)
                paisCambiado = true;

                PositionToDir(punto, function (dir, pais) {
                    $('#txHasta').hide().val('');
                    $('#txBusqueda').show().val(dir);
                    globalModoBusqueda = 1;
                });

                ///nuevaUbicacionActual(punto);
                if(isMobile())
                    $('div.pais').html(paisActualAb)
            }

        }

    });

}

function cambiarBandera(pais) {
    $('.menu-pais div').each(function () {
        var p = $(this).attr('data-value');
        if (p == pais) {
            $('.menu-pais div').removeClass('selected');
            $(this).addClass('selected');
            $('.pais img').attr('src', $('img', this).attr('src'));
            paisActual = pais;

        }

    })
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 var Estaciones = {
    0:{
        nombre:'Estacion 1',

        direccion1: 'Scalabrini Ortiz 2478. Palermo.',
        direccion2: 'Capital Federal. Argentina',
        estado:'Abierta',
        distancia:'4.5 km',
        telf:'+54 114760-3547',
        web:'www.estacionaxion.com.ar',
        combustibles:['Diesel Premium','Diesel','Super'] ,
        servicios:['abierto24hs','tc','premium','gnc','tiendas','card','oil','wifi'],
        promociones:{

        },
        lat:0,
        lon:0,
        tipo:'axion',
        propiedades:{
            'abierto24hs' :true,
            'tiendas':true,
            'cajero':true,
            'tc' :true,
            'card' :true,
            'wifi' :true,
            'premium' :true,
            'oil':true,
            'promociones' :true,
            'gnc':true
        },
        visible:false
    },


    1:{
        nombre:'Estacion 1',

        direccion1: 'Scalabrini Ortiz 2478. Palermo.',
        direccion2: 'Capital Federal. Argentina',
        estado:'Abierta',
        distancia:'4.5 km',
        telf:'+54 114760-3547',
        web:'www.estacionaxion.com.ar',
        combustibles:['Diesel Premium','Diesel','Super'] ,
        servicios:['abierto24hs','tc','premium','gnc','tiendas','card','oil','wifi'],
        promociones:{

        },

        lat:0,
        lon:0,
        tipo:'esso',
        propiedades:{
            'abierto24hs' :true,
            'tiendas':true,
            'cajero':true,
            'tc' :true,
            'card' :true,
            'wifi' :true,
            'premium' :true,
            'oil':true,
            'promociones' :true,
            'gnc':false
        },
        visible:false
    },
    2:{
        nombre:'Estacion 1',

        direccion1: 'Scalabrini Ortiz 2478. Palermo.',
        direccion2: 'Capital Federal. Argentina',
        estado:'Abierta',
        distancia:'4.5 km',
        telf:'+54 114760-3547',
        web:'www.estacionaxion.com.ar',
        combustibles:['Diesel Premium','Diesel','Super'] ,
        servicios:['abierto24hs','tc','premium','gnc','tiendas','card','oil','wifi'],
        promociones:{

        },


        lat:0,
        lon:0,
        tipo:'axion',
        propiedades:{
            'abierto24hs' :true,
            'tiendas':false,
            'cajero':true,
            'tc' :true,
            'card' :false,
            'wifi' :true,
            'premium' :false,
            'oil':true,
            'promociones' :true,
            'gnc':true
        },
        visible:false
    },
    3:{
        nombre:'Estacion 1',

        direccion1: 'Scalabrini Ortiz 2478. Palermo.',
        direccion2: 'Capital Federal. Argentina',
        estado:'Abierta',
        distancia:'4.5 km',
        telf:'+54 114760-3547',
        web:'www.estacionaxion.com.ar',
        combustibles:['Diesel Premium','Diesel','Super'] ,
        servicios:['abierto24hs','tc','premium','gnc','tiendas','card','oil','wifi'],
        promociones:{

        },


        lat:0,
        lon:0,
        tipo:'esso',
        propiedades:{
            'abierto24hs' :false,
            'tiendas':false,
            'cajero':true,
            'tc' :true,
            'card' :true,
            'wifi' :false,
            'premium' :true,
            'oil':true,
            'promociones' :false,
            'gnc':true
        },
        visible:false
    },
    4:{
        nombre:'Estacion 1',


        direccion1: 'Scalabrini Ortiz 2478. Palermo.',
        direccion2: 'Capital Federal. Argentina',
        estado:'Abierta',
        distancia:'4.5 km',
        telf:'+54 114760-3547',
        web:'www.estacionaxion.com.ar',
        combustibles:['Diesel Premium','Diesel','Super'] ,
        servicios:['abierto24hs','tc','premium','gnc','tiendas','card','oil','wifi'],
        promociones:{

        },


        lat:0,
        lon:0,
        tipo:'axion',
        propiedades:{
            'abierto24hs' :true,
            'tiendas':true,
            'cajero':false,
            'tc' :true,
            'card' :false,
            'wifi' :true,
            'premium' :true,
            'oil':true,
            'promociones' :true,
            'gnc':true
        },
        visible:false
    }

};
 */

var Estaciones = [];

var filtros = {
    'abierto24hs': {
        valor: false,
        icon: 'img/f-24hs.png',
        icon2: 'img/dt-24hs.png',
        nombre: 'Abierto 24 hs.',
        tipo: 'servicio'
    },
    'tiendas': {
        valor: false,
        icon: 'img/f-tienda.png',
        icon2: 'img/dt-tienda.png',
        nombre: 'Tienda de Conv.',
        tipo: 'servicio'
    },
    'cajero': {
        valor: false,
        icon: 'img/f-cajero.png',
        icon2: 'img/dt-cajero.png',
        nombre: 'Cajero Automático',
        tipo: 'servicio'
    },
    'tc': {valor: false, icon: 'img/f-tc.png', icon2: 'img/dt-tc.png', nombre: 'Tarjetas de Crédito', tipo: 'servicio'},
    'card': {valor: false, icon: 'img/f-card.png', icon2: 'img/dt-card.png', nombre: 'AXION card', tipo: 'servicio'},
    'wifi': {valor: false, icon: 'img/f-wifi.png', icon2: 'img/dt-wifi.png', nombre: 'Wi-Fi', tipo: 'servicio'},
    'premium' :{valor:false, icon:'img/f-combustible.png',icon2:'img/combustible.png',nombre:'Diesel Premium',tipo:'combustible'},
    'gnc': {valor: false,icon: 'img/f-combustible.png',icon2: 'img/combustible.png',nombre: 'GNC',tipo: 'combustible'},
    'oil': {valor: false, icon: 'img/f-oil.png', icon2: 'img/dt-oil.png', nombre: 'Mobil Oil Express', tipo: 'servicio'},
    'promociones': {valor: false, icon: 'img/f-promocion.png', icon2: '', nombre: 'Promociones', tipo: ''}
};


var globalX, globalY;

var globalLat, globalLon;

var globalPositionStr = "";
var globalPais = "";
var globalModoBusqueda = 1;

function estacionesAleatorias() {
    return;
    Estaciones[0].nombre = 'Molina';
    Estaciones[1].nombre = 'Alameda';
    Estaciones[2].nombre = 'Gota fria';
    Estaciones[3].nombre = 'Grigota';
    Estaciones[4].nombre = 'Mataral';

    var a1 = rnd(-0.015, 0.015), a2 = rnd(-0.015, 0.015), a3 = rnd(-0.015, 0.015), a4 = rnd(-0.015, 0.015), a5 = rnd(-0.01, 0.01);
    var b1 = rnd(-0.015, 0.015), b2 = rnd(-0.015, 0.015), b3 = rnd(-0.015, 0.015), b4 = rnd(-0.015, 0.015), b5 = rnd(-0.01, 0.01);

    Estaciones[0].lat = globalLat + a1;
    Estaciones[0].lon = globalLon + b1;
    Estaciones[1].lat = globalLat + a2;
    Estaciones[1].lon = globalLon + b2;
    Estaciones[2].lat = globalLat + a3;
    Estaciones[2].lon = globalLon + b3;
    Estaciones[3].lat = globalLat + a4;
    Estaciones[3].lon = globalLon + b4;
    Estaciones[4].lat = globalLat + a5;
    Estaciones[4].lon = globalLon + b5;
}

function procesarEstaciones() {
    for (var i = 0; i < Estaciones.length; i++) {
        var latitud, longitud = 0;
        latitud = Estaciones[i].lat;
        longitud = Estaciones[i].lon;

        latitud = latitud.replace(",", ".");
        longitud = longitud.replace(",", ".");

        Estaciones[i].lat = latitud;
        Estaciones[i].lon = longitud;
        Estaciones[i].tipo = Estaciones[i].tipo.toLowerCase();
        //Estaciones[i].distancia = '';
    }
}
