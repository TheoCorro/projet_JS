var sportElt = document.getElementById("food");

fetch('https://world.openfoodfacts.org/api/v0/product/737628064502.json')
.then(response => response.json())
.then(data => 
{
  console.log(data)
		console.log(data['product']['ingredients']);
		data['product']['ingredients'].forEach(function (food) {
			var TextFood = document.createElement("p");
			TextFood.textContent = food.text;
			sportElt.appendChild(TextFood);
    });
	
	
})
.catch(error => console.error(error))