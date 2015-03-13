var ScrrenOrientation;

function rnd(min,max){
    p = max - min;
    aleat = Math.random() * p;
    return min + aleat;
}

$('.sec1 .lupa').hover(function(){
    $('.sec1 .lupa .tooltip').show();
},function(){$('.sec1 .lupa .tooltip').hide();})

String.prototype.contains = function(it) {
    return this.indexOf(it) != -1;
};

function isMobile(){
    return document.body.clientWidth<=1024;
}


function ocultarMenu1(){ //Menu header
    if(isMobile()){
        $('ul.menu').animate({height:'0px'})
            .removeClass('abierto');
    }
}
function ocultarMenu3(){ //Menu filtros
    $('.bf-container').hide();
    $('.sec1 .filtro').removeClass('abierto');
    $('#googleMap').show();
}


function ocultarMenu2(){ //Menu paises
    $('.menu-pais').hide();
    $('.sec1 .pais').removeClass('abierto');
}

function eventosGenerales(){
    $("body").mousemove(function (e){
        globalX = e.pageX;
        globalY = e.pageY;
    });

    $('.menu-btn').on('touchstart',function(e){
        ocultarMenu2();
        ocultarMenu3();

        if($('ul.menu').hasClass('abierto')){
            ocultarMenu1();
        }else{
            $('ul.menu').animate({height:'136px'})
                .addClass('abierto');
        }
        e.stopPropagation();
    });

    $(document).not('ul.menu').on('touchstart',function(){
        setTimeout(function(){
            ocultarMenu1();
            ocultarMenu2();
            ocultarMenu3();
        },300)
    });


    var _w = $('.preloadMap').width()/2;
    var _h = $('.preloadMap').height()/2;
    $('.preloadMap').css('margin-top',-(_h)).css('margin-left',-(_w))
    $('.preloadMap').fadeIn();
}


//Script que pregunta si quieres cerrar la app cuando están en la primer pantalla
function deviceBackBtn(){

    document.addEventListener("backbutton", function(e){
        showMap()
    }, false);
}

function onConfirm(buttonIndex) {
    if(buttonIndex == 2){
        navigator.app.exitApp();
    }
}

document.addEventListener("offline",isOffLine, false);

function isOffLine(){
    if (deviceInfo != 'iPad' || deviceInfo != 'iPhone') {
        console.log('Android')
        try{
            navigator.notification.alert(
                'La aplicación no puede conectarse a internet. Se intentará reconectarse.', // message
                showLoadingConection(), // callback to invoke with index of button pressed
                'Sin conexión',            // title
                'Cerrar'                  // buttonName
            );
        }catch(err){
            alert('La aplicación no puede conectarse a internet.')
        }
    }else{
        console.log('IOS')
    }
};
function showLoadingConection(){
    $('#googleMap').hide();
    $('.preloadMap').show()
    $('.noConectionPreload').show();
    document.addEventListener("online", onOnline, false);
}

function onOnline() {
    //Cargar el mapa nuevamente...
    location.reload();
}

function showMap(){
    if (mostrandoRuta){
        $('.geo').trigger('touchstart');
    }
    if ($('.detail').length > 0) {
        $('.detail .cerrar').trigger('touchstart')
    }
    $('.sec1 .footer-content > div').each(function(){
        if($(this).hasClass('abierto')){
            $(this).trigger('touchstart');
        }
    })
}