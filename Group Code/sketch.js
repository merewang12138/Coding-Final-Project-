// Global variables
let mainRadius = 150; // Radius of the main circle
let numCircles = 280; // This works well for screens up to 98 inches in size
let spacingX = mainRadius * 2 + 10; // Ensure circles are at least 10px apart horizontally
let spacingY = mainRadius * 2 + 10; // Ensure circles are spaced vertically based on their size + extra space
let startX = 100; // Starting x position cutting the first circlePattern, which makes it harder to notice the diagonal column design
let startY = 100; // Starting y position to accommodate multiple rows
let yStep = -20; // Prevents patterns from being built in a straight line vertically
let xStep = 50; // Prevents patterns from being built in a straight line horizontally
let timeOffset = 2; // Offset for animated noise

let dotSize = 5; // declare dotsize for latter variation

let predefinedColors; // predefine for latter initialization
let colorArrays; // variation ring's color


function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);  // Set colour mode to HSB

  // Predefined colours before drawing the shapes
  predefinedColors = [
    color(0, 0, 0),
    color(280, 100, 100),
    color(0, 100, 100),
    color(210, 100, 100),
    color(120, 100, 50),
    color(30, 100, 100)
  ];
  colorArrays = Array(numCircles).fill([...predefinedColors]); // create different arrays for innercircles
}

function draw() {
  background('teal');

  timeOffset += 0.01; // Slower increment for smoother animation
  let ifShuffle = false //shuffle the color layout of circles based on the time frame

  if(frameCount % 10 == 0){
    predefinedColors = shuffle(predefinedColors) //make sure it defines color on certain frequency
    ifShuffle = true;
  } 
  // Loop to draw the patterns at different x and y positions
  for (let i = 0; i < numCircles; i++) {
    if(ifShuffle){
      colorArrays[i] = shuffle(colorArrays[i])
    }
    let row = floor(i / 49); // Determine row position
    let col = i % 49; // Determine column position
    let noiseX = noise(col * 2, row * 0.1, timeOffset); // Noise for x position
    let noiseY = noise(col * 0.1 + 100, row * 0.1 + 100, timeOffset); // Noise for y position
    let x = startX + col * spacingX - row * xStep + noiseX * 50; // Adjust x position with noise
    let y = startY + row * spacingY + col * yStep + noiseY * 50; // Adjust y position with noise

    // Random HSB color influenced by noise
    let hue = noise(col * 0.05, row * 0.05) * 360;
    let saturation = noise(row * 0.05, col * 0.05 + 50) * 50 + 50;
    let brightness = noise(col * 0.1, row * 0.1 + 100) * 20 + 80;

    // Only 1 out of 9 circles will have the zigzag pattern
    let isZigzag = (i % 4 === 0);

    let if_shuffle = random();
    let pattern = new CirclePattern(x, y, mainRadius, hue, saturation, brightness, isZigzag, i,colorArrays[i]);
    pattern.draw(); // Draw each circle pattern
  }
}

class CirclePattern {
  constructor(x, y, mainRadius, hue, saturation, brightness, isZigzag, index,predefinedColors) {
    this.x = x;
    this.y = y;
    this.mainRadius = mainRadius;
    this.hue = hue;
    this.saturation = saturation;
    this.brightness = brightness;
    this.isZigzag = isZigzag;
    this.index = index; // Store index for unique rotation

    this.innerColors = predefinedColors.slice(0, 3);
  }

  drawDotsInCircle() {
    let numRings = 7;
   
    
    // Calculate rotation based on noise
    let rotationNoise = noise(this.index * 0.1, timeOffset) * TWO_PI * 2;
    
    push(); // Save current transformation state
    translate(this.x, this.y);
    rotate(rotationNoise); // Apply rotation
    
    // Draw concentric rings of dots
    for (let ring = 1; ring < numRings; ring++) {
      let radius = ring * this.mainRadius / numRings;
      let numDots = floor(TWO_PI * radius / (dotSize * 1.2));

      for (let i = 0; i < numDots; i++) {
        let angle = i * TWO_PI / numDots;
        let dotX = radius * cos(angle);
        let dotY = radius * sin(angle);

        let dynamicDotSize = map(
          noise(
            this./* The `index` parameter in the `CirclePattern` class constructor is used to store the
            index of each circle pattern instance. This index can be used for various purposes
            within the class methods. In the provided code, the `index` is used for the
            following purposes: */
            index * 0.3, 
            ring * 0.2, 
            i * 0.1 + timeOffset
          ),
          0, 1,  // Input range (noise output)
          1, 27  // Desired output range
        );

        noStroke();
        fill(this.hue, this.saturation, this.brightness);
        circle(dotX, dotY, dynamicDotSize);
      }
    }
    
    pop(); // Restore transformation state
  }

  drawZigzagPattern() {
    let outerRadius = this.mainRadius * 0.9;
    let innerRadius = outerRadius * 2 / 3;

    // Calculate rotation based on noise
    let rotationNoise = noise(this.index * 0.1 + 1000, timeOffset) * TWO_PI * 2;

    // Draw the yellow-filled circle
    fill('yellow');
    noStroke();
    circle(this.x, this.y, this.mainRadius * 2);

    push(); // Save current transformation state
    translate(this.x, this.y);
    rotate(rotationNoise); // Apply rotation

    // Set up the red zigzag line
    stroke('red');
    strokeWeight(3);

    let angle = 0;
    let angleStep = radians(3);
    let numZigzags = 120;

    beginShape();
    for (let i = 0; i < numZigzags; i++) {
      let innerX = innerRadius * cos(angle);
      let innerY = innerRadius * sin(angle);
      vertex(innerX, innerY);

      angle += angleStep;

      let outerX = outerRadius * cos(angle);
      let outerY = outerRadius * sin(angle);
      vertex(outerX, outerY);

      angle += angleStep;
    }
    endShape();
    
    pop(); // Restore transformation state
  }

  drawInnerCircles() {
    let smallRadius = 15;
    let numCircles = 9;

    // Draw the smallest gold circle at the center
    fill("gold");
    noStroke();
    circle(this.x, this.y, smallRadius * 2);

    // Draw 9 circles with increasing radius
    strokeWeight(6);
    noFill();

    for (let i = 0; i < numCircles; i++) {
      let currentRadius = smallRadius + i * 5;
      stroke(this.innerColors[i % 3]);
      circle(this.x, this.y, currentRadius * 2);
    }
  }

  draw() {
    if (this.isZigzag) {
      this.drawZigzagPattern();
    } else {
      this.drawDotsInCircle();
    }
    this.drawInnerCircles();
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('teal');
  setup();
}
