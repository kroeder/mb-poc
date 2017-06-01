import { Effect } from './../../../out/osc-server-win32-x64/resources/app/src/app/effect/effect';
import { Snowstorm } from './../effect/snowstorm';
import { RandomCircle } from './../effect/random-circle';
import { RandomCircle } from '../effect/random-circle';
import * as PIXI from "pixi.js";
import { BasicEffect } from "../effect/effect";
import { Snowstorm } from "../effect/snowstorm";

export class Stage {

    static renderer = PIXI.autoDetectRenderer(0, 0, {
        autoResize: true,
        antialias: true
    });
    static stage: PIXI.Container = new PIXI.Container();
    static currentEffect: BasicEffect;

    static effects: BasicEffect[] = [
        new RandomCircle(),
        new Snowstorm()
    ];

    static init(stageElement: Element) {
        Stage.initStage(stageElement);
        Stage.loadEffect(0);
        Stage.update();
    }

    static initStage(stageElement: Element) {
        // Init renderer
        Stage.renderer.view.style.position = "absolute";
        Stage.renderer.view.style.display = "block";
        Stage.renderer.resize(window.innerWidth, window.innerHeight);
        stageElement.appendChild(Stage.renderer.view);
    }

    static loadEffect(effectId: number) {
        if(Stage.effects[effectId] === null) {
            console.error("No effect with ID", effectId);
            return;
        }
        console.log(Stage.effects[effectId]);
        Stage.currentEffect = Stage.effects[effectId];
        Stage.stage.removeChildren();
        Stage.stage.addChild(Stage.currentEffect.getDrawable());
    }

    static update() {
        const ticks = requestAnimationFrame(Stage.update);
        Stage.currentEffect.update(ticks);
    }

    static render() {
        Stage.renderer.render(Stage.stage);
    }
}