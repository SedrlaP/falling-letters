import { Application, Graphics, Container, Ticker, Text } from "pixi.js";
import { createStartStopButton } from "./createStartStopButton";
import { createRectangle } from "./createRectangle";
import { createScoreText } from "./createScoreText";
import { createResetButton } from "./createResetButton";
import { increaseScore, decreaseScore, resetScore } from "./handleScore";
import { createEndGameText } from "./createEndGameText";

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: '0xFFFFFF', resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);
  
  // Set game constants
  const BASE_SPEED = 1;
  const SPEED_INCREASE_PER_POINT = 0.05;
  const BASE_SPAWN_TIME = 1/3; // seconds
  const SPAWN_RATE_FACTOR = 0.1;

  // Set layout constants
  const MENU_WIDTH = 150;
  const MENU_Y = 100;
  const BUTTON_RECT_WIDTH = 120;
  const BUTTON_RECT_HEIGHT = 50;
  const BUTTON_TEXT_X = BUTTON_RECT_WIDTH / 2
  const BUTTON_TEXT_Y = BUTTON_RECT_HEIGHT / 2

  // Set initial values
  let rectangles: Container[] = [];
  let score: number = 0;
  let running: boolean = false;
  let lastSpawnTime: number = 0;
  const ticker = Ticker.shared;
  ticker.autoStart = false;


  // Setup menu
  const menuContainer = new Container();
  const startStopButton = createStartStopButton(
    app, 
    MENU_WIDTH, 
    MENU_Y,
    handleStartStopGame,
    BUTTON_RECT_WIDTH,
    BUTTON_RECT_HEIGHT,
    BUTTON_TEXT_X,
    BUTTON_TEXT_Y
  );
  const menuLine = new Graphics();
  menuLine.rect(app.screen.width - MENU_WIDTH, 0, 1, app.screen.height)
  menuLine.fill(0x000000)

  const scoreText = createScoreText(
    app, 
    score, 
    MENU_WIDTH, 
    MENU_Y,
    startStopButton.height
  );
  menuContainer.addChild(menuLine)
  menuContainer.addChild(scoreText);
  menuContainer.addChild(startStopButton)
  app.stage.addChild(menuContainer);

  // Create restart game button
  const restartGameButton = createResetButton(
    app, 
    restartGame,
    BUTTON_RECT_WIDTH,
    BUTTON_RECT_HEIGHT,
    BUTTON_TEXT_X,
    BUTTON_TEXT_Y
  );
  
  const endGameText = createEndGameText()

  function endGame(result: string) {
    // Add end game text
    if (result === "win") {
      endGameText.text = 'Congratulations, you won!';
    } else if (result === "lose") {
      endGameText.text = 'You lose!';
    }

    // Set endgame text position
    endGameText.position.set((app.screen.width - endGameText.width) / 2, (app.screen.height / 2) - restartGameButton.height - 10);

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
    restartGameButton.position.set((app.screen.width - restartGameButton.width) / 2, (app.screen.height - restartGameButton.height) / 2)
    
    // Add restart game button
    app.stage.addChild(restartGameButton);
    
    // Move score text to the center of the screen
    scoreText.position.set((app.screen.width - scoreText.width) / 2, (app.screen.height + restartGameButton.height + 10) / 2 );
  }

  function restartGame() {
    // Handle restart game button click
    // Reset data to initial state

    // Reset the score
    score = resetScore(score, scoreText);
    
    // Reset score text position
    scoreText.position.set(app.screen.width - (MENU_WIDTH + scoreText.width) / 2, startStopButton.height + MENU_Y + 5);

    // Show start stop button
    startStopButton.visible = true;
    
    // Move button to the correct position if the window was resized
    startStopButton.position.set(app.screen.width - (MENU_WIDTH + BUTTON_RECT_WIDTH) / 2, MENU_Y);

    // Remove restart game button
    app.stage.removeChild(restartGameButton);

    // Remove end game text
    app.stage.removeChild(endGameText);
  }

  ticker.add((ticker: Ticker) => {

    // Increase the falling speed based on the score
    let fallingSpeed = BASE_SPEED + (score * SPEED_INCREASE_PER_POINT);

    let spawnRate = BASE_SPAWN_TIME / (1 + (fallingSpeed - BASE_SPEED) * SPAWN_RATE_FACTOR);

    // Keep track of the time elapsed
    lastSpawnTime += ticker.deltaTime / 60;
    if (lastSpawnTime >= spawnRate) {
      // Spawn new rectangle
      const rectangle = createRectangle(app, MENU_WIDTH);
      rectangles.push(rectangle);
      app.stage.addChild(rectangle);

      // Reset the timer
      lastSpawnTime = 0;
    }

    // Check if the score is 50, end the game
    if (score >= 50) {
      // Win game screen
      endGame("win");
    }

    // Make the rectangles fall
    for (const rectangle of rectangles) {
      rectangle.y += fallingSpeed;

      // Check if the rectangle has reached the bottom of the screen
      if (rectangle.y > app.screen.height - rectangle.height) {
        ticker.stop();
        // GAME OVER
        endGame("lose");
      }
    }

  }); 

  ticker.stop();  

  function handleStartStopGame() {
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
      if ((rectangle.children[1] as Text).text === upperCaseKey) return rectangle;
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
      score = increaseScore(score, scoreText);
    } else {
      score = decreaseScore(score, scoreText);
    }
  }

})();