var deviceInfo;
var ocultarChrome = false;
var app = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;


$(document).ready(function () {
    //$('input').blur();

    eventosGenerales();

    eventosDetail();

    cargarPaises();

    eventosBusqueda();

    eventosFiltro();

    eventosPasos();

    eventosPromociones();
});


document.addEventListener("deviceready", detectOs(), false);

function detectOs() {
    var deviceType = (navigator.userAgent.match(/iPad/i)) == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i)) == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";

    deviceInfo = deviceType
}

function isFirstTimeOpen(data){
    if (data == null){
        openPopUpBases()
    }else{

    }
}

function openPopUpBases(){
    if (isMobile()) {
        $('div.detail-bg').css('height', $(window).height()).show();
        $('div.detail').show().addClass('bases');

        $('.detail .titulo1').html('<span style="font-size: 20px;display: block;text-align: center;padding: 10px 0 0 ;position: relative;">T&eacute;rminos y Condiciones Generales de Uso</span>')
        $('.detail .titulo2').html('')
        $('.detail .img-background .tipo').hide()
        $('.detail .group,.detail .linea,.detail .linea2,.detail .linea3,.detail .comollegar,.detail .tel, .detail .web, .detail .distancia,.img-background,.detail .cerrar').hide()

        var text = $('#basesText div').clone()

        text.css('height', $('.detail').height() - 190 + 'px').css({
            position: 'realtive', top: -60
        })

        $('.estado').html(text)

        $(document).on('click touchstart', '.acept', function () {
            hideDetail();
            $('.detail.bases').removeClass('bases')
            window.localStorage.setItem('firstTime', '1');
        })
    }
}