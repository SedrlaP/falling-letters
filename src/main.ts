import { Application, Graphics, Text, Container, Ticker } from "pixi.js";
import { createStartStopButton } from "./createStartStopButton";
import { createRectangle } from "./createRectangle";

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({background: '0x1099bb', resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);
    
  let rectangles: Graphics[] = [];
  
  let lastTickTime: number = 0;
  const tickInterval = 1; // 1 seconds

  const ticker = Ticker.shared;
  ticker.autoStart = false;

  ticker.add((ticker: Ticker) => {
    // Keep track of the time elapsed
    lastTickTime += ticker.deltaTime / 60;
    console.log(lastTickTime);
    if (lastTickTime >= tickInterval) {
      // Spawn new rectangle every 1 seconds
      console.log('New rectangle spawned');
      const rectangle = createRectangle(app);
      rectangles.push(rectangle);
      app.stage.addChild(rectangle);
      // Reset the timer
      lastTickTime = 0;
    }
      for (const rectangle of rectangles) {
        rectangle.y += 5;
        if (rectangle.y > app.screen.height - rectangle.height) {
          ticker.stop();
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


  const buttons = new Container();
  const startStopButton = createStartStopButton();
  startStopButton.on('pointerdown', () => startStopGame()); 
  buttons.addChild(startStopButton)
  
  app.stage.addChild(buttons);

  

})();