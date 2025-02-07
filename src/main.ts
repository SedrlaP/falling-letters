import { Application, Graphics, Container, Ticker, Text } from "pixi.js";
import { createStartStopButton } from "./createStartStopButton";
import { createRectangle } from "./createRectangle";
import { createScoreText } from "./createScoreText";

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({background: '0x1099bb', resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);
  
  // Set the menu width
  const MENU_WIDTH = 100;

  // Set initial values
  let rectangles: Graphics[] = [];
  let score = 0;

  // Setup menu
  const menuContainer = new Container();
  const startStopButton = createStartStopButton(app, MENU_WIDTH, startStopGame);
  const scoreText = createScoreText(app, score, MENU_WIDTH);
  menuContainer.addChild(scoreText);
  menuContainer.addChild(startStopButton)
  app.stage.addChild(menuContainer);
  
  function addScore() {
    score += 1;
    scoreText.text = 'Score: ' + score;
  }

  function decreaseScore() {
    if (score > 0) {
      score -= 1;
      scoreText.text = 'Score: ' + score;
    }
  }
  
  function resetScore() {
    score = 0;
    scoreText.text = 'Score: ' + score;
  }

  let lastTickTime: number = 0;
  const tickInterval = 1; // 1 seconds

  const ticker = Ticker.shared;
  ticker.autoStart = false;

  ticker.add((ticker: Ticker) => {
    // Keep track of the time elapsed
    lastTickTime += ticker.deltaTime / 60;
    if (lastTickTime >= tickInterval) {
      // Spawn new rectangle every 1 seconds
      const rectangle = createRectangle(app, MENU_WIDTH);
      rectangles.push(rectangle);
      app.stage.addChild(rectangle);
      // Reset the timer
      lastTickTime = 0;
    }
      for (const rectangle of rectangles) {
        rectangle.y += 1;
        if (rectangle.y > app.screen.height - rectangle.height) {
          ticker.stop();
          resetScore();
          // GAME OVER
        }
      }
  }); 
  ticker.stop();  

  let running = false;

  function startStopGame() {
    if (!running) {
      running = true;
      ticker.start();
      window.addEventListener('keydown', handleKeyPress);
      
    } else if (running) {
      running = false;
      ticker.stop();
      window.removeEventListener('keydown', handleKeyPress);
    }
  }
  
  // Handle key press
  function handleKeyPress(event: KeyboardEvent) {
    const upperCaseKey = event.key.toUpperCase();
    const array = rectangles.filter((rectangle) => {
      if (rectangle.children[0].text === upperCaseKey) return rectangle;
    });
    
    // If there are more than 1 rectangles with the same letter,
    // remove them all from the rectangles array
    // and add 1 to the score
    if (array.length > 1) {
      for (let rect of array) {
        const index = rectangles.indexOf(rect);
        rectangles.splice(index, 1);
        app.stage.removeChild(rect);
      }
      addScore();
    } else {
      decreaseScore();
    }
  }

})();