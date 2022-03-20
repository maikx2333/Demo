/*
 * @Author: liuguoqing
 * @Date: 2022-03-19 11:17:19
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-20 23:03:19
 * @Description: file content
 */
import { Singleton } from "../../../../framework/components/Singleton";
import { FightEvent } from "./FightEvent";

interface FightEventHandler{
    (event:FightEvent):void
}

export let fightEventMgr:FightEventMgr = null;

export class FightEventMgr extends Singleton{

    private _eventHandlers:Map<number,Array<FightEventHandler>>=null;
    
    /**
     * init
     */
    public static init() {
        fightEventMgr = FightEventMgr.getInstance<FightEventMgr>();
        fightEventMgr._init();
    }

    private _init(){
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

    public send(event:FightEvent){
        this._dispatchEvent(event);
    }

    private _dispatchEvent(event:FightEvent){
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

    public destory(){
        FightEventMgr.destoryInstance();
    }

    public clear(){
        fightEventMgr = null;
    }
}