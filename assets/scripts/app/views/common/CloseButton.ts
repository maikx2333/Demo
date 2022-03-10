
import { _decorator, Component, Node } from 'cc';
import { sceneMgr } from '../../../framework/core/SceneMgr';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = CloseButton
 * DateTime = Thu Mar 10 2022 15:38:36 GMT+0800 (中国标准时间)
 * Author = maikx123456
 * FileBasename = CloseButton.ts
 * FileBasenameNoExtension = CloseButton
 * URL = db://assets/scripts/app/views/common/CloseButton.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('CloseButton')
export class CloseButton extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    onClick(){
        sceneMgr.popTableLayer()
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
