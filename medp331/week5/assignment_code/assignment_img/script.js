let myImages = [
  { 'src': 'https://images.unsplash.com/photo-1632947261925-16d757bbda24?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', 'height': '80px', 'width': '80px', 'top': '10px', 'left': '12px', 'caption': 'A special lad'}, 
  {'src': 'https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d', 'top': '20px', 'left': '80px', 'height': '100px', 'width': '100px', 'caption': 'A floofy boi'}
]


/*function addImages(imageArray) {
  let container = O('image-container')
  //loop over our list of objects
    //inside the loop
    //create an image div
    //let imgDiv = createImage(imageArray[i])
    //add caption:
    //imgDiv.innerHTML += "<p>" + imageArray[i].caption + "</p>"
  //container.appendChild(imgDiv)
  for(let i = 0; i < imageArray.length; i++)
  {
    let image = createImage(imageArray[i])
    container.appendChild(image);
    image.innerHTML += "<p>" + imageArray[i].caption + "</p>";
  }
}

function createImage(imageObject) {
  // create the element to add to the page
  // we're using a div so we can add things like captions to it
  let containerDiv = document.createElement("div")
  let parentDiv = O('image-container')
  //set container class
  containerDiv.className = "image-container"
  //set container div styles
  S(containerDiv).top = imageObject.top
  S(containerDiv).left =  imageObject.left
  let img = document.createElement("img")
  // set image attributes
  img.setAttribute("src", imageObject.src);
  //set image style
  S(img).height = imageObject.height;
  S(img).width = imageObject.width
  //add the image to our container div
  containerDiv.appendChild(img)
  parentDiv.appendChild(containerDiv)
  return containerDiv;
}

O('add-button').onclick = function() {
  let input = O('add-image')
  myImages.push(input.value)
  console.log(myImages)
  // call addImages again to display the new item
  addImages(myImages)
  input.value = ''
}

addImages(myImages)*/
