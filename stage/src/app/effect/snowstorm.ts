import {BasicEffect} from "./effect";
import * as PIXI from "pixi.js";

export class Snowstorm implements BasicEffect {

    container = new PIXI.Container();
    assets : PIXI.Sprite[] = [];

    api = {
        '/effect/trigger': () => {
        },
        '/effect/automode': () => {
        }
    }

    constructor() {
        let graphics : PIXI.Graphics;
        let texture : PIXI.Texture;
        let newX = 20;
        let newY = 20;
        for (let i = 0; i < 10000; i++) {
            graphics = new PIXI.Graphics();
            graphics.beginFill(0xFFFFFF, 1);
            graphics.drawCircle(0, 0, this.generateRandomNumber(5, 60));
            texture = graphics.generateCanvasTexture();
            this
                .assets
                .push(new PIXI.Sprite(texture));

            if (newX > 850) {
                newX = 20;
                newY += 80;
            } else {
                newX += 20;
            }
            this.assets[i].x = newX;
            this.assets[i].y = newY;
            this
                .container
                .addChild(this.assets[i]);
        }
    }

    update() : void {
        this.generateStorm();
    }

    getDrawable() {
        return this.container;
    }

    generateRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    };

    generateStorm() {

        this
            .assets
            .forEach((asset) => {
                asset.x = asset.x - 5;
                if (asset.x < -100) {
                    asset.x = 800;
                }
            });
    }
}
