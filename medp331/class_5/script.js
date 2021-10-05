let myImages = [
    { 'src': 'https://images.unsplash.com/photo-1632947261925-16d757bbda24?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', 
    'caption': 'A special lad'}, 
    {'src': 'https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d', 
    'caption': 'A floofy boi'},
]

let profileStatistics = {
    "Posts": Math.floor(Math.random() * 100),
    "Followers": Math.floor(Math.random() * 1000000),
    "Following": Math.floor(Math.random() * 1000),
}  

function createPara(category, statistic)
{
    let p = document.createElement("p");
    p.textContent = category + ': ' + statistic;
    return p;
}

let stat = O('statistics');
let keys  = Object.keys(profileStatistics)
for(let key of keys)
{
    let newPara = createPara(key, profileStatistics[key]);
    stat.appendChild(newPara);
}
  
function addImages(imageArray) {
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
      image.innerHTML += "<p class = 'caption'>" + imageArray[i].caption + "</p>";
    }
}
function createImage(imageObject) {
    // create the element to add to the page
    // we're using a div so we can add things like captions to it
    let containerDiv = document.createElement("div")
    let parentDiv = O('image-container')
    //set container class
    containerDiv.className = "grid-item col-md-4";
    //set container div styles
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

function addImage()
{
    let imageInput = O('add-image');
    let captionInput = O('add-caption');
    let img = imageInput.value;
    let caption = captionInput.value;
    let image = {
        src: img,
        caption: caption,
    }
    myImages.push(image);
    updateImages(myImages[Object.keys(myImages)[Object.keys(myImages).length - 1]])
    console.log('array: ', myImages);
    imageInput.value = '';
    captionInput.value ='';
}
function updateImages(imageUpdate) {
    let container = O('image-container')
    let image = createImage(imageUpdate)
    container.appendChild(image);
    image.innerHTML += "<p class = 'caption'>" + imageUpdate.caption + "</p>";
}

addImages(myImages);