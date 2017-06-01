import { BasicEffect } from "./effect";
import * as PIXI from "pixi.js";
import { Stage } from "../stage/stage";

export class RandomCircle implements BasicEffect {

    graphics = new PIXI.Graphics();
    autoMode = true;
    numOfCircles = 4;

    api = {
        '/effect/trigger': () => {
            this.drawCircles(this.numOfCircles);
            Stage.render();
        },
        '/effect/automode': (args) => {
            if (args[0].value == 1) {
                this.autoMode = true;
            } else {
                this.autoMode = false;
            }
        }
    }

    update(numberOfTicks: number): void {
        if (this.autoMode && numberOfTicks % 60 == 0) {
            this.drawCircles(this.numOfCircles);
            Stage.render();
        }
    }

    drawCircles(amount: number) {
        this.graphics.clear();
        for (let i = 0; i < amount; i++) {
            // Get random coordinates
            let coords = this.getRandomCoordinates();

            // set a fill and line style
            this.graphics.beginFill(0xFFAACC, 0.5);
            this.graphics.drawCircle(coords.x, coords.y, 60);
        }
    }

    getDrawable() {
        return this.graphics
    }

    private getRandomCoordinates(): any {
        return {
            x: Math.floor(Math.random() * 600) + 1,
            y: Math.floor(Math.random() * 600) + 1
        }
    }
}