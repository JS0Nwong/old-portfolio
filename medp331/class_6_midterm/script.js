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

//CONTAINER TO STORE ALL THE POKEMON CARDS DISPLAYED ON THE SCREEN
const pokemonContainer = document.getElementById("content-container");

function searchPokemon()
{
    $("#pokemon-search").click(function() {
        let pokemonName = $("#pokemon-search").val();
        if(pokemonName !== '')
        {

        }
    })   
}

//FILTER KANTO
document.getElementById('filter-kanto').addEventListener("click", function()
{
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(function(allpokemon)
    {
       allpokemon.results.forEach(function(pokemon)
       {
           fetchData(pokemon);
           updatePage();
       })
   })
})

//FILTER JOHTO
document.getElementById('filter-johto').addEventListener("click", function()
{
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=151')
    .then(response => response.json())
    .then(function(allpokemon)
    {
       allpokemon.results.forEach(function(pokemon)
       {
           fetchData(pokemon);
           updatePage();
       })
   })
})

//FILTER HOENN
document.getElementById('filter-hoenn').addEventListener("click", function()
{
    fetch('https://pokeapi.co/api/v2/pokemon?limit=135&offset=251')
    .then(response => response.json())
    .then(function(allpokemon)
    {
       allpokemon.results.forEach(function(pokemon)
       {
           fetchData(pokemon);
           updatePage();
       })
   })
})

//FILTER SINNOH
document.getElementById('filter-sinnoh').addEventListener("click", function()
{
    fetch('https://pokeapi.co/api/v2/pokemon?limit=107&offset=386')
    .then(response => response.json())
    .then(function(allpokemon)
    {
       allpokemon.results.forEach(function(pokemon)
       {
           fetchData(pokemon);
           updatePage();
       })
   })
})

//FILTER UNOVA
document.getElementById('filter-unova').addEventListener("click", function()
{
    fetch('https://pokeapi.co/api/v2/pokemon?limit=156&offset=493')
    .then(response => response.json())
    .then(function(allpokemon)
    {
       allpokemon.results.forEach(function(pokemon)
       {
           fetchData(pokemon);
           updatePage();
       })
   })
})

//FILTER KALOS
document.getElementById('filter-kalos').addEventListener("click", function()
{
    fetch('https://pokeapi.co/api/v2/pokemon?limit=72&offset=649')
    .then(response => response.json())
    .then(function(allpokemon)
    {
       allpokemon.results.forEach(function(pokemon)
       {
           fetchData(pokemon);
           updatePage();
       })
   })
})

//FILTER ALOLA
document.getElementById('filter-alola').addEventListener("click", function()
{
    fetch('https://pokeapi.co/api/v2/pokemon?limit=86&offset=721')
    .then(response => response.json())
    .then(function(allpokemon)
    {
       allpokemon.results.forEach(function(pokemon)
       {
           fetchData(pokemon);
           updatePage();
       })
   })
})

//FILTER GALAR
document.getElementById('filter-galar').addEventListener("click", function()
{
    fetch('https://pokeapi.co/api/v2/pokemon?limit=89&offset=809')
    .then(response => response.json())
    .then(function(allpokemon)
    {
       allpokemon.results.forEach(function(pokemon)
       {
           fetchData(pokemon);
           updatePage();
       })
   })
})

//FILTER ALL
document.getElementById('filter-all').addEventListener("click", function()
{
    fetch('https://pokeapi.co/api/v2/pokemon?limit=898')
    .then(response => response.json())
    .then(function(allpokemon)
    {
       allpokemon.results.forEach(function(pokemon)
       {
           fetchData(pokemon);
           updatePage();
       })
   })
})


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
        render(pokemondata);
    })
}

function render(data)
{
    const cardContainer = document.createElement("div");
    cardContainer.classList.add('card');
    cardContainer.setAttribute("onclick", `selectPokemon(${data.id})`);

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
        <div class="popup-card" id = "popup">
            <div class = "scroll-bar-container">
                <div class = "scroll-bar" id = "scrollbar"></div>
            </div>
            <div class = "card-content">
                <h2 class="card-title">${pokemon.name}</h2>
                <img class="card-image" src="${pokemon.sprites["front_default"]}"/> 
                <p class = "type">Type: ${type} | Height: ${pokemon.height} | Weight: ${pokemon.weight}</p>
                <p class = "stat">${stat}</p>    
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

function updatePage()
{
    pokemonContainer.innerHTML = "";
}

fetchPokemons();