# Coding-Final-Project-
Wheels of fortune recreation

**Overview**
I used Perlin noise to animate the wheels created on the base code,changing some of the properties within class of circles to gain rotation effect. The animation also create randomness by resizing the dotted circles, changing its initial position and create variation of the color property.

**Interaction Instructions**
To view the animation,load the page. The animation begins automatically and continues to change without required user interaction.Colors of inner circle also shuffle every few frames.By refreshing the page, each time picked a random color for major circles.

**Details of Individual Approach**
 
1._Chosen Animation Technique_: 
Perlin noise and Randomness

2._Animated Properties_:
- Position: Each circle’s x and y positions are modified by noise-based offsets
- Rotation: Both the dot and zigzag patterns within each circle rotate 
- Dot Size: Within each circle, the dots’ sizes vary continuously.
- Color Variation: Colors shuffle every ten frames, and each circle is assigned a unique color scheme based on shuffled predefined colors and noise-based HSB values.

3._Compared to Group members_:
- Jackie, who is doing User Input, animated the size of the radius of inner circle and the color of the dots with music energy level.
- Ann, who is doing User Input, implemented user interaction with mousePressed function to switch between the circlePatterns
- Jiawei, wo is 
 

4._Inspirations and References_:
Visual Inspirations: I was inspired by some simple kaleidoscopic animations, 
example: ![Kaleidoscopic animation](https://img1.picmix.com/output/stamp/normal/7/7/4/2/2282477_b61a5.gif Links to an external site.)
Symmetry and everending movement for a sense of depth. The zigzags pattern also added a stronger visual effect on the rotation.
Technical Inspirations: Perlin noise, noise() function in p5.js is the major fucntion that I used to animate the artwork. The strong randomness on this function made it hard to implement but was fun to play around the scale and other properties.

**Technical Explanation**

The base code wasn't changed drastically, the modification are explained in following sections:
- Position Offsets: The noise() function adds randomized offsets to the x and y positions of each wheels.
Rotation: Noise-based rotation values are added for calculate both the dot and zigzag patterns, each circle pattern are spinning at different rates and random directions.
- Dynamic Dot Sizes: the dot size was changed and randomnise, and each dot’s size within the concentric rings of a circle varies based on scaling the noise effect
- Color Shuffling and HSB Variance: 
shuffle() function was used to create randomized color patterns in inner circles, the technique was incorporated reference from the p5 website,[Link Text](https://p5js.org/reference/p5/shuffle/) 'array, is the array to be shuffled, calling shuffle(myArray) will shuffle the elements of myArray.' 

framecout() was also used：every ten frames, the color scheme of each circle is shuffled from a predefined set. The HSB values are slightly randomized using noise, which adds subtle variations on color of wheels.
