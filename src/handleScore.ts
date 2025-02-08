import {Text}  from "pixi.js";

export function increaseScore(score: number, scoreText: Text) {
    score += 1;
    scoreText.text = 'Score: ' + score;
    return score
}

export function decreaseScore(score: number, scoreText: Text) {
    score -= 2;
    // If score is less than 0 return 0 else return score
    score = score <= 0 ? 0 : score
    scoreText.text = 'Score: ' + score;
    return score
}
  
export function resetScore(score: number, scoreText: Text) {
    score = 0;
    scoreText.text = 'Score: ' + score;
    return score
}