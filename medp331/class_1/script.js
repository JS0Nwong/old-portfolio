if(document.querySelector("#scrollbar"))
{
  window.onscroll = function() {
    myFunction()
  };

  function myFunction() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("scrollbar").style.height = scrolled + "%";

  }
}

window.onload = function()
{
  let cssPath = ['./styles.css'];

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
}