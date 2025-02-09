import { Application, Container, Graphics, Text } from 'pixi.js';

export function createScoreText(
  app: Application, 
  score: number, 
  MENU_WIDTH: number, 
  MENU_Y: number,
  SCORE_TEXT_HEIGHT_OFFSET: number,
) {
    const scoreText = new Container();

    const scoreString = new Text({ text: 'Score: ', 
        style: { fontSize: 16} 
      });
    scoreString.position.set(0, 7.5)

    const scoreNumberContainer = new Container();

    const scoreNumber = new Text({ text: score, 
      style: { fontSize : 16}
    });

    scoreNumber.label = "scoreNumber"
    scoreNumber.anchor.set(0.5);
    scoreNumber.position.set(15, 15)

    const scoreNumberBg = new Graphics();
    scoreNumberBg.rect(0, 0, 30, 30);
    scoreNumberBg.fill(0xFFFFFF);
    scoreNumberBg.stroke({ width: 2, color: 0x000000 });

    scoreText.addChild(scoreString);
    scoreText.addChild(scoreNumberContainer);
    scoreNumberContainer.addChild(scoreNumberBg);
    scoreNumberContainer.addChild(scoreNumber);

    scoreNumberContainer.position.set(scoreText.width, 0)
    scoreText.position.set(app.screen.width - (MENU_WIDTH + scoreText.width) / 2, SCORE_TEXT_HEIGHT_OFFSET + MENU_Y + 5)
    
    return scoreText;
}
