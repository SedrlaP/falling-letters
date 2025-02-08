import { Text }  from "pixi.js";

export function createEndGameText() {
    const endGameText = new Text({ text: '', 
        style: { fontSize: 24} 
      });

    return endGameText
}