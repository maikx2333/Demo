import { modelEventMgr } from "../yy";

type callbackFunc = (data: any) => void;

export class ModelBase {
    private _handles: Map<string, number> = new Map();

    regMsg(eventName: number, listener: callbackFunc): void {
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
