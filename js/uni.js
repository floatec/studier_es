var data = {};
data.targetJson = [];

var readData = function () {

    $.ajaxSetup({
        async: false
    });

    // read jsons
    $.getJSON('studienganenge.json', function (loadedData) {
        var readedJsonFile = loadedData;

        // fill each row
        for (var i = 0; i < readedJsonFile.length; i++) {

            var uni = readedJsonFile[i];
            var tempAdresse = uni.address == null || uni.address == undefined || !uni.address[0] ? "-" : uni.address[0][2] + " " + uni.address[0][3];

            var id = uni.id;
            var name = uni.name;
            var adresse = tempAdresse;
            var ranking = uni.studcheck_rating == null || uni.studcheck_rating == undefined || !uni.studcheck_rating[0] ? "-" : uni.studcheck_rating[0][6];
            var studiengaenge = "";
            console.log(uni)
            for (var j = 0; j < (uni.studiengaenge.length<5?uni.studiengaenge.length:5); j++) {
                if(uni.studiengaenge[j][2]=="Master"){
                    studiengaenge += '<span class="btn btn-primary">'+uni.studiengaenge[j][0] + "</span>";
                }else{
                    studiengaenge += '<span class="btn btn-warning">'+uni.studiengaenge[j][0] + "</span>";
                }
            }
            studiengaengeFull=studiengaenge
            //studiengaenge=studiengaenge.substr(0,100)
            if(uni.studiengaenge.length>5){
                studiengaenge=studiengaenge+'<span class="btn btn-default">more...</span>'
            }
            //studiengaengeHTML='    <a  class="btn popoverData" href="#" data-content="'+studiengaengeFull+'" rel="popover" data-placement="bottom" data-original-title="'+name+'" data-trigger="hover">'+studiengaenge+'</a>'


            data.targetJson.push(
                {
                    "id": id,
                    "name": name,
                    "adresse": adresse,
                    "ranking": ranking,
                    "studiengaenge": studiengaenge
                }
            );
            $('.popoverData').popover();
        }
    });


};
var fiilTableData = function () {
    $('#overview').bootstrapTable({
        data: data.targetJson,
        onClickRow: function (row) {
            data.selectedUniId = row.id;
            window.location.href = '    uniDetail.html#' + row.id;
        }
    });
};


readData();
fiilTableData();

