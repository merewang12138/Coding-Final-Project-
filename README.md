# Coding-Final-Project-
Wheels of fortune recreation

**Overview**

I used Perlin noise to animate the wheels created on the base code,changing some of the properties within class of circles to gain rotation effect. The animation also create randomness by resizing the dotted circles, changing its initial position and create variation of the color property.

**Interaction Instructions**

To view the animation, load the page. The animation begins automatically and continues to change without required user interaction. Colors of inner circle also shuffles every few frames.By refreshing the page, each time picked a random color for major inner circles.

**Details of Individual Approach**
 
1._Chosen Animation Technique_: 

Perlin noise and Randomness

2._Animated Properties_:
- Position: Each circle’s x and y positions are modified by noise-based offsets.
- Rotation: Both the dot and zigzag patterns within each circle rotate.
- Dot Size: The dots’ sizes in the outer circles vary continuously.
- Color Variation: Colors shuffle every ten frames, and each circle is assigned a unique color.

3._Compared to Group members_:

Based on what I mentioned in the former section, my group members each took unique approaches to make sure we adapt our animation in distinctive ways.

- Jackie, who is using audio to animate her artwork, animated the size of the radius of inner circle and the color of the dots with music energy level;
- Ann, who is doing User Input, implemented user interaction with mousePressed function to switch between the circlePatterns;
- Jiawei, who is employing time-based methods for animation, applied a particle to rewrote the base code with remaining the same layout of base code. He created time-based animation for the moving particles as well as generating of circles.
 

4._Inspirations and References_:

I was visually inspired by some simple kaleidoscopic animations: 


Example: 
![Kaleidoscopic animation](https://img1.picmix.com/output/stamp/normal/7/7/4/2/2282477_b61a5.gif)

The Symmetry and everending movement are created for a aesthetic of depth.The zigzags pattern also added a stronger visual effect on the rotation.

Technical Inspirations: Perlin noise, noise() function in p5.js is the major fucntion that I used to animate the artwork. The strong randomness on this function made it hard to implement but was fun to play around the scale and other properties.

**Technical Explanation**

The base code wasn't changed drastically, I maintained the base shape, and the modification are explained in following sections:
- Position Offsets: noise value was added in draw() to random offsets to the x and y positions of each wheels.
- Rotation: Noise-based rotation values are added for calculate both the dot and zigzag patterns, each circle pattern are spinning at different rates and random directions.
- Dynamic Dot Sizes: I declassed the dot size, added fuction to changed the dotsize, and let each dot’s size within the concentric rings of a circle varies based on scaling the noise effect.
- Color Shuffling and HSB Variance: 
shuffle() function was used to store randomised color in inner circles, the technique was incorporated reference from the p5 website [Link Text](https://p5js.org/reference/p5/shuffle/), ---'array, is the array to be shuffled, calling shuffle(myArray) will shuffle the elements of myArray;' 
framecount() from p5.js was also used：every ten frames, the color scheme of each circle is shuffled from a predefined set. The HSB values are slightly randomis\ed using noise, which adds subtle variations on color of wheels.
