import { Application, Graphics, Text, Container, Ticker } from "pixi.js";

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({background: '0x1099bb', resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  // Set constants
  const BUTTON_RECT_SIDE_LENGTH= 100
  const BUTTON_TEXT_COORDS = BUTTON_RECT_SIDE_LENGTH / 2

    
  let rectangles: Graphics[] = [];
  
  console.log(Math.floor(Math.random() * 100) + 50)

  function createRectangle() {
    // generate random rectangle height and width
    const sideLength = Math.floor(Math.random() * 100) + 20;
    const rectangle = new Graphics();

    // get text coordinates from side length
    const textCoordinates = sideLength / 2;

    // get font size relative to side length
    const fontSize = sideLength / 2;

    // get random letter
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // String of uppercase letters
    const randomIndex = Math.floor(Math.random() * alphabet.length); // Get a random index
    const randomLetter = alphabet[randomIndex]; // Get the random letter

    const text = new Text({ text: randomLetter, style: { fontSize: fontSize}});
    text.anchor.set(0.5);
    text.position.set(textCoordinates, textCoordinates);
    rectangle.rect(0, 0, sideLength, sideLength);
    rectangle.fill(0x9a9a9a);
    rectangle.addChild(text);

    // set rectangle position where x is random and y is 0
    rectangle.position.set(
      Math.floor(Math.random() * (app.screen.width - sideLength)),
      0
    );
    rectangles.push(rectangle);
    return rectangle;
  } 

  app.stage.addChild(createRectangle());
  app.stage.addChild(createRectangle());

  const ticker = Ticker.shared;
  ticker.autoStart = false;
  ticker.add(() => {
    for (const rectangle of rectangles) {
      rectangle.y += 1;
    }
  }); 
  ticker.stop();  

  let running = false;

  function startGame() {
    if (!running) {
      console.log('Game started');
      running = true;
      ticker.start();
      
    } else if (running) {
      console.log('Game stopped');
      running = false;
      ticker.stop();
    }
  }

  function createStartGameButton() {
    const button = new Graphics();
    const buttonText = new Text({ text: 'Start / Stop', 
      style: { fontSize: 16} 
    });

    buttonText.anchor.set(0.5);
    buttonText.position.set(BUTTON_TEXT_COORDS, 35);

    button.rect(0, 0, BUTTON_RECT_SIDE_LENGTH, 70);
    button.fill(0xFFFFFF);
    button.interactive = true;
    button.on('pointerdown', () => startGame()); 
    button.addChild(buttonText);
    button.position.set(0, 0);

    return button; 
  }

  const buttons = new Container();
  
  buttons.addChild(createStartGameButton())
  
  app.stage.addChild(buttons);

  

})();