import { Graphics, Text}  from "pixi.js";


export function createStartStopButton() {
    // Set constants
    const BUTTON_RECT_SIDE_LENGTH= 100
    const BUTTON_TEXT_COORDS = BUTTON_RECT_SIDE_LENGTH / 2
    
    const button = new Graphics();
    const buttonText = new Text({ text: 'Start / Stop', 
      style: { fontSize: 16} 
    });

    buttonText.anchor.set(0.5);
    buttonText.position.set(BUTTON_TEXT_COORDS, 35);

    button.rect(0, 0, BUTTON_RECT_SIDE_LENGTH, 70);
    button.fill(0xFFFFFF);
    button.cursor = 'pointer';
    button.interactive = true;
    button.addChild(buttonText);
    button.position.set(0, 0);

    return button; 
  }