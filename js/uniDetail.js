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
            "studiengaenge": studiengaenge
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
    var commentList = $('#commentList');
    var studiengaengeBox=$('#studiengaengeBox');
    var map=$('#map');
    console.log(data.uni.rankingU)
    header.html('<div class="col-lg-3 col-md-4 col-xs-4"><h1>'+data.uni.name + "</h1>"+(data.uni.art!=undefined?data.uni.art:'')+"</div>"+'<div style="margin: 5px" id="diagram-id-1" class="diagram col-lg-3 col-md-4 col-xs-4" data-circle-diagram=\'{    "percent": "'+(data.uni.ranking[6]/5.0*100)+'%",        "size": "150",        "borderWidth": "10",        "bgFill": "#cacaca",        "frFill": "#d9534f",        "textSize": "36",        "textColor": "#FFFFFF"}\'></div>' +
        ''+(data.uni.rankingU[6]!=NaN?'<div style="margin: 5px" id="diagram-id-2" class="diagram col-lg-3 col-md-4 col-xs-4" data-circle-diagram=\'{    "percent": "'+(data.uni.rankingU[6]/5.0*100)+'%",        "size": "150",        "borderWidth": "10",        "bgFill": "#cacaca",        "frFill": "#5cb85c",        "textSize": "36",        "textColor": "#FFFFFF"}\'></div>':'')   );
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
    map.html('<img src="http://maps.googleapis.com/maps/api/staticmap?center='+data.uni.name+'&zoom=5&size=500x250&scale=1&sensor=false&maptype=roadmap&format=jpg&markers='+data.uni.name+'">')

    if(data.uni.adresse != null && data.uni.adresse != undefined){
        detailBox.append(data.uni.adresse[0] + "<br>" + data.uni.adresse[1] + "<br>" + data.uni.adresse[2] + "<br>" + data.uni.adresse[3] + "<br>" + data.uni.adresse[4]+ "<br><a href='" + data.uni.adresse[5] +"'>"+ data.uni.adresse[5]+ "</a>");
    }
    
    for (var i = 0; i < data.uni.comments.length; i++) {
        commentList.append('<li class="list-group-item">'+data.uni.comments[i]+'</li>');
    }
};

readData();
fillUniDetailPage();
