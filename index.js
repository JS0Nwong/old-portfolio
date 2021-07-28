var black = '#17141d';
var green = '#21e465';
var white = '#ffffff';

var blue = "#6495ED";

//THEME SWITCHER
function lightMode()
{
  var body = document.getElementById('index') || document.getElementById('works') 
  || document.getElementById('about') || document.getElementById('contact');
  
  body.classList.toggle("light-mode");

  var progresBar = document.getElementById('progress');
  progresBar.classList.toggle("progress-bar-light");

  var top = document.getElementById('top');
  top.classList.toggle("progress-light");

  var bottom = document.getElementById('bottom');
  bottom.classList.toggle("progress-light");

  var left = document.getElementById('left');
  left.classList.toggle("progress-light");
  
  var right = document.getElementById('right');
  right.classList.toggle("progress-light");

  document.getElementById('colorChange').innerHTML.toggle = 'change theme';

  var button = document.getElementById('colorChange');
  button.classList.toggle('toggle-light');
}

//CSS LOADER
window.onload = function()
{
  let cssPath = ['globalStyles.css'];

  cssLoader(cssPath);

  function cssLoader(path)
  {
    let typeOfPath = typeof path;
    switch(typeOfPath)
    {
      case "object":
        var head = document.getElementsByTagName("head")[0];
        for(let i = 0; i < path.length; i++)
        {
          var link = document.createElement("link");
          link.href = path[i];
          link.rel = "stylesheet";
          link.type = "text/css";
          head.appendChild(link);
        }
        break;
      case "string":
        var head = document.getElementsByTagName("head")[0];
        var link = document.createElement("link");
        link.href = path;
        link.rel = "stylesheet";
        link.type = "text/css";
        head.appendChild(link);
        break;
    }
  }
  if(document.body.style.backgroundColor == '#ffffff')
  {
    button.classList.toggle('toggle-light');
  }
}

//PROGRESS BAR
if(document.querySelector("#progress"))
{
  window.onscroll = function() {
    myFunction()
  };

  function myFunction() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 92;
    document.getElementById("progress").style.height = scrolled + "%";
  }
}

//PAGE TRANSITION
function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
      setTimeout(() => {
          done();
      }, n);
  });
}

function pageTransition() {
  var tl = gsap.timeline();
  tl.to(".loading-screen", {
      duration: 1.1,
      width: "100%",
      left: "0%",
      ease: "Expo.easeInOut",
  });

  tl.to(".loading-screen", {
      duration: 1,
      width: "100%",
      left: "100%",
      ease: "Expo.easeInOut",
      delay: 0.3,
  });
  tl.set(".loading-screen", { left: "-100%" });
}

function contentAnimation() {
  var tl = gsap.timeline();
  tl.from(".animate-this", { 
    duration: 1, 
    y: 30, 
    opacity: 0, 
    stagger: 0.4, 
    delay: 0.2 
  });
}

$(function () {
  barba.init({
      sync: true,

      transitions: [
          {
              async leave(data) {
                  const done = this.async();

                  pageTransition();
                  await delay(1000);
                  done();
              }
          },
      ],
  });
});

//MENU TOGGLE
const menu = document.querySelector(".menu");
const navLinks = document.querySelector('.nav-links');
const menuLines = document.querySelectorAll('.menu-line');
const links = document.querySelectorAll('.nav-links li');

menu.addEventListener("click", () => {
  menuLines.forEach(line => {
    line.classList.toggle('close');
  })
  links.forEach(link => {
    link.classList.toggle('link-show');
  })
})


//REMOVING BOOTSTRAP STYLING
$(window).on('resize', function() {
  if($(window).height() < 550)
  {
    $('#footer').addClass('footer-margin');
    $($('.my-5')[2]).removeClass('my-5');
  }
})