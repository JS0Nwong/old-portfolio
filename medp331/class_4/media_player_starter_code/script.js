//Global variables
const media = document.querySelector('video') // this just gets the video element
let playbackSpeed = 1 // Global variable to hold the playbackSpeed

//changing title of webpage
document.querySelector("title").innerHTML = "Cool Media Player";
document.getElementById("title").innerHTML = "This Is A Cool Media Player!";

function getModifier() {
  let valueElement = O("valueText")
  // get value of input element
  let valueText = valueElement.value
  // casting to a number - even though we set our input element to be a number, it still comes out as a string in JavaScript
  let value = Number(valueText)
  return value
}

    /* This function reads the value from the valueText element
       and adds it to the global playback speed value */
function addToModifier() {
  let value = getModifier()
  playbackSpeed = playbackSpeed + value // update the global playback speed value
  //or we can shorthand this to an assignment operator
  //playbackSpeed += value
  // Set the playback speed
  media.playbackRate = playbackSpeed
  // Display the updated playback speed
  let resultElement = O("playbackSpeed")
  let resultString = "Playback speed is " + playbackSpeed
  resultElement.innerText = resultString
}
function subtractModifier() {
  let value = getModifier()
  playbackSpeed = playbackSpeed - value // update the global playback speed value
  //or we can shorthand this
  //playbackSpeed -= value
  // Set the playback speed
  media.playbackRate = playbackSpeed
  // Display the updated playback Speed
  let resultElement = O("playbackSpeed")
  let resultString = "Playback speed is " + playbackSpeed
  resultElement.innerText = resultString
}

  /* This function clears the modifier value and updates the display
  */
function zeroModifier() {
  playbackSpeed = 1; // set the global modifier to 0
  // Set the playback speed
  media.playbackRate = playbackSpeed

  // update the display
  let resultElement = O("playbackSpeed")
  resultElement.innerText = "Playback speed is 1"
}

function playPauseMedia() {
  if(media.paused) {
    media.play();
  } else {
    media.pause();
  }
}

function goWackyMode() {
  let input = O('wackyMode')
  let answer = input.value
  if (answer.toLowerCase() == 'yes') {
    media.playbackRate = 1.5;
    document.body.classList.toggle('wacky-background');
  } else if (answer.toLowerCase() == 'no') {
    media.playbackRate = 1;
    document.body.classList.remove('wacky-background');
  } else {
    let wrongAnswer = O('wronganswer')
    wrongAnswer.innerText = "I'm gonna need a yes or no answer, pal"
  }
  input.value = ''
}

document.getElementById("change-theme").addEventListener("click", function()
{
  document.body.classList.toggle("dark-mode");
  document.querySelectorAll("p").forEach(e => {
    e.classList.toggle("content-color");
  });
  document.querySelectorAll("button").forEach(e => {
    e.classList.toggle("dark-button");
  });
  let title = O('title');
  let lowerTitle = O('smaller-title');
  lowerTitle.classList.toggle("content-color");
  title.classList.toggle("content-color");
})

function selectVideo() {
  let selectVideo = O('video-select')
  let preference = selectVideo.value;

  let videoArray = 
  {
    'funnyVideo': 
    ['videos/funny/funny(1).mp4', 'videos/funny/funny(2).mp4', 'videos/funny/funny(3).mp4'],
    'interestingVideo':
    ['videos/interesting/interesting(3).mp4', 'videos/interesting/interesting(4).mp4', 'videos/interesting/interesting(5).mp4'],
    'trippyVideo':
    ['videos/epic/epic(3).mp4', 'videos/epic/epic(4).mp4', 'videos/epic/epic(5).mp4'],
    'cuteVideo':
    ['videos/cute/cute(3).mp4', 'videos/cute/cute(4).mp4', 'videos/cute/cute(5).mp4'],
  }

  switch(preference) {
    case ("funny"):
      media.src = getRandomVideo(videoArray.funnyVideo);
      break;
    case ("trippy"):
      media.src = getRandomVideo(videoArray.trippyVideo);
      break;
    case ("interesting"):
      media.src = getRandomVideo(videoArray.interestingVideo);
        break;
    case ("cute"):
      media.src = getRandomVideo(videoArray.cuteVideo);
          break;
    default:
      break;
  }
}

function getRandomVideo(array)
{
  return array[(Math.floor(Math.random() * array.length))];
}