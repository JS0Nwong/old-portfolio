//onload function
$(function() {
    $("#pokemon-search").click(function() {
      let pokemonName = $("#pokemon-name").val()
  
        if (pokemonName !== '') {
          $.getJSON(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`, 
          function(data) {
            console.log('data: ', data)
          }).fail(function() {
            console.log("That pokemon doesn't exist")
        })
      }
      //reset the input
      $('#pokemon-name').val('')
    })
})

function searchPokemon()
{
    let pokemonName = $("#pokemon-search").val();
}

function filterPokemons()
{
    $("filter-kanto").click(function(){

    })
}

let container = document.getElementById("content-container");

const fetchPokemons = async() =>
{

    fetch('https://pokeapi.co/api/v2/pokemon?limit=898')
     .then(response => response.json())
     .then(function(allpokemon)
     {
        allpokemon.results.forEach(function(pokemon)
        {
            fetchData(pokemon); 
        })
    })
    /*const url = "https://pokeapi.co/api/v2/pokemon?limit=898";
    const response = await fetch(url)
    const data = await response.json();

    const pokemon = data.results.map((data, index) => ({
        name: data.name,
        id: data.id,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +
        1}.png`,
        type: data.types,

    }))*/
}

/*const renderElements = (pokemon) => {
    const pokemonString = pokemon.map((item) =>
        `<li class = "card"> <img class = "pokemon-img" src = "${item.image}"/> 
            <a>
            <h2 class="pokemon-name">${item.name}</h2> 
            </a> 
        </li>`
        )
        .join('');
        container.innerHTML = pokemonString; 
};*/

function fetchData(pokemon)
{
    let url = pokemon.url;

    fetch(url)
    .then(response => response.json())
    .then(function(pokemondata)
    {
        console.log(pokemondata);
        render(pokemondata);
    })
}

const pokemonContainer = document.getElementById("content-container");

function render(data)
{
    const cardContainer = document.createElement("div");
    cardContainer.classList.add('card');
    cardContainer.setAttribute("onclick", `selectPokemon(${data.id})`)

    const name = document.createElement("h4");
    name.classList.add('pokemon-name');

    const number = document.createElement("p");
    number.classList.add('number')

    const type = document.createElement("div");
    type.classList.add('types');

    const sprite = document.createElement("img");
    sprite.setAttribute("src", data.sprites.front_default);
    sprite.classList.add("pokemon-img")


    name.innerText = data.name;
    number.innerHTML = `#${data.id}`;


    createTypes(data.types, type);
    if(data.types == "poision")
    {
        type.classList.add("green");
    }

    cardContainer.append(name, number, sprite, type);
    pokemonContainer.append(cardContainer);

}

const selectPokemon = async id => 
{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    cardPopup(pokemon);
}

function cardPopup(pokemon)
{
    console.log(pokemon);
    const type = pokemon.types.map(type => type.type.name).join(", ");

    const htmlString = ` 
    <div class="popup"> 
        <button class = "close-button" id="closeBtn" onclick="closePopup()">Close</button> 
        <div class="popup-card"> 
            <h2 class="card-title">${pokemon.name}</h2> 
            <img class="card-image" src="${pokemon.sprites["front_default"]}"/> 
            <p><small>Type: ${type} | Height:</small> ${pokemon.height} | Weight: ${pokemon.weight}</p> 
        </div> 
    </div> `;
    pokemonContainer.innerHTML = htmlString + pokemonContainer.innerHTML;
}

const closePopup = () =>
{
    const popup = document.querySelector(".popup");
    popup.parentElement.removeChild(popup);
}

//helper function to display the type of the pokemon
function createTypes(types, div)
{
    types.forEach(function(type)
    {
        let typeList = document.createElement('p');
        if(type.name == "posion")
        {
            typeList.classList.add("green");
        }
        typeList.innerText = type['type']['name'];
        if(type)
        div.append(typeList);
    })
}

fetchPokemons();