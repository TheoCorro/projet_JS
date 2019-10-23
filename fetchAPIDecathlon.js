var sportElt = document.getElementById("sport");

fetch('https://sports.api.decathlon.com/sports/recommendations/geolocation?coordinates=-73.582,45.511')
.then(response => response.json())
.then(data => {
  console.log(data) // Prints result from `response.json()` in getRequest
    //var sports = JSON.parse(data);
    data.forEach(function (article) {
        // Ajout du titre et du contenu de chaque article
        var titreElt = document.createElement("h2");
        titreElt.textContent = article.id;
        var contenuElt = document.createElement("p");
        contenuElt.textContent = article.attributes.name;
		var descriptionElt = document.createElement("p");
		descriptionElt.textContent = article.attributes.description	;
		var iconElt = document.createElement("p");
		iconElt.textContent = article.attributes.icon	;
		
        //sportElt.appendChild(titreElt);
        sportElt.appendChild(contenuElt);
		sportElt.appendChild(descriptionElt);
		sportElt.appendChild(iconElt);
    });
	
	
})
.catch(error => console.error(error))



