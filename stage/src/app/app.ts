import { Stage } from './stage/stage';
import { OscServer } from './osc-server/osc-server';

export function init() {
    return new App();
}

export class App {

    constructor() {
        // Init stage
        const stageElement = document.getElementsByTagName("stage")[0];
        Stage.init(stageElement);

        // Init osc server
        OscServer.listen(8081);
    }
}