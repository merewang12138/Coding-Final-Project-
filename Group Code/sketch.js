// Global variables
let mainRadius = 150; // Radius of each main circle in the pattern
let numCircles = 280; // Total number of circles to be drawn, ideal for large screens
let spacingX = mainRadius * 2 + 10; // Horizontal spacing between circles (including 10px padding)
let spacingY = mainRadius * 2 + 10; // Vertical spacing between circles (including 10px padding)
let startX = 100; // Initial x position to start the pattern, adjusted for aesthetic spacing
let startY = 100; // Initial y position to start the pattern
let yStep = -20; // Vertical shift for each row to prevent grid alignment
let xStep = 50; // Horizontal shift for each column to prevent grid alignment
let timeOffset = 2; // Offset for animating noise-based movement of circles

let dotSize = 5; // Initial size for dots in circles, used for scaling in patterns

let predefinedColors; // Array to hold a set of colors for the circles, initialized in setup()
let colorArrays; // Stores unique color arrays for each circle's inner patterns

function setup() {
  createCanvas(windowWidth, windowHeight); // Set canvas to window dimensions
  colorMode(HSB);  // Use HSB color mode for smoother color transitions

  // Initialize an array of predefined colors
  predefinedColors = [
    color(0, 0, 0),         
    color(280, 100, 100),    
    color(0, 100, 100),      
    color(210, 100, 100),    
    color(120, 100, 50),    
    color(30, 100, 100)      
  ];
  
  // Assign each circle a copy of the predefined color set
  colorArrays = Array(numCircles).fill([...predefinedColors]);
}

function draw() {
  background('teal'); 

  timeOffset += 0.01; // Increment time offset for smoother, slower animations
  let ifShuffle = false; // Flag for shuffling colors

  // Shuffle predefined colors at a set interval (every 10 frames)
  if(frameCount % 10 == 0){
    predefinedColors = shuffle(predefinedColors);
    ifShuffle = true; // Indicate that colors should be reshuffled
  } 
  
  // Loop to draw each circle pattern in a grid
  for (let i = 0; i < numCircles; i++) {
    // Shuffle the color array for each circle if the shuffle flag is set
    if(ifShuffle){
      colorArrays[i] = shuffle(colorArrays[i]);
    }
    
    let row = floor(i / 49); // Calculate row based on circle index
    let col = i % 49; // Calculate column based on circle index

    // Generate noise-based x and y offsets for organic movement
    let noiseX = noise(col * 2, row * 0.1, timeOffset);
    let noiseY = noise(col * 0.1 + 100, row * 0.1 + 100, timeOffset);
    let x = startX + col * spacingX - row * xStep + noiseX * 50; // x position with noise
    let y = startY + row * spacingY + col * yStep + noiseY * 50; // y position with noise

    // Generate HSB color values based on noise for variation
    let hue = noise(col * 0.05, row * 0.05) * 360;
    let saturation = noise(row * 0.05, col * 0.05 + 50) * 50 + 50;
    let brightness = noise(col * 0.1, row * 0.1 + 100) * 20 + 80;

    // Define a zigzag pattern for every fourth circle
    let isZigzag = (i % 4 === 0);

    // Create and draw a CirclePattern instance
    let pattern = new CirclePattern(x, y, mainRadius, hue, saturation, brightness, isZigzag, i, colorArrays[i]);
    pattern.draw(); // Draw each circle pattern
  }
}

class CirclePattern {
  constructor(x, y, mainRadius, hue, saturation, brightness, isZigzag, index, predefinedColors) {
    this.x = x; // x position
    this.y = y; // y position
    this.mainRadius = mainRadius; // Radius of main circle
    this.hue = hue; // HSB color: hue
    this.saturation = saturation; // HSB color: saturation
    this.brightness = brightness; // HSB color: brightness
    this.isZigzag = isZigzag; // Boolean to determine if zigzag pattern is applied
    this.index = index; // Unique index for each circle
    this.innerColors = predefinedColors.slice(0, 3); // Three colors for inner circle patterns
  }

