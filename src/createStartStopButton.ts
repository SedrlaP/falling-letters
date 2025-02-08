import { Application, Container, Graphics, Text}  from "pixi.js";


export function createStartStopButton(
  app: Application, 
  MENU_WIDTH: number,
  MENU_Y: number, 
  startStopGame: () => void,
  BUTTON_RECT_WIDTH: number,
  BUTTON_RECT_HEIGHT: number,
  BUTTON_TEXT_X: number,
  BUTTON_TEXT_Y: number,
) {
    
    // Create startStopButton text
    const buttonText = new Text({ text: 'Start / Stop', 
      style: { fontSize: 16} 
    });

    buttonText.anchor.set(0.5);
    buttonText.position.set(BUTTON_TEXT_X, BUTTON_TEXT_Y);

    // Create startStopButton
    const button = new Container();
    const btnBg = new Graphics();
    btnBg.roundRect(0, 0, BUTTON_RECT_WIDTH, BUTTON_RECT_HEIGHT, 6);
    btnBg.fill(0xFFFFFF);
    btnBg.stroke({ width: 2, color: 0x000000 });
    button.cursor = 'pointer';
    button.interactive = true;
    button.on('pointerdown', () => startStopGame()); 
    button.addChild(btnBg)
    button.addChild(buttonText);
    
    button.position.set(app.screen.width - (MENU_WIDTH + BUTTON_RECT_WIDTH) / 2, MENU_Y);

    return button; 
  }