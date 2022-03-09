
import { _decorator, Component, Node, log, Prefab, find, instantiate, EventTouch } from 'cc';
import { FightActionTypeName } from '../scripts/app/define/FightConst';
import { ActionTypeSelItem } from './ActionTypeSelItem';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = ActionTypeSelPanel
 * DateTime = Wed Mar 09 2022 17:00:59 GMT+0800 (中国标准时间)
 * Author = maikx123456
 * FileBasename = ActionTypeSelPanel.ts
 * FileBasenameNoExtension = ActionTypeSelPanel
 * URL = db://assets/skill_eitor/ActionTypeSelPanel.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('ActionTypeSelPanel')
export class ActionTypeSelPanel extends Component {
    // [1]
    // dummy = '';

    // [2]
    @property(Prefab)
    actionTypeSelItemPrefab:Prefab;

    private _callBack: Function;
    public get callBack(): Function {
        return this._callBack;
    }
    public set callBack(value: Function) {
        this._callBack = value;
    }

    private _container:Node;
    private _selItem:Node;

    start () {
        // [3]
        this._container = find("Layout", this.node)
        this.showAllItems()
    }

    private showAllItems() {
        FightActionTypeName.forEach((v,k) => {

            let item = instantiate(this.actionTypeSelItemPrefab)
            let itemComp = item.getComponent(ActionTypeSelItem)
            itemComp.txt = v
            itemComp.type = k
            this._container.addChild(item)

            item.on(
                Node.EventType.TOUCH_END,
               this.onSelItem,
                this
            );
        });
    }

    onSelItem(touch:EventTouch) {
        log("sel item===")
        if (this._selItem) {
            this._selItem.getComponent(ActionTypeSelItem).isSel = false
        }
        this._selItem = touch.target
        this._selItem.getComponent(ActionTypeSelItem).isSel = true
    }

    onClickOk() {
        if (this._selItem) {
            this.callBack(this._selItem.getComponent(ActionTypeSelItem).type)
            this.node.destroy()
        }
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
