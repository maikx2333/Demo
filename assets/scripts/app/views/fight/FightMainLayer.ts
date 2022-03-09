
import { _decorator, Component, Node, tween, director, AnimationManager, view, log } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = FightMainLayer
 * DateTime = Wed Mar 09 2022 10:44:34 GMT+0800 (中国标准时间)
 * Author = Steven_Greeard
 * FileBasename = FightMainLayer.ts
 * FileBasenameNoExtension = FightMainLayer
 * URL = db://assets/scripts/app/views/fight/FightMainLayer.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('FightMainLayer')
export class FightMainLayer extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        // [3]
        tween()
        let animaiotnMgr = <AnimationManager>director.getSystem(AnimationManager.ID)
        // animaiotnMgr.
        log(view.getVisibleSize());
        log(view.getDesignResolutionSize());
        log(view.getResolutionPolicy());
        log(view.getViewportRect());
        log(view.getVisibleSizeInPixel());
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
