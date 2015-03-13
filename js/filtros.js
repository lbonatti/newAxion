
function cargarFiltros(){
    var res="";

    $.each(filtros, function(index, filtro) {
        res += '<div data-checked="0" data-filtro="'+index+'"><img src="'+filtro.icon+'" />'+filtro.nombre+'</div>';
    });

    $('.bf-items').html(res);

    $('.bf-items div').on('touchstart',function(e){
        if($(this).attr('data-checked')=="1"){
            $(this).css('background-image','url(img/unchecked.png)');
            $(this).attr('data-checked','0');
            $('.bf-todos').css('background-image','url(img/unchecked.png)').attr('data-checked','0');
        }else{
            $(this).css('background-image','url(img/checked.png)');
            $(this).attr('data-checked','1');

        }

        e.stopPropagation();
    })
}

function actualizarFiltros(){
    $('.bf-items div').each(function(){
        if(filtros[$(this).attr('data-filtro')].valor){
            $(this).css('background-image','url(img/checked.png)');
            $(this).attr('data-checked','1');
        }else{
            $(this).css('background-image','url(img/unchecked.png)');
            $(this).attr('data-checked','0');
        }
    });
}

function filtrar(){
    $('.bf-items div').each(function(){
        if($(this).attr('data-checked')=="1"){
            filtros[$(this).attr('data-filtro')].valor=true;
        }else{
            filtros[$(this).attr('data-filtro')].valor=false;
        }
    });
    filtrarEstaciones();
    ocultarMenu3();
}

function eventosFiltro(){
    cargarFiltros()

    $('.filtro').on('touchstart',function(e){

        var $inputsBar = $('.sec1 .dir:visible');
        if ( $inputsBar.length && isMobile() ){
            $inputsBar.fadeOut();
        }

        ocultarMenu1();
        ocultarMenu2();
        hideDetail();
        hidePromocionesInicial();

        if($(this).hasClass('abierto')){
            ocultarMenu3()
            if(isMobile()){
                $('#googleMap').show();
            }
        }else{
            $('.bf-container').show();
            $(this).addClass('abierto');
            actualizarFiltros();
            if(isMobile()){
                $('#googleMap').hide();
                $('#container').css('background-color','#861D55');

                pasosCerrar()
            }

        }
        e.stopPropagation();
    });

    $('.bloque-filtro').on('touchstart',function(e){ e.stopPropagation() } );

    $(' .bloque-filtro a.ok').on('touchstart', filtrar);

    $(' a.cancel').on('touchstart',function(e){
        ocultarMenu3();
        var $this = $('.bf-todos')
        $this.css('background-image','url(img/unchecked.png)');
        $this.attr('data-checked','0');
            $('.bf-items div')
                .css('background-image','url(img/unchecked.png)')
                .attr('data-checked','0');
        filtrar();
        e.preventDefault();
    } );

    $('.bf-todos').on('touchstart',function(e){
        if($(this).attr('data-checked')=="1"){
            $(this).css('background-image','url(img/unchecked.png)');
            $(this).attr('data-checked','0');
            $('.bf-items div')
                .css('background-image','url(img/unchecked.png)')
                .attr('data-checked','0');
        }else{
            $(this).css('background-image','url(img/checked.png)');
            $(this).attr('data-checked','1');
            $('.bf-items div')
                .css('background-image','url(img/checked.png)')
                .attr('data-checked','1');
        }
        e.stopPropagation();
    });
}