// Utilisation de l'API OpenfoodFacts
var sportElt = document.getElementById("food");

fetch('https://us.openfoodfacts.org/categories.json')
.then(response => response.json())
.then(data => 
{
		console.log(data)
		var x = document.createElement("SELECT");
		x.setAttribute("id", "cat-select");
		document.body.appendChild(x);
		//console.log(data['product']['ingredients']);
		//data['product']['ingredients'].forEach(function (food)
		data['tags'].forEach(function (food)
			{
				//var TextFood = document.createElement("select");
				//TextFood.select
				//TextFood.textContent = food.text;
				//sportElt.appendChild(TextFood);
					
				var z = document.createElement("option");
				z.setAttribute("value", "volvocar");
				var t = document.createTextNode(food.name);
				z.appendChild(t);
				document.getElementById("cat-select").appendChild(z);
			}
			
		);
})
.catch(error => console.error(error))
