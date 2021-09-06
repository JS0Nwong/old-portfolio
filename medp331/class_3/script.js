var points = [];
var multiplier;

var rgbNoise0;
var rgbNoise1;

var rgbNoise2;
var rgbNoise3;

var rgbNoise4;
var rgbNoise5;

let slider;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(30);
    angleMode(DEGREES);
    noiseDetail(1);

    var density = random(40, 100);
    
    var space = width / density;

    for(let x = 0; x < width; x += space)
    {
        for(let y = 0; y < height; y += space)
        {
            var p = createVector(x + random(-10, 10), y + random(-10, 10));
            points.push(p);
        }
    }

    rgbNoise0 = random(255);
    rgbNoise1 = random(255);
    rgbNoise2 = random(255);
    rgbNoise3 = random(255);
    rgbNoise4 = random(255);
    rgbNoise5 = random(255);

    multiplier = random(0.0001, 0.01);
}

function draw()
{
    noStroke();
    strokeWeight(3);
    
    for(let i = 0; i < points.length; i++)
    {
        var red = map(points[i].x, 0, width, rgbNoise0, rgbNoise1)
        var green = map(points[i].y, 0, height, rgbNoise2, rgbNoise3)
        var blue = map(points[i].x, 0, width, rgbNoise4, rgbNoise5)
        var alpha = map(dist(width/2, height/2, points[i].x, points[i].y), 0, 1200, 10000, 0)

        fill(red, green, blue)

        var angle = map(noise(points[i].x * multiplier, points[i].y * multiplier), 0, 1, 0, 360)

        points[i].add(createVector(cos(angle), sin(angle)))

        ellipse(points[i].x, points[i].y, 1)
    }
}

function windowResized()
{
    resizeCanvas(window.innerWidth, window.innerHeight);
    background(30);
}

var button = document.getElementById('generate');

button.addEventListener("click", function()
{
  window.location.reload()
})
