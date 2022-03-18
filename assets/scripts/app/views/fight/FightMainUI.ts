
import { _decorator, Component, Node, EventTouch, log, AnimationComponent, Button, director, AnimationManager, game } from 'cc';
import { sceneMgr } from '../../../framework/core/SceneMgr';
import { socketMgr } from '../../../framework/net/SocketMgr';
import { ComponentBase } from '../../../framework/ui/ComponentBase';
import { Protocol } from '../../define/Protocol';
import { FightEvent } from './event/FightEvent';
import { fightEventMgr } from './event/FightEventMgr';
import { FightConstant } from './FightConstant';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = FightMainUI
 * DateTime = Wed Mar 09 2022 15:26:59 GMT+0800 (中国标准时间)
 * Author = Steven_Greeard
 * FileBasename = FightMainUI.ts
 * FileBasenameNoExtension = FightMainUI
 * URL = db://assets/scripts/app/views/fight/FightMainUI.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('FightMainUI')
export class FightMainUI extends ComponentBase {
    @property(Button)
    startBtn:Button=null;

    private _root:Node=null;
    start () {
        this._root = this.node.parent;
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    onClickStartBtn(event:EventTouch,customEventData:string){
        this.startBtn.node.active = false;
        let animteComp = this._root.getComponent(AnimationComponent);
        animteComp.play();
        fightEventMgr.dispatchEvent(new FightEvent(FightConstant.FightEvent.Game_Star,null));
    }

    onClickCloseBtn(event:EventTouch,customEventData:string){
        sceneMgr.popTableLayer();
    }

    update(dt:number){
        // log("dt",dt);
    }

    onClickSpeedBtn(event:EventTouch,customEventData:string){
        let speed = 2;
        socketMgr.sendInnerMsg(Protocol.Inner.SetAnimationSpeed,speed);
    }
}