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
            setTimeout(function(){
                showPromocionesInicial(ocultarChrome);
            },2000);
        }

    if (isMobile()){
        $('#txHasta').autocomplete({
            source: direcciones,
            appendTo: ".dir",
            minLength: 3,
            open: function () {
                $(this).data("uiAutocomplete").menu.element.addClass("newAutoComplete");
            },
            select: function( event, ui ) {
                //console.log(ui.item.label)
                setTimeout(function(){
                    var e = jQuery.Event("keypress");
                    e.keyCode = 13; // # Some key code value
                    $("#txHasta").trigger(e);
                },200)

            }
        })
        $('#txBusqueda').autocomplete({
            source: direcciones,
            minLength: 3,
            appendTo: ".dir",
            select: function( event, ui ) {
                //console.log(ui.item.label)
                setTimeout(function(){
                    var e = jQuery.Event("keypress");
                    e.keyCode = 13; // # Some key code value
                    $("#txHasta").trigger(e);
                },200)
            }
        });
    }else{
        $('#txHasta').autocomplete({
            source: direcciones,
            minLength: 3,
            appendTo: ".dir",
            open: function () {
                $(this).data("uiAutocomplete").menu.element.addClass("newAutoComplete");
            },
            select: function( event, ui ) {
                //console.log(ui.item.label)
                setTimeout(function(){
                    var e = jQuery.Event("keypress");
                    e.keyCode = 13; // # Some key code value
                    $("#txHasta").trigger(e);
                },200)

            }
        })
        $('#txBusqueda').autocomplete({
            source: direcciones,
            minLength: 3,
            appendTo: ".dir",
            select: function( event, ui ) {
                //console.log(ui.item.label)
                setTimeout(function(){
                    var e = jQuery.Event("keypress");
                    e.keyCode = 13; // # Some key code value
                    $("#txHasta").trigger(e);
                },200)

            }
        });
    }
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