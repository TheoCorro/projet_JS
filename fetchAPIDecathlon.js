var sportElt = document.getElementById("sport");

fetch('https://sports.api.decathlon.com/sports/recommendations/geolocation?coordinates=-73.582,45.511')
// Modif Thierry
.then(response => response.json())
.then(data => {
  console.log(data) // Prints result from `response.json()` in getRequest
    data.forEach(function (article) {
        // Ajout du titre et du contenu de chaque article
        var titreElt = document.createElement("h1");
        titreElt.textContent = article.id;
        var contenuElt = document.createElement("div");
        contenuElt.textContent = article.attributes.name;
		var descriptionElt = document.createElement("p");
		descriptionElt.textContent = article.attributes.description	;
		var iconElt = document.createElement("img");
		//iconElt.textContent = article.attributes.icon;
		iconElt.setAttribute('src', article.attributes.icon);
		iconElt.setAttribute('alt', 'na');
		iconElt.setAttribute('height', '50px');
		iconElt.setAttribute('width', '50px');
		
        //sportElt.appendChild(titreElt);
        sportElt.appendChild(contenuElt);
		sportElt.appendChild(descriptionElt);
		sportElt.appendChild(iconElt);
    });
	
	
})
.catch(error => console.error(error))



