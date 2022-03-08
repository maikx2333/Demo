// import { EventCallback, modelEventMgr } from "../yy";

import { EventCallback, modelEventMgr } from "../listener/EventMgr";

export class ModelBase {

    private _handles: Map<string, number> = new Map();

    regMsg(eventName: number, listener: EventCallback): void {
        let handle = modelEventMgr.addEventListener(
            eventName,
            listener
        );

        if (this._handles.get(handle) != null) return;
        this._handles.set(handle, eventName);
    }

    unRegMsgAll(): void {
        this._handles.forEach((value, key) => {
            modelEventMgr.removeEventListener(value, key);
        });

        this._handles.clear;
    }
}
