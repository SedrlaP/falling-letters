import { Application, Container, Graphics, Text}  from "pixi.js";

export function createRectangle(app: Application, menuWidth: number) {
    // Generate random rectangle height and width
    const sideLength = Math.floor(Math.random() * 100) + 20;
    
    // Get text coordinates from side length
    const textCoordinates = sideLength / 2;

    // Get font size relative to side length
    const fontSize = sideLength / 2;

    // Get random letter
    const letters = 'ABCDE'; // String of uppercase letters
    const randomIndex = Math.floor(Math.random() * letters.length); // Get a random index
    const randomLetter = letters[randomIndex]; // Get the random letter

    const rectangle = new Container();
    const rectangleBg = new Graphics();
    const text = new Text({ text: randomLetter, style: { fontSize: fontSize}});
    text.anchor.set(0.5);
    text.position.set(textCoordinates, textCoordinates);
    rectangleBg.rect(0, 0, sideLength, sideLength);
    rectangleBg.fill(0x9a9a9a);
    rectangle.addChild(rectangleBg);
    rectangle.addChild(text);

    // Set rectangle position where x is random and y is 0
    rectangle.position.set(
      Math.floor(Math.random() * (app.screen.width - sideLength - menuWidth)),
      -sideLength
    );

    return rectangle;
  } 

  