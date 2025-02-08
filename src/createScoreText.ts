import { Application, Text } from 'pixi.js';

export function createScoreText(
  app: Application, 
  score: number, 
  MENU_WIDTH: number, 
  MENU_Y: number,
  SCORE_TEXT_HEIGHT_OFFSET: number,
) {
    const scoreText = new Text({ text: 'Score: ' + score, 
        style: { fontSize: 16} 
      });
    scoreText.position.set(app.screen.width - MENU_WIDTH, SCORE_TEXT_HEIGHT_OFFSET + MENU_Y)
    return scoreText;
}
