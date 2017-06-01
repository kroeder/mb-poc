export class OscClient {
    oscPortReady = false;

    oscPort;

    constructor(host = "localhost:8081") {
        try {
            console.info(`Connecting to ${host}`);
            let osc = require("osc");
            this.oscPort = new osc.WebSocketPort({url: `ws://${host}`, metadata: true});
            this
                .oscPort
                .open();
            this
                .oscPort
                .on("ready", () => {
                    console.info(`Connection estabilished`);
                    this.oscPortReady = true;
                });
        } catch (e) {
            console.error(e);
        }

    }

    send(address : string, args?: any[]) {
        console.log(`Client information`, this.oscPort);
        console.log(`Sending ${address}`, {arguments: args});
        try {
            this
                .oscPort
                .send({address, args});
        } catch (e) {
            console.error("Error on sending message", e);
        }
    }

}