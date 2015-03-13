'use strict';
function alertaDireccionVacia(hasta){
    var tt=$('.sec1 .dir .tooltip');
    tt.css('color','#fff');

    if(hasta)
        tt.addClass('hasta');
    else
        tt.removeClass('hasta');

    tt.show();
    setTimeout(function(){
        tt.css('color','#CD8CAE');
        setTimeout(function(){
            tt.css('color','#fff');
            setTimeout(function(){
                tt.css('color','#CD8CAE');
                setTimeout(function(){
                    tt.css('color','#fff');
                    setTimeout(function(){
                        tt.css('color','#CD8CAE');
                        setTimeout(function(){
                            tt.hide();
                            if( globalModoBusqueda == 1){
                                $('#txBusqueda').focus();
                            }else{
                                if(hasta)
                                    $('#txHasta').focus();
                                else
                                    $('#txDesde').focus();
                            }
                        },250);
                    },300);
                },250);
            },300);
        },250);
    },300);
}

function buscar(zoom){
    try{directionsDisplay.setMap(null)}catch(err){}
    try{geoMarker.setMap(null)}catch(err){}
    try{
        geoMarkerStart.setMap(null);
        geoMarkerEnd.setMap(null);
    }catch(err){}
    zoom = zoom || 14;
    if(globalModoBusqueda==1){
        if($('#txBusqueda').val()==''){
            alertaDireccionVacia(false);
        }else{
            DirToPosition($('#txBusqueda').val(),function(pos, formatedAddress){
                if(pos!=null){
                    currentDirText = formatedAddress;
                    currentPositionToCenter = pos;
                    actualizarGeolocMarker(pos);
                    centerMap(pos);
                    map.setZoom(zoom)
                }else{
                    alert('No se encontró la dirección');
                }
            })
        }

    }else{ // globalModoBusqueda == 2
        if($('#txDesde').val()==''){
            alertaDireccionVacia(false);
        }else if($('#txHasta').val()==''){
            alertaDireccionVacia(true);
        }else{
            routeFromDirToDir($('#txDesde').val(),$('#txHasta').val());
        }
    }
    hideDetail();
    hidePromocionesInicial();
    setTimeout(function(){
        $('.dir').fadeOut(700, function(){
            $('.sec1 .abierto').removeClass('abierto');
        });
    },1000)
}

function comoLlegar(map){
    map = map || false
    if(paisCambiado){
        $('#txDesde').show();
        $('#txHasta').show().focus();
    }else{
        if (map == true){
            $('#txDesde').show();
            $('#txHasta').show().focus();
        }else{
            $('#txDesde').show().val(globalPositionStr);
            $('#txHasta').show().focus();
        }
    }

    $('#txBusqueda').hide();
    globalModoBusqueda = 2;
    hideDetail()
    hidePromocionesInicial();
}
function miUbicacion(){
    $('#txDesde').hide();
    $('#txHasta').hide();
    $('#txBusqueda').show().val(globalPositionStr);
    cambiarBandera(globalPais);
    centerMapCurrentLoc();
    globalModoBusqueda = 1;
    paisCambiado=false;
    hideDetail();
    hidePromocionesInicial();
    map.setZoom(14)
}


