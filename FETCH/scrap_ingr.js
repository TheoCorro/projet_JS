var url="https://us.openfoodfacts.org/categories.json";
var src=[];
var cat={};
var count=[];
const reducer = (accumulator, currentValue) => accumulator + currentValue;
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
                            $('.response').add('<input type="text" id="ingreds">');
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
    console.log(cat);
    var nutriments = [[],[],[],[],[],[],[]];
    $.each(cat,function(index,value){
        nutriments[0]+=int(value['nutriments']['energy_100g']);// energy kcal
        nutriments[1]+=int(value['nutriments']['salt_100g']);// salt
        nutriments[2]+=int(value['nutriments']['protein_100g']);// protein
        nutriments[3]+=int(value['nutriments']['calcium_100g']);// calcium
        nutriments[4]+=int(value['nutriments']['satured_fat']);// fat
        nutriments[5]+=int(value['nutriments']['iron_100g']);// iron
        console.log(nutriments);
    });
    //$.each(nutriments,function(index,value){ nutriments[index]=value / nutriments[index].length; });
        $('#alim_caracs').html($('#alim_caracs').html()+"<p> Energy : "+nutriments[0].reduce(reducer)+"</p>");
        $('#alim_caracs').html($('#alim_caracs').html()+"<p> Salt : "+nutriments[1].reduce(reducer)+"</p>");
        $('#alim_caracs').html($('#alim_caracs').html()+"<p> Fat : "+nutriments[4].reduce(reducer)+"</p>");
        $('#alim_caracs').html($('#alim_caracs').html()+"<p> Protein : "+nutriments[2].reduce(reducer)+"</p>");
        $('#alim_caracs').html($('#alim_caracs').html()+"<p> Calcium : "+nutriments[3].reduce(reducer)+"</p>");
        $('#alim_caracs').html($('#alim_caracs').html()+"<p> Iron : "+nutriments[5].reduce(reducer)+"</p>");
    //get_beers();
}



// va chercher les biéres associées à l'aliment
function get_beers(){
    alim=$('#research').val();
    var url="https://api.punkapi.com/v2/beers?food=".concat(alim.replace(/ /g,'%20'));
    fetch(url).then(
        function(response){
            response.json().then(
                function(data){
                    var malt ="";
                    for (i in data) {
                            if(data[i].name != null && data[i].image_url != null &&  data[i].description != null ){
                                malt += '<li style="font-size:30px" >' +data[i].name+ '</li><img width="30px" height="60px" src='+data[i].image_url+'><li>' +data[i].description + '</li>';
                            } 
                    }
                    $('#brew').html(malt);
                }
            );
        }
    );
}


