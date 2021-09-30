// simple object operations
let fruit = { "name": "banana" }
console.log('name: ', fruit.name);

let complexFruit = {
    "name": "blueberry",
    "color": "blue",
    "flavor": "sweet"
}
console.log(complexFruit.flavor)

//adding an object to the DOM with innerHTML

function appendBlueberry() {
    let blueberryDescription = O('blueberry')
    blueberryDescription.innerHTML += "<div>Fruit name: " + complexFruit.name + "</div>"
    blueberryDescription.innerHTML += "<div>Fruit color: " + complexFruit.color + "</div>"
    blueberryDescription.innerHTML += "<div>Fruit flavor: " + complexFruit.flavor + "</div>"

}

// using createElement
function createDiv(attribute, fruitProperty) {
    let div = document.createElement("div");
    div.textContent = attribute + ': ' + fruitProperty;
    return div;
}

let orange = { 'name': 'orange', 'color': 'orange', 'flavor': 'citrus' }

function appendOrange() {
    let orangeDescription = O('orange')
    let name = createDiv('Name: ', orange.name);
    let color = createDiv('Color: ', orange.color);
    let flavor = createDiv('Flavor: ', orange.flavor);

    orangeDescription.appendChild(name);
    orangeDescription.appendChild(color);
    orangeDescription.appendChild(flavor);
}

let banana = { 'name': 'banana', 'color': 'yellow', 'flavor': 'depends on how ripe it is' }

// looping over a single object
function appendBanana() {
    let bananaDescription = O('banana')
    let keys = Object.keys(banana);
    console.log('Object keys: ', keys);
    for (let key of keys) {
        let newDiv = createDiv(key, banana[key])
        bananaDescription.appendChild(newDiv);
    }
}

// arrays of objects
let fruitArray = [{ 'name': 'orange', 'color': 'orange', 'flavor': 'citrus' },
{ 'name': 'blueberry', 'color': 'blue', 'flavor': 'sweet' },
{ 'name': 'banana', 'color': 'yellow', 'flavor': 'depends on how ripe it is' }
]

//adding an array of objects to the DOM
function makeFruitLibrary(array) {
    let library = O('fruit-library')
    //clear out the HTML in case we call it again
    library.innerHTML = '';
    for (let fruit of array) {
        let fruitDiv = createDiv('Name: ', fruit.name);
        fruitDiv.className = 'fruit-div';
        let fruitStyle = S(fruitDiv);
        fruitStyle.backgroundColor = fruit.color;
        library.appendChild(fruitDiv);
    }
}
makeFruitLibrary(fruitArray)

let elementArray = document.querySelectorAll('.fruit-div');
console.log('element array: ', elementArray);
// getting an array of DOM elements
function showFruitInformation(HTMLArray, objectArray) {
    for (let i = 0; i < HTMLArray.length; i++) {
        HTMLArray[i].onclick = function () {
            O(HTMLArray[i]).innerHTML += '<br> Flavor: ' + objectArray[i].flavor;
        }
    }
}

showFruitInformation(elementArray, fruitArray)

//adding to our array
function addFruit() {
    let nameInput = O('fruit-name')
    let flavorInput = O('fruit-flavor')
    let colorInput = O('fruit-color')

    let name = nameInput.value;
    let flavor = flavorInput.value;
    let color = colorInput.value;

    let fruit = {
        name: name,
        flavor: flavor,
        color: color,
    }
    fruitArray.push(fruit);
    console.log('fruit array: ', fruitArray);

    nameInput.value = '';
    flavorInput.value = '';
    colorInput.value = '';
}

// advanced array functions
let searchButton = O('find-fruit')
searchButton.onclick = function () {
    let fruitInput = O('fruit-search');
    let fruitName = fruitInput.value;

    findFruit(fruitName, fruitArray);
    fruitInput.value = "";
}


function findFruit(name, array) {
    let fruitInfo = O('filter-information');

    let outputFruit = array.filter(object => {
        if (object.name == name) {
            return object;

        }
    })
    console.log('fruit name: ', outputFruit);
    if (outputFruit.length > 0) {
        outputFruit = outputFruit[0];
        fruitInfo.innerText = 'The' + outputFruit.name + ' is ' + outputFruit.flavor;
    }
    else {
        fruitInfo.innerText = "That fruit does not exist";
    }
}

let fruitNames = fruitArray.map(fruit => {
    return fruit.name;
})

fruitArray = fruitArray.map(fruit => {
    fruit['type'] = "from a tree";
    return fruit;
})

//objects with arrays
let pizzaObject = 
    {
        'neapolitan': { 'toppings': ['mozzarella', 'tomato sauce', 'basil'] }, 
        'pepperoni': { 'toppings': ['cheese', 'pepperoni'],
    }
}

let pizzaContainer = O('pizza-toppings')

for(let key of Object.keys(pizzaObject))
{
    pizzaContainer.innerHTML += "<h4>" + key + "</h4>";
    for(let topping of pizzaContainer[key].toppings)
    {
        pizzaContainer.innerHTML += "<div>" + topping + "</div>";
    }
}

// looping over an object with an array as a key