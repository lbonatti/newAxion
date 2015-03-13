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

    $(window).resize()
});

$(window).on('resize',function(){
    $('input, textarea').blur();

    if (isMobile()){
        $('#txHasta').autocomplete({
            source: direcciones,
            position: { my: "left top",at: "left bottom", offset:'0 62',collision: "flip" },
            open: function () {
                $(this).data("uiAutocomplete").menu.element.addClass("newAutoComplete");
            }
        })
        $('#txBusqueda').autocomplete({
            source: direcciones,
            position: { my: "left bottom",at: "left top",collision: "flip flip" }
        });
    }else{
        $('#txHasta').autocomplete({
            source: direcciones,
            position: { my: "left top",at: "left bottom", collision: "flip flip" },
            open: function () {
                $(this).data("uiAutocomplete").menu.element.addClass("newAutoComplete");
            }
        })
        $('#txBusqueda').autocomplete({
            source: direcciones,
            position: { my: "left top",at: "left bottom",collision: "flip flip" }
        });
    }

})