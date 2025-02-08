import { Application, Graphics, Container, Ticker, Text } from "pixi.js";
import { createStartStopButton } from "./createStartStopButton";
import { createRectangle } from "./createRectangle";
import { createScoreText } from "./createScoreText";
import { createResetButton } from "./createResetButton";

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({background: '0x1099bb', resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);
  
  // Set constants
  const MENU_WIDTH = 120;

  // Set initial values
  let rectangles: Graphics[] = [];
  let score = 0;

  // Setup menu
  const menuContainer = new Container();
  const startStopButton = createStartStopButton(app, MENU_WIDTH, startStopGame);
  const scoreText = createScoreText(app, score, MENU_WIDTH, startStopButton.height);
  menuContainer.addChild(scoreText);
  menuContainer.addChild(startStopButton)
  app.stage.addChild(menuContainer);


  // Create restart game button
  const restartGameButton = createResetButton(app, restartGame);
  
  const endGameText = new Text({ text: '', 
    style: { fontSize: 24} 
  });
  
  function endGame(result: string) {
    // Add end game text
    if (result === "win") {
      endGameText.text = 'Congratulations, you won!';
    } else if (result === "lose") {
      endGameText.text = 'You lose!';
    }
    endGameText.position.set((app.screen.width - endGameText.width) / 2, app.screen.height / 2);

    app.stage.addChild(endGameText);

    // Stop the ticker
    ticker.stop();

    // Remove all rectangles from the stage
    rectangles.forEach((rectangle) => app.stage.removeChild(rectangle));
    
    // Reset the rectangles array
    rectangles = [];
    
    // Remove event listener
    window.removeEventListener('keydown', handleKeyPress);
    
    // Set running to false
    running = false;
    
    // Hide start stop button
    startStopButton.visible = false;
    
    // Move button to the correct position if the window was resized
    restartGameButton.position.set((app.screen.width - restartGameButton.width) / 2, (app.screen.height / 2) + endGameText.height + 5)
    
    // Add restart game button
    app.stage.addChild(restartGameButton);
    
    // Move score text to the center of the screen
    scoreText.position.set((app.screen.width - scoreText.width) / 2, (app.screen.height / 2) + restartGameButton.height + endGameText.height + 15);
  }

  function restartGame() {
    // Handle restart game button click
    // Reset data to initial state

    // Reset the score
    resetScore();
    
    // Reset score text position
    scoreText.position.set(app.screen.width - MENU_WIDTH, startStopButton.height);

    // Show start stop button
    startStopButton.visible = true;
    
    // Move button to the correct position if the window was resized
    startStopButton.position.set(app.screen.width - MENU_WIDTH, 0);

    // Remove restart game button
    app.stage.removeChild(restartGameButton);

    // Remove end game text
    app.stage.removeChild(endGameText);
  }
  

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
  const tickInterval = 0.5; // 1/2 seconds

  const ticker = Ticker.shared;
  ticker.autoStart = false;

  ticker.add((ticker: Ticker) => {
    // Keep track of the time elapsed
    lastTickTime += ticker.deltaTime / 60;
    if (lastTickTime >= tickInterval) {
      // Spawn new rectangle every 1/2 seconds
      const rectangle = createRectangle(app, MENU_WIDTH);
      rectangles.push(rectangle);
      app.stage.addChild(rectangle);
      // Reset the timer
      lastTickTime = 0;
    }

    // Check if the score is 50, end the game
    if (score >= 50) {
      // Win game screen
      endGame("win");
    }

    // Make the rectangles fall
    for (const rectangle of rectangles) {
      rectangle.y += 10;
      // Check if the rectangle has reached the bottom of the screen
      if (rectangle.y > app.screen.height - rectangle.height) {
        ticker.stop();
        // GAME OVER
        endGame("lose");
      }
    }
  }); 
  ticker.stop();  

  let running = false;

  function startStopGame() {
    if (!running) {
      running = true;
      ticker.start();
      // Add event listener when game is running
      window.addEventListener('keydown', handleKeyPress);
      
    } else if (running) {
      running = false;
      ticker.stop();
      // Remove event listener when game is not running
      // so the player can't "cheat" by stopping the game and pressing
      // the right keys
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

  // TODO: refactor code
  // Add faster falling speed with higher score, end game at 50 score




  
})();