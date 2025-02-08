import { Application, Graphics, Text}  from "pixi.js";


export function createResetButton(app: Application, restartGame: () => void) {   
    // Set constants
    const BUTTON_RECT_WIDTH = 120;
    const BUTTON_RECT_HEIGHT = 50;
    const BUTTON_TEXT_X = BUTTON_RECT_WIDTH / 2
    const BUTTON_TEXT_Y = BUTTON_RECT_HEIGHT / 2
    
    // Create resetButton text
    const buttonText = new Text({ text: 'Restart game', 
      style: { fontSize: 16} 
    });

    buttonText.anchor.set(0.5);
    buttonText.position.set(BUTTON_TEXT_X, BUTTON_TEXT_Y);

    // Create resetButton
    const button = new Graphics();

    button.rect(0, 0, BUTTON_RECT_WIDTH, BUTTON_RECT_HEIGHT);
    button.fill(0xFFFFFF);
    button.cursor = 'pointer';
    button.interactive = true;
    button.on('pointerdown', () => restartGame()); 
    button.addChild(buttonText);
    button.position.set((app.screen.width - BUTTON_RECT_WIDTH) / 2, (app.screen.height / 2) + 50 );

    return button; 
  }