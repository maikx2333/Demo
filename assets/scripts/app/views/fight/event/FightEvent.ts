/**
 * @description 战斗事件
 */
export class FightEvent {
    private _eventId:number;
    private _args:any;

    constructor(eventId:number,args:any) {
        this._eventId = eventId;
        this._args = args;
    }

    /**
     * getEventId
     */
    public getEventId() {
        return this._eventId;
    }

    public getEventData(){
        return this._args;
    }
}