  drawDotsInCircle() {
    let numRings = 7; // Number of concentric rings of dots

    // Calculate rotation based on noise, creating organic animation
    let rotationNoise = noise(this.index * 0.1, timeOffset) * TWO_PI * 2;
    
    push(); // Save current transformation state
    translate(this.x, this.y); // Move to circle's position
    rotate(rotationNoise); // Rotate circle for dynamic effect

    // Loop to draw concentric rings of dots
    for (let ring = 1; ring < numRings; ring++) {
      let radius = ring * this.mainRadius / numRings; // Radius of each ring
      let numDots = floor(TWO_PI * radius / (dotSize * 1.2)); // Dots per ring

      // Loop to place dots along each ring
      for (let i = 0; i < numDots; i++) {
        let angle = i * TWO_PI / numDots; // Angle for each dot
        let dotX = radius * cos(angle); // x position of dot
        let dotY = radius * sin(angle); // y position of dot

        // Dynamic dot size allocation with noise disturbance that are scaled to the range of 1-27
        let dynamicDotSize = map(
          noise(this.index * 0.3, ring * 0.2, i * 0.1 + timeOffset),
          0, 1, 1, 27 // Map noise output to desired size range
        );

        noStroke(); 
        fill(this.hue, this.saturation, this.brightness); 
        circle(dotX, dotY, dynamicDotSize); // Draw dot
      }
    }
    
    pop(); // Restore transformation state
  }

  drawZigzagPattern() {
    let outerRadius = this.mainRadius * 0.9; // Outer radius for zigzag pattern
    let innerRadius = outerRadius * 2 / 3; // Inner radius for zigzag

    // Calculate rotation based on noise for dynamic effect
    let rotationNoise = noise(this.index * 0.1 + 1000, timeOffset) * TWO_PI * 2;

    // Draw the yellow-filled circle
    fill('yellow');
    noStroke();
    circle(this.x, this.y, this.mainRadius * 2);

    push(); // Save transformation state
    translate(this.x, this.y); // Move to circle's position
    rotate(rotationNoise); // Apply rotation

    // Set up red zigzag line
    stroke('red');
    strokeWeight(3);
    let angle = 0;
    let angleStep = radians(3); // Step between zigzag points
    let numZigzags = 120; // Number of zigzag points

    beginShape(); // Start zigzag shape
    for (let i = 0; i < numZigzags; i++) {
      let innerX = innerRadius * cos(angle); // x position on inner radius
      let innerY = innerRadius * sin(angle); // y position on inner radius
      vertex(innerX, innerY); // Define vertex

      angle += angleStep; // Increment angle

      let outerX = outerRadius * cos(angle); // x position on outer radius
      let outerY = outerRadius * sin(angle); // y position on outer radius
      vertex(outerX, outerY); // Define vertex

      angle += angleStep; // Increment angle
    }
    endShape(); // End zigzag shape
    
    pop(); // Restore transformation state
  }

  drawInnerCircles() {
    let smallRadius = 15; // Radius for smallest inner circle
    let numCircles = 9; // Number of inner circles

    // Draw a small central gold circle
    fill("gold");
    noStroke();
    circle(this.x, this.y, smallRadius * 2);

    // Draw nine larger circles with increasing radius
    strokeWeight(6);
    noFill();

    for (let i = 0; i < numCircles; i++) {
      let currentRadius = smallRadius + i * 5; // Increase radius for each circle
      stroke(this.innerColors[i % 3]); // Color from predefined color array
      circle(this.x, this.y, currentRadius * 2); // Draw circle
    }
  }

  draw() {
    if (this.isZigzag) {
      this.drawZigzagPattern(); // Draw zigzag if true
    } else {
      this.drawDotsInCircle(); // Otherwise, draw dots
    }
    this.drawInnerCircles(); // Draw inner circles for all patterns
  }
}

// Adjust canvas size if window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('teal'); // Reset background
  setup(); // Reinitialize setup variables
}
