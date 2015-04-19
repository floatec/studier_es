var data = {};
data.uni = {};

var readData = function () {
    var id = window.location.hash.substring(1);
    $.ajaxSetup({
        async: false
    });
    $.getJSON('unis/uni_' + id + '.json', function (loadedData) {

        var uni = loadedData;
        console.log(uni);
        var id = uni.id;
        var name = uni.name;
        var details = loadedData.address[0];

        var ranking = [];
        for (var i = 0; i < uni.studcheck_rating[0].length; i++) {
            ranking[i] = uni.studcheck_rating == null || uni.studcheck_rating == undefined || !uni.studcheck_rating[0] ? "-" : uni.studcheck_rating[0][i];
        }
        var rankingU = [];
        if(uni.unicheck_rating!=null)
            rankingU = uni.unicheck_rating

        console.log( uni.unicheck_rating)
        var studiengaenge = "";
        for (var j = 0; j < uni.studiengaenge.length; j++) {
            if(uni.studiengaenge[j][1]=="Master"){
                studiengaenge += '<span class="btn btn-success">'+uni.studiengaenge[j][0] + "</span>";
            }else{
                studiengaenge += '<span class="btn btn-warning">'+uni.studiengaenge[j][0] + "</span>";
            }
        }
        var comments = uni.comments;
        data.uni = {
            "id": id,
            "art": uni.art,
            "name": name,
            "adresse": details ,
            "ranking": ranking,
            "rankingU": rankingU,
            "studiengeange": studiengaenge,
            "comments": comments,
            "studiengaenge": studiengaenge,
            "studierende":uni.studierende
        };
    });
};


var fillUniDetailPage = function () {
    var header = $('#uniName');
    var rating1 = $('#rating1');
    var rating2 = $('#rating2');
    var rating3 = $('#rating3');
    var rating4 = $('#rating4');
    var rating5 = $('#rating5');
    var rating6 = $('#rating6');
    var ratingU1 = $('#ratingU1');
    var ratingU2 = $('#ratingU2');
    var ratingU3 = $('#ratingU3');
    var ratingU4 = $('#ratingU4');
    var ratingU5 = $('#ratingU5');
    var ratingU6 = $('#ratingU6');
    var detailBox = $('#detailBox');
    var detailBox2 = $('#detailBox2');
    var commentSpin = $('#commentList');
    var studiengaengeBox=$('#studiengaengeBox');
    var map=$('#map');
    console.log(data.uni.rankingU)
    header.html('<div class="col-lg-3 col-md-4 col-xs-4"><h1>'+data.uni.name + "</h1>"+(data.uni.art!=undefined?data.uni.art:'')+"</div>"+'<div style="margin: 5px" id="diagram-id-1" class="diagram col-lg-3 col-md-4 col-xs-3" data-circle-diagram=\'{    "percent": "'+Math.round(data.uni.ranking[6]/5.0*100)+'%",        "size": "150",        "borderWidth": "10",        "bgFill": "#cacaca",        "frFill": "#d9534f",        "textSize": "36",        "textColor": "#FFFFFF"}\'></div>' +
        ''+(data.uni.rankingU[6]!=undefined?'<div style="margin: 5px" id="diagram-id-2" class="diagram col-lg-3 col-md-4 col-xs-3" data-circle-diagram=\'{    "percent": "'+Math.round(data.uni.rankingU[6]/5*100)+'%",        "size": "150",        "borderWidth": "10",        "bgFill": "#cacaca",        "frFill": "#5cb85c",        "textSize": "36",        "textColor": "#FFFFFF"}\'></div>':'')   );
    $('#diagram-id-1').circleDiagram();
    $('#diagram-id-2').circleDiagram();
    rating1.text(data.uni.ranking[0]);
    rating2.text(data.uni.ranking[1]);
    rating3.text(data.uni.ranking[2]);
    rating4.text(data.uni.ranking[3]);
    rating5.text(data.uni.ranking[4]);
    rating6.text(data.uni.ranking[5]);
    ratingU1.text(data.uni.rankingU[0]);
    ratingU2.text(data.uni.rankingU[1]);
    ratingU3.text(data.uni.rankingU[2]);
    ratingU4.text(data.uni.rankingU[3]);
    ratingU5.text(data.uni.rankingU[4]);
    ratingU6.text(data.uni.rankingU[5]);
    studiengaengeBox.html(data.uni.studiengaenge);
    map.html('<img width="100%" src="http://maps.googleapis.com/maps/api/staticmap?center='+data.uni.name+'&zoom=5&size=1000x250&scale=1&sensor=false&maptype=roadmap&format=jpg&markers='+data.uni.name+'">')

    if(data.uni.adresse != null && data.uni.adresse != undefined){
        detailBox.append(data.uni.adresse[0] + "<br>" + data.uni.adresse[1] + "<br>" + data.uni.adresse[2] + "<br>" + data.uni.adresse[3] + "<br>" + data.uni.adresse[4]+ "<br><a href='" + data.uni.adresse[5] +"'>"+ data.uni.adresse[5]+ "</a>");
    }
    if(data.uni.studierende != null && data.uni.studierende != undefined){
        detailBox2.append( "Anzahl Studierende: " + data.uni.studierende);
    }

    commentS=('<div id="myCarousel" class="carousel slide" data-ride="carousel"> <ol class="carousel-indicators">')
    for (var i = 0; i < data.uni.comments.length; i++) {
        commentS+=('<li data-target="#myCarousel" data-slide-to="'+i+'" class=""></li>');
    }

    commentS+=('</ol><div class="carousel-inner" role="listbox" >')



    for (var i = 0; i < data.uni.comments.length; i++) {
        if(i==0){
            commentS+=('<div class="item active"><div style="margin: 140px"><b style="font-size: 18px">'+((''+data.uni.comments[i]).replace('.','. </b><br>').replace('<a class="readmore" href="','<br><a class="readmore" href="http://www.studycheck.de'))+'</div></div>');
        }else{
            commentS+=('<div class="item "><div style="margin: 140px"><b style="font-size: 18px">'+((''+data.uni.comments[i]).replace('.','. </b><br>').replace('<a class="readmore" href="','<br><a class="readmore" href="http://www.studycheck.de'))+'</div></div>');
        }
    }
    commentS+=('<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a>' +
        '<a class="right carousel-control" href="#myCarousel" role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span> </a></div>')
    commentSpin.append(commentS)
};


readData();
fillUniDetailPage();
