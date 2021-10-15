//CONTAINER TO STORE ALL THE POKEMON CARDS DISPLAYED ON THE SCREEN
const pokemonContainer = document.getElementById("content-container");

//ARRAY FOR TO STORE ALL THE POKEMON NAMES
let entirePokemonArray = [];

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
    //fetches hoenn pokemons by offsetting the search index 386 pokemons and limiting
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
    //fetches hoenn pokemons by offsetting the search index 493 pokemons and limiting
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
    //fetches hoenn pokemons by offsetting the search index 649 pokemons and limiting
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
    //fetches hoenn pokemons by offsetting the search index 721 pokemons and limiting
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
    //fetches hoenn pokemons by offsetting the search index 809 pokemons and limiting
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
    const type = pokemon.types.map(type => type.type.name).join(", ");
    const move = document.createElement('div');
    const stat = document.createElement('div'); 
    const ability = document.createElement('div');

    getMoves(pokemon.id, move);
    getStats(pokemon.id, stat);
    getAbilities(pokemon.id, ability);
    getEvolutionTree(pokemon.id)

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
                <p class = "ability">
                <div class = "move-set-container">
                    <p class = "move">${move}</p>
                </div>
            </div>
        </div> 
    </div> `;
    pokemonContainer.innerHTML = htmlString + pokemonContainer.innerHTML;
}

//closes the card popup
const closePopup = () =>
{
    const popup = document.querySelector(".popup");
    popup.parentElement.removeChild(popup);
}

function getMoves(id, htmlElement)
{
    let moveSet = document.createElement("p");
    $.getJSON(`https://pokeapi.co/api/v2/pokemon/${id}`, function(data) {
        for(let move of data.moves)
        {
            console.log(move.move.name);
            moveSet.innerText = move.move.name;
            htmlElement.append(moveSet);
        }
      }).fail(function() {
        console.log("We couldn't find that pokemon's moves.")
    })
}

function getStats(id, htmlElement)
{
    $.getJSON(`https://pokeapi.co/api/v2/pokemon/${id}`, function(data) {
        for(let stat of data.stats)
        {
            console.log(stat.stat.name, stat.base_stat);
        }
      }).fail(function() {
        console.log("We couldn't find that pokemon's stats.")
    })
}

function getAbilities(id, htmlElement)
{
    $.getJSON(`https://pokeapi.co/api/v2/pokemon/${id}`, function(data) {
        for(let ability of data.abilities)
        {
            console.log(ability.ability.name);
        }
      }).fail(function() {
        console.log("We couldn't find that pokemon's abilities.")
    })
}

function getEvolutionTree(id)
{
    $.getJSON(`https://pokeapi.co/api/v2/evolution-chain/${id}`, function(data) {
        let keys  = Object.keys(data)
        console.log(keys)
        for(let key of keys)
        {
            let createDiv = document.createElement('div');
        }
      }).fail(function() {
        console.log("We couldn't find that pokemon's abilities.")
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

//emptys the page and updates it with the new pokemons
function updatePage()
{
    pokemonContainer.innerHTML = '';
}

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

    function removeActive(x)
    {
        for(let i = 0; i < x.length; i++)
        {
            x[i].classList.remove("search-containers-active");
        }
    }

    function closeAllLists(element)
    {
        var x = document.getElementsByClassName("autocomplete-elements");
        for(let i = 0; i < x.length; i++)
        {
            if(element != x[i] && element != input)
            {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function(e)
    {
        closeAllLists(e.target);
    });
}

//SEARCH AND DISPLAY
function searchPokemon()
{
    let search = document.getElementById("pokemon-search");
    let pokemonName = document.getElementById("pokemon-name").value;
    pokemonName.toLowerCase();
    search.addEventListener("click", function(){
        if(pokemonName !== "")
        {
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(response => response.json())
            .then(function(allpokemon)
            {
                allpokemon.results.forEach(function(pokemon)
                {
                    fetchData(pokemon);
                    console.log(pokemon.name)
                })
            })
        }
    })
}

// $(function() 
// {
//     $("#pokemon-search").click(function () {
//         let pokemonName = $("#pokemon-name").val()
//         pokemonName.toLowerCase();
//         if (pokemonName !== '') {
//             $.getJSON(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
//                 function (data) {
//                     console.log('data: ', data)
//                 }).fail(function () {
//                     alert("That pokemon does not exist or you entered an invalid value!");
//                 })
//         }
//         //reset the input
//         $('#pokemon-name').val('')
//     })
// })

fetchPokemons();
autocomplete(document.getElementById('pokemon-name'), entirePokemonArray);

