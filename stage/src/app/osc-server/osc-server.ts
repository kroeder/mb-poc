import {OscMessage} from './osc-server';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as express from 'express';
import {Stage} from "../stage/stage";

export interface OscMessage {
    address : string,
    args : any[]
}

export class OscServer {

    app : express.Application;
    server : http.Server;
    wss : WebSocket.Server;

    constructor(port : number) {
        this.initWebsocket(port);
    }

    static listen(port : number) {
        return new OscServer(port);
    }

    initWebsocket(port : number) {
        const osc = require("osc");
        this.wss = new WebSocket
            .Server({port: port})
            .on("connection", (socket) => {
                console.log("New connection opened", socket);
                const socketPort = new osc.WebSocketPort({socket: socket, metadata: true});
                socketPort.on("message", (oscMsg : OscMessage) => {
                    this.dispatch(oscMsg);
                    console.log("An OSC Message was received!", oscMsg);
                });
            })
            .on("listening", () => {
                console.info("WebSocket Server is listening on port " + this.wss.options.port);
            })
            .on("error", (msg) => {
                console.error("WebSocket error", msg);
            });
    }

    dispatch(oscMessage : OscMessage) {
        try {

            if (this.isEffectApiCall(oscMessage)) {
                Stage
                    .currentEffect
                    .api[oscMessage.address]
                    .call(this, oscMessage.args);
            } else if (this.isEffectChange(oscMessage)) {
                Stage.loadEffect(oscMessage.args[0]);
            }

        } catch (e) {
            console.error(e);
        }
    }

    isEffectApiCall(oscMessage : OscMessage) : boolean {
        return /^\/effect\/(\w|\/)*$/.test(oscMessage.address);
    }

    /**
     * @todo argument check (type: i && value: number)
     */
    isEffectChange(oscMessage : OscMessage) : boolean {
        return /^\/effect(\/)?$/.test(oscMessage.address);
    }

}