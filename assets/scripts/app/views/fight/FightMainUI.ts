
import { _decorator, Component, Node, EventTouch, log, AnimationComponent, Button } from 'cc';
import { sceneMgr } from '../../../framework/core/SceneMgr';
import { ComponentBase } from '../../../framework/ui/ComponentBase';
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
    }

    onClickCloseBtn(event:EventTouch,customEventData:string){
        sceneMgr.popTableLayer();
    }

    onClickSpeedBtn(event:EventTouch,customEventData:string){
        log("===>speed");
    }
}