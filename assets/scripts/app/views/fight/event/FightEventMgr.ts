import { Singleton } from "../../../../framework/components/Singleton";
import { FightEvent } from "./FightEvent";

interface FightEventHandler{
    (event:FightEvent):void
}

class FightEventMgr extends Singleton{

    private _eventHandlers:Map<number,Array<FightEventHandler>>=null;
    /**
     * init
     */
    public init() {
       this._eventHandlers = new Map<number,Array<FightEventHandler>>();
    }
     
    public addEventListener(eventId:number,handler:FightEventHandler){
        let handlerQueue = this._eventHandlers.get(eventId);
        if (!handlerQueue) {
            handlerQueue = new Array<FightEventHandler>();
            this._eventHandlers.set(eventId,handlerQueue);
        }
        handlerQueue.push(handler);
    }

    public removeEventListener(eventId:number,handler:FightEventHandler){
        let handlerQueue = this._eventHandlers.get(eventId);
        if (handlerQueue) {
            let idx = handlerQueue.indexOf(handler);
            if (idx != -1){
                handlerQueue.splice(idx);
            }
        }
    }

    public dispatchEvent(event:FightEvent){
        let eventId = event.getEventId();
        let handlerQueue = this._eventHandlers.get(eventId);
        if (handlerQueue) {
            handlerQueue.forEach((handler)=>{
                if (handler) {
                    handler(event);
                }
            })
        }
    }
}

export let fightEventMgr:FightEventMgr = FightEventMgr.getInstance<FightEventMgr>();