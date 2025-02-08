import { Application, Graphics, Text}  from "pixi.js";


export function createStartStopButton(app: Application, MENU_WIDTH: number, startStopGame: () => void) {
    // Set constants
    const BUTTON_RECT_WIDTH = 120;
    const BUTTON_RECT_HEIGHT = 50;
    const BUTTON_TEXT_X = BUTTON_RECT_WIDTH / 2
    const BUTTON_TEXT_Y = BUTTON_RECT_HEIGHT / 2
    
    // Create startStopButton text
    const buttonText = new Text({ text: 'Start / Stop', 
      style: { fontSize: 16} 
    });

    buttonText.anchor.set(0.5);
    buttonText.position.set(BUTTON_TEXT_X, BUTTON_TEXT_Y);

    // Create startStopButton
    const button = new Graphics();

    button.rect(0, 0, BUTTON_RECT_WIDTH, BUTTON_RECT_HEIGHT);
    button.fill(0xFFFFFF);
    button.cursor = 'pointer';
    button.interactive = true;
    button.on('pointerdown', () => startStopGame()); 
    button.addChild(buttonText);
    button.position.set(app.screen.width - MENU_WIDTH, 0);

    return button; 
  }