var currentMarkerId;
function showDetail(idEstacion){
    if (currentDirText){
        console.log(codeAddress(currentDirText, Estaciones[idEstacion].lat,Estaciones[idEstacion].lon));
    }else{
        calculateDistance(Estaciones[idEstacion].lat,Estaciones[idEstacion].lon)
    }

    //pasosCerrar();
    $('div.detail-bg').css('height',$(window).height()).show();

    pasosOcultar();
    /*if(globalX>350){
     $('div.detail').css('left',(globalX-350)+'px')
     }else{
     $('div.detail').css('left',(globalX+30)+'px')
     }
     */


    $('div.detail, div.detail *').show();

    $('.detail .titulo1').html(Estaciones[idEstacion].direccion1);
    $('.detail .titulo2').html(Estaciones[idEstacion].direccion2);
    if(Estaciones[idEstacion].tipo=='axion'){
        $('.detail .tipo').attr('src','img/logo_axion.png');
    }else{
        $('.detail .tipo').attr('src','img/logo_esso.png');
    }
    $('.detail .tipo').show()

    $('.detail .estado').html(Estaciones[idEstacion].estado);
    //$('.detail .distancia').html('Distancia: '+Estaciones[idEstacion].distancia);
    if (Estaciones[idEstacion].telf != '0'){
        $('.detail .tel').html('Tel. '+Estaciones[idEstacion].telf).show()
    }else{
        $('.detail .tel').hide();
    }

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
    });


    $('.detail .combustibles').html(resCombustibles);
    $('.detail .servicios').html(resServicios);
    // $('.detail .promocion').html('');


    currentMarkerId=idEstacion;
    // routeFromGeoToStation(currentMarkerId)

    //pasosCerrar();
    $('.encuesta').show();
}

function hideDetail(){
    $('div.detail').hide();
    $('div.detail-bg').hide();
    $('.encuesta').hide();
}

function eventosDetail(){

    $('div.detail-bg').on('touchstart click',function(){
        hideDetail();
        hidePromocionesInicial()
    });

    $('.detail a.cerrar').on('touchstart click',function(){ hideDetail() });

    $('.detail a.comollegar').on('touchstart click',function(){
        routeFromGeoToStation(currentMarkerId);
        hideDetail();
    })

}
