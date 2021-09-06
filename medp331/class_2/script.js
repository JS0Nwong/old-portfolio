const myTitle = 'A Beautiful Poem';
let myObject = {
  'adjectives': 
    ['verdant', 'powerful', 'afraid', 'storming', 'raging'], 
  'nouns': 
    ['rock', 'mountain', 'tree', 'blade of grass', 'river', 'lightning', 'storm'],
  'verbs':
    ['whispering', 'shouting', 'murmurs', 'howling', 'bellowing']
}
let myArticleArray = ['The', 'An', 'A']

function returnPoem(title, article, noun, adjective) 
{
    return title + ': ' + article + ' ' + adjective + ' ' + noun + '<br>';
}

function returnTitleName(article, noun, adjective)
{
  return article + ' ' + adjective + ' ' + noun + '<br>';
}

W(returnPoem(myTitle, getRandomItem(myArticleArray), getRandomItem(myObject.adjectives), getRandomItem(myObject.nouns)))

// while loop poem:
let counter = 0
while(counter < 5) 
{
  W(getRandomItem(myArticleArray) + ' ' + getRandomItem(myObject.adjectives) + ' ' + getRandomItem(myObject.nouns) + ' ' + getRandomItem(myObject.verbs))
  counter++
}

function getRandomItem(array) {
  //don't worry about the math here, this just selects a random item from the array
  //but it could be useful if you want to do something similar!

  return array[Math.floor(Math.random()*array.length)]
}

const button = document.getElementById('generate');

button.addEventListener("click", function()
{
  window.location.reload();
})

button.addEventListener("mouseenter", function()
{
  tl.reversed(!tl.reversed())
})

button.addEventListener("mouseleave", function()
{
  !tl.reversed(tl.reversed)
})

/*const tl = gsap.timeline();
  tl.to("#generate", 
{ 
    duration: 0.4,
    color:"#17141d",
    backgroundColor:"#17141d"

})*/
