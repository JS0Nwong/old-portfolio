//CONTAINER TO STORE ALL THE POKEMON CARDS DISPLAYED ON THE SCREEN
const pokemonContainer = document.getElementById("content-container");

//ARRAY FOR TO STORE ALL THE POKEMON NAMES
let entirePokemonArray = [];

const colors = {
    normal:'#A6A86D',
    fire:'#FF7B25',
    water:'#6D92F9',
    grass: '#78C84B',
    electric: '#F2D037',
    ice: '#94D9DC',
    fighting:'#BD3723',
    poison: '#A2449D',
    ground: '#E3C172',
    flying: '#A88FF1',
    psychic: '#FE5786',
    bug: '#A9BD10',
    rock: '#BBA130',
    ghost: '#6A5092',
    dark: '#6D5A4B',
    dragon: '#773BF5',
    steel: '#B9BAC6',
    fairy: '#F2B9BC',
}

//FILTER KANTO
document.getElementById('filter-kanto').addEventListener("click", function()
{
    //fetches kanto pokemons by limiting it to the first 151 pokemons
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
    //fetches johto pokemons by offsetting the search index 151 pokemons and limiting
    //the search result to 100 pokemons
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
    //fetches hoenn pokemons by offsetting the search index 251 pokemons and limiting
    //the search result to 135 pokemons
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
    //fetches sinnoh pokemons by offsetting the search index 386 pokemons and limiting
    //the search result to 107 pokemons
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
    //fetches unova pokemons by offsetting the search index 493 pokemons and limiting
    //the search result to 156 pokemons
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
    //fetches kalos pokemons by offsetting the search index 649 pokemons and limiting
    //the search result to 72 pokemons
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
    //fetches alola pokemons by offsetting the search index 721 pokemons and limiting
    //the search result to 86 pokemons
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
    //fetches galar pokemons by offsetting the search index 809 pokemons and limiting
    //the search result to 89 pokemons
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
    //calls fetchPokemons() since it already gets all pokemons
    fetchPokemons();
    updatePage();
})

