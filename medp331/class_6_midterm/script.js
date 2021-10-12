//onload function
$(function() {
    $("#pokemon-search").click(function() {
      let pokemonName = $("#pokemon-name").val()
  
        if (pokemonName !== '') {
          $.getJSON(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`, 
          function(data) {
            console.log('data: ', data)
            $("#pokemon-image").attr({src: data.sprites.front_default})
            $("#name").text(pokemonName)
            $("#first-evolution").attr({src: data.sprites.front_default})
            $("#second-evolution").attr({src: data.sprites.front_default})
            $("#third-evolution").attr({src: data.sprites.front_default})
          }).fail(function() {
            console.log("that pokemon doesn't exist")
        })
      }
      //reset the input
      $('#pokemon-name').val('')
    })
})

function fetchJohtoPokemon()
{
    
}

function fetchKantoPokemon()
{
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
     .then(response => response.json())
     .then(function(allpokemon)
     {
        allpokemon.results.forEach(function(pokemon)
        {
            fetchData(pokemon); 
        })
    })
}

function fetchData(pokemon)
{
    let url = pokemon.url;

    fetch(url)
    .then(response => response.json())
    .then(function(pokemondata)
    {
        console.log(pokemondata);
        renderElements(pokemondata);
    })
}

function renderElements(data)
{
    let pokemonContainer = document.getElementById("content-container");

    let cardContainer = document.createElement("div");
    cardContainer.classList.add('card');

    let name = document.createElement("h4");
    name.classList.add('pokemon-name');

    let number = document.createElement("p");
    number.classList.add('number')

    let type = document.createElement("div");
    type.classList.add('types');

    let sprite = document.createElement("img");


    name.innerText = data.name;
    number.innerHTML = `#${data.id}`;



    createTypes(data.types, type);

    cardContainer.append(name, number, type);
    pokemonContainer.append(cardContainer);

}

function createTypes(types, div)
{
    types.forEach(function(type)
    {
        let typeList = document.createElement('p');
        typeList.innerText = type['type']['name'];
        div.append(typeList);
    })
}

fetchKantoPokemon();