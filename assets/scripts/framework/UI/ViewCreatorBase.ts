// import { EventCallback, viewEventMgr } from "../yy";

import { EventCallback, viewEventMgr } from "../listener/EventMgr";

export class ViewCreatorBase {
    private _handles: Map<string, number>;

    constructor() {
        this._handles = new Map();
    }

    //重写
    onInit():void{
        
    };

    regMsg(eventName: number, listener: EventCallback): void {
        let handle = viewEventMgr.addEventListener( eventName,listener);

        if (this._handles.get(handle) != null) return;
        this._handles.set(handle, eventName);
    }

    unRegMsgAll(): void {
        this._handles.forEach((value, key) => {
            viewEventMgr.removeEventListener(value, key);
        });

        this._handles.clear;
    }
}