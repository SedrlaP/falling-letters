import {Container, Text}  from "pixi.js";

export function increaseScore(score: number, scoreText: Container) {
    score += 1;
    (scoreText.children[1].children[1] as Text).text = score;
    
    return score
}

export function decreaseScore(score: number, scoreText: Container) {
    score -= 2;
    // If score is less than 0 return 0 else return score
    score = score <= 0 ? 0 : score;
    (scoreText.children[1].children[1] as Text).text = score;
    return score
}
  
export function resetScore(score: number, scoreText: Container) {
    score = 0;
    (scoreText.children[1].children[1] as Text).text = score;

    return score
}