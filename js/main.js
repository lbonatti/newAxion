var deviceInfo;
var ocultarChrome = false;
var app = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;


$(document).ready(function () {
    $('input').blur();

    eventosGenerales();

    eventosDetail();

    cargarPaises();

    eventosBusqueda();

    eventosFiltro();

    eventosPasos();

    eventosPromociones();


    setTimeout(function () {
        document.addEventListener("deviceready", geoloc(), false);
    }, 300);


    // ocultarChrome = obtenerQueryString("ocultar_chrome", 0);
    //console.log("OCULTAR CHROME: " + ocultarChrome);
    resizeMap(ocultarChrome);

    if (ocultarChrome) {
        //console.log("voy a ocultar el header");
        // $("body").addClass("ocultar-chrome");

        //$("header").css("display", "none");
        //$(".sec2").css("display", "none");
        //$("#googleMap").css("margin-top", 0);
        //$(".bloque-filtro").css("padding-bottom", "90px");
        //$(".bloque-filtro").css("padding-bottom", "90px");
    }
});


document.addEventListener("deviceready", detectOs(), false);

function detectOs() {
    var deviceType = (navigator.userAgent.match(/iPad/i)) == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i)) == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";

    deviceInfo = deviceType
}

function isFirstTimeOpen(data){
    if (data == null){
        openPopUpBases()
        window.localStorage.setItem('firstTime','1');
    }else{

    }
}
function openPopUpBases(){
    $('div.detail-bg').css('height',$(window).height()).show();
    $('div.detail').show();

    $('.detail .titulo1').html('<span style="font-size: 20px;display: block;text-align: center">BASES Y CONDICIONES</span>')
    $('.detail .titulo2').html('')
    $('.detail .img-background .tipo').hide()
    $('.detail .group,.detail .linea,.detail .linea2,.detail .linea3,.detail .comollegar,.detail .tel, .detail .web, .detail .distancia,.img-background ').hide()

    text = $('#basesText div').clone()

    text.css('height',$('.detail').height()-120+'px')
    $('.estado').html(text)
}