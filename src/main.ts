import { Application, Graphics, Container, Ticker, Text } from "pixi.js";
import { createStartStopButton } from "./createStartStopButton";
import { createRectangle } from "./createRectangle";

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({background: '0x1099bb', resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);
  
  // Set the menu width
  const MENU_WIDTH = 100;

  let rectangles: Graphics[] = [];
  
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
          scoreText.text = 'Score: ' + 0;
          // GAME OVER
        }
      }
  }); 
  ticker.stop();  

  let running = false;

  function startStopGame() {
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

  window.addEventListener('keydown', (event) => { handleKeyPress(event); });
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
  


  const menuContainer = new Container();
  const startStopButton = createStartStopButton(app, MENU_WIDTH);
  startStopButton.on('pointerdown', () => startStopGame()); 
  menuContainer.addChild(startStopButton)
  let score = 0;
  const scoreText = new Text({ text: 'Score: ' + score, 
        style: { fontSize: 16} 
      });
  scoreText.position.set(app.screen.width - MENU_WIDTH, 70)
  menuContainer.addChild(scoreText);
  app.stage.addChild(menuContainer);


})();