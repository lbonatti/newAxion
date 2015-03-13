var deviceInfo;

$(document).ready(function(){
        $('input').blur();

        eventosGenerales()

        eventosDetail();

        cargarPaises();

        eventosBusqueda();

        eventosFiltro();

        eventosPasos();

        eventosPromociones();


        setTimeout(function(){
            document.addEventListener("deviceready", geoloc(), false);
        },1500);

        var ocultarChrome = obtenerQueryString("ocultar_chrome", 0);
        resizeMap(ocultarChrome);

        if (ocultarChrome) {
            $(".header-content").css("display", "none");
            $(".sec2").css("display", "none");
            $("#googleMap").css("margin-top", 0);
            $(".bloque-filtro").css("padding-bottom", "90px");

        }

        if(document.body.clientWidth>1024){
            //setTimeout(function(){
            //    showPromocionesInicial(ocultarChrome);
            //},2000);
        }
        $('#txBusqueda').autocomplete({
            source: direcciones,
            minLength: 3,
            appendTo: ".dir"
        });
});

document.addEventListener("deviceready", detectOs(), false);

function detectOs() {
    var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";

    deviceInfo = deviceType
}

$(window).on('resize',function(){
    if($('.ui-autocomplete').length > 0){
        $('.ui-autocomplete').hide();
    }
})