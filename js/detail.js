var currentMarkerId;
function showDetail(idEstacion){
    //pasosCerrar();
    $('div.detail-bg').css('height',$(window).height()).show();

    pasosOcultar();
    /*if(globalX>350){
     $('div.detail').css('left',(globalX-350)+'px')
     }else{
     $('div.detail').css('left',(globalX+30)+'px')
     }
     */


    $('div.detail').show();

    $('.detail .titulo1').html(Estaciones[idEstacion].direccion1);
    $('.detail .titulo2').html(Estaciones[idEstacion].direccion2);
    if(Estaciones[idEstacion].tipo=='axion'){
        $('.detail .tipo').attr('src','img/logo_axion.png');
    }else{
        $('.detail .tipo').attr('src','img/logo_esso.png');
    }


    $('.detail .estado').html(Estaciones[idEstacion].estado);
    $('.detail .distancia').html('Distancia: '+Estaciones[idEstacion].distancia);
    $('.detail .tel').html('Tel. '+Estaciones[idEstacion].telf);

    var web = Estaciones[idEstacion].web;
    if (web == "#") {
        web = "";
    }else{
        web = '<a href="'+web+'" target="_blank">'+web+'</a>';
    }

    $('.detail .web').html(web);

    var resCombustibles="";
    var resServicios="";
    $.each(Estaciones[idEstacion].propiedades,function(index,value){
        //console.log($(this));
        if(value){
            //if(filtros[index].tipo=='combustible'){
            //    resCombustibles += '<div><img src="'+filtros[index].icon2+'" /><span>'+filtros[index].nombre+'</span></div>';
            //}
            if(filtros[index].tipo=='servicio'){
                resServicios += '<div><img src="'+filtros[index].icon2+'" /><span>'+filtros[index].nombre+'</span></div>';
            }
        }
    });
    $.each(Estaciones[idEstacion].combustibles,function(index,value){
        resCombustibles += '<div><img src="img/combustible.png" /><span>'+value+'</span></div>';
    })


    $('.detail .combustibles').html(resCombustibles);
    $('.detail .servicios').html(resServicios);
    // $('.detail .promocion').html('');


    currentMarkerId=idEstacion;
    // routeFromGeoToStation(currentMarkerId)

    //pasosCerrar();
}

function hideDetail(){
    $('div.detail').hide();
    $('div.detail-bg').hide();

    pasosMostrar();

}

function eventosDetail(){

    $('div.detail-bg').on('touchstart',function(){
        hideDetail()
        hidePromocionesInicial()
    });

    $('.detail a.cerrar').on('touchstart',function(){ hideDetail() })

    $('.detail a.comollegar').on('touchstart',function(){
        routeFromGeoToStation(currentMarkerId)
        hideDetail();
    })

}
