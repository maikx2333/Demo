
import { _decorator, Component, Node, find } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = NewComponent
 * DateTime = Thu Mar 10 2022 16:22:35 GMT+0800 (中国标准时间)
 * Author = maikx123456
 * FileBasename = NewComponent.ts
 * FileBasenameNoExtension = NewComponent
 * URL = db://assets/scripts/app/views/formation/NewComponent.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('NewComponent')
export class GeneralIconShowComp extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    private _isSel: boolean;
    public get isSel(): boolean {
        return this._isSel;
    }
    public set isSel(value: boolean) {
        this._isSel = value;
    }

    private _isShowSelIcon: boolean;
    public get isShowSelIcon(): boolean {
        return this._isShowSelIcon;
    }
    public set isShowSelIcon(value: boolean) {
        this._isShowSelIcon = value;

        let selIcon = find("board/gou", this.node)
        selIcon.active = value
    }

    start () {
        // [3]
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
