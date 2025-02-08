import { Application, Graphics, Container, Text}  from "pixi.js";


export function createResetButton(
  app: Application, 
  restartGame: () => void,
  BUTTON_RECT_WIDTH: number,
  BUTTON_RECT_HEIGHT: number,
  BUTTON_TEXT_X: number,
  BUTTON_TEXT_Y: number,
) {   
    // Create resetButton text
    const buttonText = new Text({ text: 'Restart game', 
      style: { fontSize: 16} 
    });

    buttonText.anchor.set(0.5);
    buttonText.position.set(BUTTON_TEXT_X, BUTTON_TEXT_Y);

    // Create resetButton
    const button = new Container();
    const btnBg = new Graphics();

    btnBg.roundRect(0, 0, BUTTON_RECT_WIDTH, BUTTON_RECT_HEIGHT, 6);
    btnBg.fill(0xFFFFFF);
    btnBg.stroke({ width: 2, color: 0x000000 });
    button.cursor = 'pointer';
    button.interactive = true;
    button.on('pointerdown', () => restartGame()); 
    button.addChild(btnBg)
    button.addChild(buttonText);
    button.position.set((app.screen.width - BUTTON_RECT_WIDTH) / 2, (app.screen.height - BUTTON_RECT_WIDTH) / 2 );

    return button; 
  }