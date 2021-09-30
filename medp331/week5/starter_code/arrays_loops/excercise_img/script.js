let myImages = ['https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg', 
'https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d',
'https://images.unsplash.com/photo-1557582409-1dd63153192e?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
'https://images.unsplash.com/photo-1558090056-c994bfb27e14?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8NnNNVmpUTFNrZVF8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
]

let container = O('image-container')

// try adding all your images to the page in a for loop
// I've included a createImage function that will create an image element in html
// But you'll need to run it on each image and use
// container.appendChild(image) on the result
// try adding a button/function that reverses them, or only displays a specific image

function addImages(imageArray) {
  //always zero out the container if we want to run it again
  container.innerHTML = ''
  // for loop on the array
  // let image = createImage(array[i])
  // container.appendChild(image)
  for(let i = 0; i < imageArray.length; i++)
  {
      let image = createImage(imageArray[i])
      container.appendChild(image);
  }
}

O('add-button').onclick = function() {
  let input = O('add-image')
  myImages.push(input.value)
  console.log(myImages)
  // call addImages again to display the new item
  addImages(myImages)
  input.value = ''
}
function createImage(src) {
  let img = document.createElement("img")
  img.setAttribute("src", src)
  return img;
}

addImages(myImages)