const fetchPokemons = async() =>
{
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151') // CHANGE THE LIMIT BACK TO 898 LATER 
     .then(response => response.json())
     .then(function(allpokemon)
     {
        allpokemon.results.forEach(function(pokemon)
        {
            fetchData(pokemon); 
            entirePokemonArray.push(pokemon.name);
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
    const mainTypes = Object.keys(colors);
    const getTypes = data.types.map(el => el.type.name);
    const typeColor = mainTypes.find(type => getTypes.indexOf(type) > -1);
    const color = colors[typeColor];

    const cardContainer = document.createElement("div");
    cardContainer.classList.add('card');
    
    cardContainer.setAttribute("onclick", `selectPokemon(${data.id})`);

    const name = document.createElement("h4");
    name.classList.add('pokemon-name');

    const number = document.createElement("p");
    number.classList.add('number')

    const type = document.createElement("div");
    type.classList.add('types');
    cardContainer.style.backgroundColor = color;

    const sprite = document.createElement("img");
    sprite.setAttribute("src", data.sprites.front_default);
    sprite.setAttribute("loading", "auto");
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
    const type = pokemon.types.map(type => type.type.name).join(", ");   
    const statValues = pokemon.stats.map(stat => stat.base_stat);
    const ability = pokemon.abilities.map(ability => ability.ability.name).join(', ');

    getSpecies(pokemon.id);
    getMoves(pokemon.id);

    const htmlString = ` 
    <div class="popup container-fluid"> 
        <button class = "close-button" id="closeBtn" onclick="closePopup()"><i class="fas fa-times"></i></button> 
        <div class="popup-card" id = "popup">
            <div class = "card-content">
                <div class = "row">
                    <div class = "col-md-4 basic-information">
                        <img class="card-image" src="${pokemon.sprites["front_default"]}"/> 
                        <h2 class="card-title">${pokemon.name} #${pokemon.id}</h2>
                        <div class = "stats-container" id = "statistic">
                            <p class = "type">Type: <span>${type}</span></p>
                            <p class = "type">Height: <span class = "height">${pokemon.height} m</span></p>
                            <p class = "type">Weight: <span class = "weight">${pokemon.weight} kg</span></p>
                            <p class = "ability">Abilities: <span>${ability}</span></p>
                            <div class = "whitespace"></div>
                            
                            <h1>Statistics: </h1>
                            <p class = "stat">HP: <span>${statValues[0]}</span></p>
                            <p class = "stat">Attack: <span>${statValues[1]}</span></p>
                            <p class = "stat">Defense: <span>${statValues[2]}</span></p>
                            <p class = "stat">Special-Attack: <span>${statValues[3]}</span></p>
                            <p class = "stat">Special-Defense: <span>${statValues[4]}</span></p>
                            <p class = "stat">Speed: <span>${statValues[5]}</span></p>
                            <div class = "whitespace"></div>
                        </div>
                    </div> 
                    <div class = "col-md-8 pokemon-information">
                        <div class = "row">
                            <div class = "biography">
                                    <h1>Biography: </h1>
                                    <p class = "flavor-text">Flavor Text: <span id = "flavor-text"> </span></p>
                                    <p class = "flavor-text">Habitat: <span class = "habitat" id = "habitat"></span></p>
                                    <p class = "flavor-text">Capture Rate: <span class = "habitat" id = "capture"></span>%</p>
                                </div>
                            </div>
                            
                            <div class = "whitespace"></div>
    
                            <div class = "row">
                                <h1 class = "evolution-header">Evolution Chain: </h1>
                                <div class = "evolutions" id = "evolutions"></div>
                            </div>
                            
                            <div class = "whitespace"></div>
                            <h1>Move Set: </h1>
                            <div class = "row" id = "moves-row">
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div> 
    </div> `;
    pokemonContainer.innerHTML = htmlString + pokemonContainer.innerHTML;
}

const getMoves = async id => 
{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();

    for(let move of pokemon.moves)
    {
        let para = document.createElement('p');
        let span = document.createElement('span');
        const movesUrl = `https://pokeapi.co/api/v2/move/${move.move.name}`;
        const movesRes = await fetch(movesUrl);
        const type = await movesRes.json();

        span.innerText = type.type.name;
        span.style.backgroundColor = colors[type.type.name];

        $(span).css({
            'borderRadius': '5px',
            'width': '120px',
            'fontWeight': 'bold',
            'textAlign': 'center',
        })

        para.innerText = move.move.name;
        para.appendChild(span);
        para.classList.add('move');
        $("#moves-row").append(para)
    }
}

function getSpecies(id)
{
    $.getJSON(`https://pokeapi.co/api/v2/pokemon-species/${id}`, function(data) {
        let url = data.evolution_chain;
        console.log(data);
        getEvolutionTree(url);
        getHabitat(data.habitat);
        $("#capture").append(data.capture_rate)
        for(let description of data.flavor_text_entries)
        {
            if(description.language.name == "en" && description.version.name == "y")
            {
                console.log(description);
                $("#flavor-text").append(description.flavor_text);
            }
        }
        
      }).fail(function() {
        console.log("We couldn't find that pokemon's evolution chain.")
        $("#flavor-text").append("Sorry we could not get the flavor text of this pokemon");
    })
}

function getEvolutionTree(url)
{
    $.getJSON(url, function(data) {
        var evoChain = [];
        var evoData = data.chain;

        do{
            var evoDetails = evoData['evolution_details'][0];

            evoChain.push({
                "species_name": evoData.species.name,
                "min_level": !evoDetails ? 1 : evoDetails.min_level,
                "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
                "item": !evoDetails ? null : evoDetails.item,
            });
            evoData = evoData['evolves_to'][0];
        } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
        getEvolutionDetails(evoChain);
      }).fail(function() {
        console.log("We couldn't find that pokemon's evolution chain.")
    })
}

function getEvolutionDetails(array)
{
    for(let i = 0; i < array.length; i++)
    {
        $.getJSON(`https://pokeapi.co/api/v2/pokemon/${array[i].species_name}`, function(data) {
            const div = `<div class = "col-md-4 evolution-container">
                <img class = "evolution-img" src = ${data.sprites.front_default}>
                <h3>${array[i].species_name}</h3>
                <p>Level: ${array[i].min_level}</p>
            </div>
            <i class="fas fa-arrow-right"></i>
            `;

            const endDiv = `<div class = "col-md-4 evolution-container">
                <img class = "evolution-img" src = ${data.sprites.front_default}>
                <h3>${array[i].species_name}</h3>
                <p>Level: ${array[i].min_level}</p>
            </div>
            `;

            if(i + 1 != array.length)
            {
                $('#evolutions').append(div);
            }
            else if(i + 1 == array.length)
            {
                $('#evolutions').append(endDiv)
            }
          }).fail(function() {
            alert("We could not get the detailed information of this pokemon!");
        })
    }
}

function getHabitat(habitat)
{
    $("#habitat").append(habitat.name);
}

//closes the card popup
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
        typeList.classList.add("little-bit-of-margin");
        typeList.innerText = type.type.name;
        div.append(typeList);
    })
}

//emptys the page and updates it with the new pokemons
function updatePage()
{
    pokemonContainer.innerHTML = '';
}

document.getElementById('pokemon-search').addEventListener("click", searchPokemon);

//SEARCH FUNCTIONALITY
function searchPokemon()
{
    let name = document.getElementById("pokemon-search-name").value
    if(name != '')
    {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        .then(response => response.json())
        .then(function(pokemondata)
        {
            console.log(pokemondata);
            updatePage();
            render(pokemondata);
        })
    }
    else
    {
        window.alert("Please enter a name of a pokemon!");
        alert("Please enter a name of a pokemon")
    }
    console.log(name);
}

//AUTO COMPLETE FUNCTIONALITY
function autocomplete(input, array)
{
    var currentFocus;
    input.addEventListener("input", function(e)
    {
        var a, b, i, val = this.value;
        closeAllLists();

        if(!val)
        {
            return false;
        }
        currentFocus = -1;

        a = document.createElement("div");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-elements");

        this.parentNode.append(a);

        for(i = 0; i < array.length; i++)
        {
            if(array[i].substr(0, val.length).toLowerCase() == val.toLowerCase())
            {
                b = document.createElement('div');
                b.innerHTML = "<strong>" + array[i].substr(0, val.length) + "</strong>";
                b.innerHTML += array[i].substr(val.length);
                b.innerHTML += "<input type = 'hidden' value = '" + array[i] + "'>";
                b.addEventListener("click", function(){
                    input.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });

    input.addEventListener("keydown", function(e)
    {
        var x = document.getElementById(this.id + "autocomplete-list");
        if(x)
        {
            x = x.getElementsByTagName("div");
        }
        if(e.keyCode == 40)
        {
            currentFocus++;
            addActive(x);
        }
        else if(e.keyCode == 38)
        {
            currentFocus--;
            addActive(x)
        }
        else if(e.keyCode == 13)
        {
            e.preventDefault();
            if(currentFocus > -1)
            {
                if(x) x[currentFocus].click();
            }
        }
    });

    function addActive(x)
    {
        if(!x) return false;
        removeActive(x);
        if(currentFocus >= x.length) currentFocus = 0;
        if(currentFocus < 0) currentFocus = (x.length -1);
        x[currentFocus].classList.add("autocomplete-active");
    }
}


