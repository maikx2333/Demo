import { log } from "cc";
import { Singleton } from "../yy";
import { Message } from "./Message";

/*
 * @Author: liuguoqing
 * @Date: 2022-03-02 17:38:38
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-02 17:54:36
 * @Description: file content
 */

type callbackFunc = (data: any) => void | string | boolean;

export class EventMgr extends Singleton {
    // 字段
    _listeners: Map<number, Map<string, callbackFunc>>;
    _listenerHandleIndex: number;

    _isDispatchEventing = false;
    _waitAddListeners: Array<[number, callbackFunc, string]>;
    _waitDelListeners: Map<string, number>;

    // 构造函数
    constructor() {
        super();

        this._listeners = new Map();
        this._listenerHandleIndex = 0;
        this._waitAddListeners = [];
        this._waitDelListeners = new Map();
    }

    // 方法
    addEventListener(eventName: number, listener: callbackFunc): string {
        if (this._listeners.get(eventName) == null) {
            this._listeners.set(eventName, new Map());
        }

        ++this._listenerHandleIndex;
        let handle = `HANDLE_${this._listenerHandleIndex}`;

        if (this._isDispatchEventing) {
            this._waitAddListeners.push([eventName, listener, handle]);
            return handle;
        }

        this._listeners.get(eventName).set(handle, listener);
        return handle;
    }

    removeEventListener(eventName: number, key: string) {
        if (this._isDispatchEventing) {
            this._waitDelListeners.set(key, eventName);
            return;
        }

        let cellMap = this._listeners.get(eventName);
        if (cellMap == null) return;
        let iterator = cellMap.entries();
        let r: IteratorResult<[string, callbackFunc]>;
        while (((r = iterator.next()), !r.done)) {
            // cc.log(r);
            let v = r.value;
            let handle = v[0];
            let listener = v[1];
            if (key == handle || key == listener) {
                cellMap.delete(handle);
                break;
            }
        }
    }

    dispatchEvent(event: Message) {
        this._isDispatchEventing = true;

        let eventName = event.msgId;
        if (this._listeners.get(eventName) == null) {
            this._isDispatchEventing = false;
            return;
        }

        let cellMap = this._listeners.get(eventName);
        if (cellMap == null) return;
        let iterator = cellMap.entries();
        let r: IteratorResult<[string, callbackFunc]>;
        while (((r = iterator.next()), !r.done)) {
            // cc.log(r);
            let v = r.value;
            let handle = v[0];
            let listener = v[1];

            // is wait del, don't callback
            if (this._waitDelListeners.get(handle) == null) {
                let ret = listener(event.msgData);
                if (ret == false) {
                    log("Break: handle ", handle, "  eventName", eventName);
                    break;
                } else if (ret == "__REMOVE__") {
                    cellMap.delete(handle);
                }
            }
        }

        //dispatchEvent end
        this._isDispatchEventing = false;

        this._waitAddListeners.forEach((value) => {
            this._listeners.get(value[0]).set(value[2], value[1]);
        });

        this._waitDelListeners.forEach((value, key) => {
            this.removeEventListener(value, key);
        });

        this._waitAddListeners.splice(0, this._waitAddListeners.length);
        this._waitDelListeners.clear();
    }
}

class ModelEventMgr extends EventMgr {}
class MsgEventMgr extends EventMgr {}
class ViewEventMgr extends EventMgr {}

export let modelEventMgr = (()=>{
    return ModelEventMgr.getInstance<ModelEventMgr>();
})();

export let msgEventMgr = (()=>{
    return MsgEventMgr.getInstance<MsgEventMgr>();
})();

export let viewEventMgr = (()=>{
    return ViewEventMgr.getInstance<ViewEventMgr>();
})();
