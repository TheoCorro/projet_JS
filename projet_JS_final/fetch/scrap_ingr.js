var url="https://us.openfoodfacts.org/categories.json";
var src=[];
var cat={};
var count=[];
const reducer = (accumulator, currentValue) => accumulator + currentValue;
function isEmpty(ar){
    if (Array.isArray(ar) && ar.length) { return true;}
    else{    return false;}
}
// fetch pour l'autocomplete
fetch(url).then(
    function(response){
        response.json().then(
            function(data){
                var count=[]
                $.each(data['tags'],function(index,value){
                    src.push(value['name']);
                });
            }
        )
    }
);
// fetch pour l'input : autocomplete

// autocomplete
$(document).ready(function(){
    $('#research').autocomplete({
        source:src,
        select:function(event,ui){
            item=ui['item']['value'];
            console.log(item);
            var url=`https://us.openfoodfacts.org/category/`.concat(item.replace(/ /g,'%20'))+`.json`;
            console.log(url);
            fetch(url).then(
                function(response){
                    response.json().then(
                        function(data){
                            cat=data['products'];
                            console.log(cat);
                            $('.response').add('<input type="text" id="ingreds" ');
                        }
                    )
                }
            );
        }
    });
});

// fouille un array pour renvoyer les valeurs uniques
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

// sélectionne les aliments à fouiller dans la catégorie sélectionner
function checkCat(){
    $('#my_liste').html(`<OPTION> --- Select an ingredient ---</OPTION>`);
    $('#alim_caracs').html('');
    console.log(cat);
    var nutriments = [[],[],[],[],[],[],[]];
    $.each(cat,function(index,value){
        if(value['nutriments']['energy_100g']){nutriments[0].push(Number(value['nutriments']['energy_100g']))};// energy kcal
        if(value['nutriments']['salt_100g']){nutriments[1].push(Number(value['nutriments']['salt_100g']))};// salt
        if(value['nutriments']['protein_100g']){nutriments[2].push(Number(value['nutriments']['protein_100g']))};// protein
        if(value['nutriments']['calcium_100g']){nutriments[3].push(Number(value['nutriments']['calcium_100g']))};// calcium
        if(value['nutriments']['satured_fat']){nutriments[4].push(Number(value['nutriments']['satured_fat']))};// fat
        if(value['nutriments']['iron_100g']){nutriments[5].push(Number(value['nutriments']['iron_100g']))};// iron
        
    });
    console.log(nutriments);
    if(isEmpty(nutriments[0])){
        console.log('Energy '+nutriments[0]);
        $('#alim_caracs').html($('#alim_caracs').html()+"<p> Energy : "+nutriments[0].reduce(reducer)/nutriments[0].length+" kcal pour 100g</p>");
    }
    if(isEmpty(nutriments[1])){
        console.log('Salt ' +nutriments[1]);
        $('#alim_caracs').html($('#alim_caracs').html()+"<p> Salt : "+nutriments[1].reduce(reducer)/nutriments[1].length+" g pour 100g</p>");
    }
    if(isEmpty(nutriments[4])){
        console.log(' Fat '+nutriments[4]);
        $('#alim_caracs').html($('#alim_caracs').html()+"<p> Fat : "+nutriments[4].reduce(reducer)/nutriments[4].length+" g pour 100g</p>");
    }
    if(isEmpty(nutriments[2])){
        console.log('Protein '+nutriments[2]);
        $('#alim_caracs').html($('#alim_caracs').html()+"<p> Proteins : "+nutriments[2].reduce(reducer)/nutriments[2].length+" g pour 100g</p>");
    }
    if(isEmpty(nutriments[3])){
        console.log('Calcium '+nutriments[3]);
        $('#alim_caracs').html($('#alim_caracs').html()+"<p> Calcium : "+nutriments[3].reduce(reducer)/nutriments[3].length+" mg pour 100g</p>");
    }
    if(isEmpty(nutriments[5])){
        console.log('Iron '+nutriments[5]);
        $('#alim_caracs').html($('#alim_caracs').html()+"<p> Iron : "+nutriments[5].reduce(reducer)/nutriments[5].length+" mg pour 100g</p>");
    }
    get_beers();
}



// va chercher les biéres associées à l'aliment
function get_beers(){
    alim=$('#research').val(); 

    var url="https://api.punkapi.com/v2/beers?food=".concat(alim.replace(/\s.*/,'').replace(/ /g,'%20').toLowerCase());
    console.log('Beers :');
    console.log(url);
    fetch(url).then(
        function(response){
            response.json().then(
                function(data){
                    var malt ="";
                    i=0;
                    j=0;
                    while (j<3 && data[i]) {
                            if(data[i].name != null && data[i].image_url != null &&  data[i].description != null ){
                                malt += '<p id = "malt" style="font-size:30px" >' +data[i].name+ '</p><img width="80px" height="200px" src='+data[i].image_url+'><p id="lagger">' +data[i].description + '</p>';
                                j++;
                            } 
                            i++;
                    }
                    console.log(malt);
                    $('#brew').html(malt);
                }
            );
        }
    );
}


