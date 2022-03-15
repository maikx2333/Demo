
import { _decorator, Component, Node, find, log, EventTouch, v3 } from 'cc';
import { audioMgr } from '../../../framework/core/audio/AudioManager';
import { LayerBase } from '../../../framework/ui/LayerBase';
import { MulitMoveingBgs } from '../common/MulitMoveingBgs';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = MainCityLayer
 * DateTime = Tue Mar 08 2022 14:26:57 GMT+0800 (中国标准时间)
 * Author = Steven_Greeard
 * FileBasename = MainCityLayer.ts
 * FileBasenameNoExtension = MainCityLayer
 * URL = db://assets/scripts/app/views/maincity/MainCityLayer.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('MainCityLayer')
export class MainCityLayer extends LayerBase {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property(Node)
    private bgNode:Node
    _mulitBgComp:MulitMoveingBgs

    start () {
        // [3]
        audioMgr.playMusic("maincity/avs/bgm_liyuan")

        this._initBgTouch()
    }

    private _initBgTouch() {
        this._mulitBgComp = this.bgNode.getComponent(MulitMoveingBgs)
        this.node.parent.on(Node.EventType.TOUCH_MOVE, this.onBgTouchMove.bind(this))
    }

    private onBgTouchMove(event:EventTouch) {
        let deltaX = event.getDeltaX()
        this._mulitBgComp.move(deltaX * 1.1)
    }

    update (deltaTime: number) {
        // [4]
        
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
