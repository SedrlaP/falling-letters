import {Text}  from "pixi.js";

export function increaseScore(score: number, scoreText: Text) {
    score += 1;
    scoreText.text = 'Score: ' + score;
    return score
}

export function decreaseScore(score: number, scoreText: Text) {
    if (score > 0) {
      score -= 1;
      scoreText.text = 'Score: ' + score;
    }
    return score
}
  
export function resetScore(score: number, scoreText: Text) {
    score = 0;
    scoreText.text = 'Score: ' + score;
    return score
}