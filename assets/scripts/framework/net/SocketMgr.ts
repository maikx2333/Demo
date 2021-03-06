import { log } from "cc";
import { Singleton } from "../components/Singleton";
import { gameMgr } from "../core/GameMgr";
import { Message } from "../listener/Message";
import { netLoadingMgr } from "./NetLoadingMgr";
import { netStateMgr } from "./NetStateMgr";

/*
 * @Author: liuguoqing
 * @Date: 2022-03-02 17:01:02
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-19 13:16:31
 * @Description: file content
 */

export type SocketCallback = {
    (event: any):void
}

class SocketMgr extends Singleton {
    private _ws: WebSocket;
    private _StateChangeCallback: SocketCallback;
    private _ip: string;
    private _port: string;

    private constructor() {
        super();
        // net state change callback
        let socketParams = {
            StateChangeCallback: this._listenOnSocketState.bind(this),
        };
        this.registerCallbackHandler(socketParams);
        
    }

    connect( ip: string,port: string,openFunc:SocketCallback,errorFunc:SocketCallback) {
        this._ip = ip;
        this._port = port;
        try {
            let url = `ws://${ip}:${port}`;
            let ws = new WebSocket(url);
            this._ws = ws;
            ws.onopen = (event) => {
                this._onopen(event);
                openFunc(event);
            };
            ws.onmessage = (event) => {
                this._onmessage(event);
            };
            ws.onerror = (event) => {
                this._onerror(event);
                errorFunc(event);
            };
            ws.onclose = (event) => {
                this._onclose(event);
                errorFunc(event);
            };
        } catch (error) {
            log("connect error: ", error);
        }
    }

    reConnect() {
        if (this._ip && this._port) {
            this.connect(
                this._ip,
                this._port,
                (event) => {},
                (event) => {log(event);}
            );
        }
    }

    close() {
        if (this._ws) {
            this._ws.close(4888);
            this._ws = null;
        }
    }

    send(msgId: number, data: Object = {}) {
        data["proto"] = msgId;
        data = JSON.stringify(data);
        log("[WS] Send:", msgId, data);
        this._ws.send(<string>data);

        netLoadingMgr.addMsgLoading(msgId)
    }

    sendInnerMsg(msgId: number, data: Object = {}) {
        let msg = new Message(msgId, data);
        log("[WS] Send Inner:", msgId, data);
        gameMgr.addInnerMessage(msg);
    }

    registerCallbackHandler(params) {
        this._StateChangeCallback = params.StateChangeCallback;
    }

    /**
     * ??????Socket ????????????
     */
     private _listenOnSocketState(event) {
        netStateMgr.onSocketChange(event);
    }

    private _onopen(event) {
        log("Send Text WS was opened.");
        log(event);
        if (this._StateChangeCallback) {
            this._StateChangeCallback(event);
        }
    }

    // ????????????
    private _onmessage(event: any) {
        let data = event.data;
        if (data == null) {
            log(event);
            return;
        }
        let jsonData = JSON.parse(data);
        log("[WS] Rev:", jsonData.proto, data);
        let msg = new Message(-jsonData.proto, jsonData);
        gameMgr.addNetMessage(msg);

        netLoadingMgr.removeMsgLoading(msg.msgId)
    }

    private _onerror(event) {
        log("Send Text fired an error");
        if (this._StateChangeCallback) {
            this._StateChangeCallback(event);
        }
    }

    private _onclose(event) {
        log(event);
        log("WebSocket instance closed.");
        if (this._StateChangeCallback) {
            this._StateChangeCallback(event);
        }
    }

    clear() {
        socketMgr = null;
    }
}

// ()();
export let socketMgr = (()=>{
    return SocketMgr.getInstance<SocketMgr>();
})();