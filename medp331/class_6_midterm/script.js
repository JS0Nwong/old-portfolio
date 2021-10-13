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
    $("#pokemon-search").click(function() {
        let pokemonName = $("#pokemon-search").val();
        if(pokemonName !== '')
        {

        }
    })   
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
}


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
    sprite.classList.add("pokemon-img");

    name.innerText = data.name;
    number.innerHTML = `#${data.id}`;

    createTypes(data.types, type);

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
    
    const move = pokemon.moves.map(move => move.move.name).join(", ");
    const stat = pokemon.stats.map(stat => stat.stat.name).join(", ");

    const htmlString = ` 
    <div class="popup container-fluid"> 
        <button class = "close-button" id="closeBtn" onclick="closePopup()">Close</button> 
        <div class="popup-card">
            <div class = "scroll-bar" id = "scrollbar"></div>
            <div class = "card-content">
                 <h2 class="card-title">${pokemon.name}</h2>
                <p class = "stat">${stat}</p>
                <img class="card-image" src="${pokemon.sprites["front_default"]}"/> 
                <p class = "type">Type: ${type} | Height: ${pokemon.height} | Weight: ${pokemon.weight}</p>    
                <div class = "move-set-container">
                    <p class = "move">${move}</p>
                </div>
            </div>
        </div> 
    </div> `;
    pokemonContainer.innerHTML = htmlString + pokemonContainer.innerHTML;
}

const closePopup = () =>
{
    const popup = document.querySelector(".popup");
    popup.parentElement.removeChild(popup);
}

//helper function to display the stats of the pokemon
function createStats(stats, p)
{
    stats.forEach(function(stat)
    {
        let statInfo = document.createElement('p');
        statInfo.innerText = stat['stat']['name'];
        p.append(statInfo);
    })
}

//helper function to display the type of the pokemon
function createTypes(types, div)
{
    types.forEach(function(type)
    {
        let typeList = document.createElement('p');
        typeList.innerText = type['type']['name'];
        div.append(typeList);
    })
}

function cardScrollListener()
{
    let scrollbar = document.getElementById("scrollbar");
}

fetchPokemons();