function eventosBusqueda(){
    $('.sec1 .footer-content div').not('.dir').not('.buscarBtn').on('touchstart',function(){
        $('.sec1 .dir').hide();
        //setTimeout(function(e){$('.sec1 .footer-content div .tooltip').fadeOut(700);e.stopPropagation()},2000)
    })

   $('.sec1 .pais').on('touchstart',function(e){
       $('.sec1 .footer-content div').removeClass('abierto');
       $('.sec1 .pais').addClass('abierto');
        ocultarMenu1();
        ocultarMenu3();
        hideDetail();
        hidePromocionesInicial();
        if ($('.menu-pais').is(':visible')){
            $('.menu-pais').hide();
            $('.sec1 .pais').removeClass('abierto');
        }else{
            $('.menu-pais').show();
        }
        e.stopPropagation();
    });

    $('.geo').on('touchstart', function(e){
        e.preventDefault();
        $('.dir').removeClass('searchIsOpen').css('height','auto');
        $('.goToBtn').remove();
        if (gpsEnabled){
            currentDirText = '';
            $('#txDesde').val(globalPositionStr);

            if($(this).hasClass('abierto')){
                $('.sec1 .dir').hide();
                $(this).removeClass('abierto');
            }else{
                try{
                    directionsDisplay.setMap(null);
                    geoMarker.setMap(null);
                    geoMarkerStart.setMap(null);
                    geoMarkerEnd.setMap(null);
                }catch(err){}
                $('#txBusqueda').attr('disabled','disabled');
                $('.sec1 .footer-content div').removeClass('abierto');
                $(this).addClass('abierto');
                var $inputsBar = $('.sec1 .dir:hidden');
                if ( $inputsBar.length ){
                    $inputsBar.fadeIn();
                }
                miUbicacion();
            }
        }else{
            try{
                navigator.notification.alert(
                    'Imposible obtener su ubicación. Active el GPS para activar esta función.', // message
                    function(){}, // callback to invoke with index of button pressed
                    'GPS desactivado',            // title
                    'Continuar'                  // buttonName
                );
            }catch(err){
                alert('Imposible obtener su ubicación. Active el GPS para activar esta función.')
            }
        }
        pasosOcultar();
    });

    $('.map').on('touchstart', function(e){

        $('.dir').removeClass('searchIsOpen').css('height','auto');
        $('#txDesde').addClass('x');
        $('#txBusqueda').removeAttr('disabled');
        $('.goToBtn').remove();
        if($(this).hasClass('abierto')){
            $('.sec1 .dir').hide();
            $(this).removeClass('abierto');
        }else{
            var gotobtn_html = '<div class="goToBtn"><a href="#" title="ir">Ir</a></div>';
            $('.dir').append(gotobtn_html);
            $('.sec1 .footer-content div').removeClass('abierto');
            $(this).addClass('abierto');
            if (currentDirText)
                $('#txDesde').val(currentDirText);
            else
                $('#txDesde').val(globalPositionStr);
            if (currentDirText2) {console.log(currentDirText2);$('#txHasta').val(currentDirText2)};
            var $inputsBar = $('.sec1 .dir');
            $inputsBar.fadeIn();
            var map = true
            comoLlegar(map);
            pasosOcultar();
        }
    });

    $('.lupa').on('touchstart', function(){
        $('.goToBtn').remove();
        $('#txBusqueda').removeAttr('disabled');
        if($(this).hasClass('abierto')){
            $(this).removeClass('abierto');
            $('.sec1 .dir').hide();
            $('.searchOverlay').remove();
        }else{
            var $_calc = $(document).height() - $('.sec1').height() - $('.header-content').height()
            $('.dir').addClass('searchIsOpen');
            $('.sec1 .footer-content div').removeClass('abierto');
            $(this).addClass('abierto')
            var $inputsBar = $('.sec1 .dir:hidden');
            $inputsBar.fadeIn();
            $('#txDesde,#txHasta').hide();
            $('#txBusqueda').fadeIn();
            $('#txBusqueda').val('').attr('placeholder','Ingrese ubicación a buscar').focus().addClass('autocomplete')
            $('#txBusqueda').val(currentDirText);
            $('#txBusqueda.autocomplete').autocomplete({
                source: direcciones,
                position: { my: "left bottom", at: "left top", collision: "flip" }
            });
            $('#ui-id-1').css('height',$_calc-120);
            //buscar();
        }
    });

    $('#txBusqueda, #txDesde, #txHasta').keypress(function(e){
        if (e.keyCode == 13) {

            try{limpiarRuta();}catch(err){}

            if($('.goToBtn').length > 0){
                $('.goToBtn').remove();
            }

            if ($(this).attr('id') == 'txBusqueda'){
                var zoom = 18;
                $('#txDesde, #txHasta').val('');
                $('.pasos').hide();
                globalModoBusqueda=1;
                buscar(zoom);
                pasosOcultar();
                return false;
            }else{
                buscar(zoom);
                return false;
            }
            $('.sec1 div.abierto').removeClass('abierto');
            $('.sec1 div .tooltip').hide();
        }
    });

    $('.closeRuta a').on('touchstart',function(e){
        e.preventDefault();
        limpiarRuta();
    })

    $(document).on('touchstart','.goToBtn a',function(e){
        e.preventDefault();
        if($('#txHasta').val() == '' || $('#txDesde').val() == ''){
            if($('#txDesde').val() == ''){
                $('#txDesde').attr('placeholder','Complete este campo');
            }
            if($('#txHasta').val() == ''){
                $('#txHasta').attr('placeholder','Complete este campo');
            }
            setTimeout(function(){
                $('#txDesde').attr('placeholder','Desde');
                $('#txHasta').attr('placeholder','Hasta');
                $('#txHasta').focus();
            },1000)
        }else{
            $('.goToBtn').remove();
            buscar();
            $('.sec1 div.abierto').removeClass('abierto');
            $('.sec1 div .tooltip').hide();
        }
    })

    $('.buscarBtn').on('touchstart',function(e){
        e.preventDefault()
        if(!$('#txBusqueda').val()){
            $('#txBusqueda').attr('placeholder','Complete este campo')
            setTimeout(function(){
                $('#txBusqueda').attr('placeholder','Ingrese ubicación a buscar');
                $('#txBusqueda').focus();
            },1000)
        }else{
            var zoom = 18;
            $('#txDesde, #txHasta').val('');
            $('.pasos').hide();
            globalModoBusqueda=1;
            buscar(zoom);
            pasosOcultar();
        }
    })


    //function closeRuta(e){
    //    e.preventDefault();
    //    try{
    //        directionsDisplay.setMap(null);
    //        geoMarker.setMap(null);
    //        geoMarkerStart.setMap(null);
    //        geoMarkerEnd.setMap(null);
    //    }catch(err){}
    //    pasosOcultar();
    //    centerMapCurrentLoc();
    //    map.setZoom(14);
    //    mostrandoRuta = false;
    //}
}