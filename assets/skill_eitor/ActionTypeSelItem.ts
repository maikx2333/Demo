
import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = ActionTypeSelItem
 * DateTime = Wed Mar 09 2022 16:33:02 GMT+0800 (中国标准时间)
 * Author = maikx123456
 * FileBasename = ActionTypeSelItem.ts
 * FileBasenameNoExtension = ActionTypeSelItem
 * URL = db://assets/skill_eitor/ActionTypeSelItem.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('ActionTypeSelItem')
export class ActionTypeSelItem extends Component {
    // [1]
    // dummy = '';

    // [2]
    @property(Node)
    labelNode:Node

    @property(Node)
    selNode:Node

    //Action类型文本
    private _txt: string;
    public get txt(): string {
        return this._txt;
    }
    public set txt(value: string) {
        this._txt = value;
        let labelComp = this.labelNode.getComponent(Label);
        labelComp.string = value;
    }

    private _type: number;
    public get type(): number {
        return this._type;
    }
    public set type(value: number) {
        this._type = value;
    }

    private _isSel: boolean;
    public get isSel(): boolean {
        return this._isSel;
    }
    public set isSel(value: boolean) {
        this._isSel = value;
        this.selNode.active = value
    }

    start () {
        // [3]
        this.isSel = false;
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
