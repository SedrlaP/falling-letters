import { Application, Text } from 'pixi.js';

export function createScoreText(app: Application, score: number, MENU_WIDTH: number) {
    const scoreText = new Text({ text: 'Score: ' + score, 
        style: { fontSize: 16} 
      });
    scoreText.position.set(app.screen.width - MENU_WIDTH, 70)
    return scoreText;
}
