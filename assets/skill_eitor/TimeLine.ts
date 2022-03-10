
import { _decorator, Component, Node, Prefab, instantiate, log, director, error, find } from 'cc';
import { FightActionType } from '../scripts/app/define/FightConst';
import { ActionTypeSelPanel } from './ActionTypeSelPanel';
import { TimeLineItem } from './TimeLineItem';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = time_line
 * DateTime = Wed Mar 09 2022 11:51:22 GMT+0800 (中国标准时间)
 * Author = maikx123456
 * FileBasename = time_line.ts
 * FileBasenameNoExtension = time_line
 * URL = db://assets/skill_eitor/time_line.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('TimeLine')
export class TimeLine extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property(Node)
    itemContainer:Node

    @property(Prefab)
    timeLineItemPrefab:Prefab

    @property(Prefab)
    actionSelPanel:Prefab

    start () {
        // [3]

    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    onClickAddItem(){
        log("onClickAddItem")

        //添加选择Action面板

        // this._actionSelPanel  && error("_actionSelPanel is null")
        let actionSelPanel = instantiate(this.actionSelPanel)
        actionSelPanel.getComponent(ActionTypeSelPanel).callBack = this.onSelAction.bind(this)

        let canvas = find("Canvas")
        canvas.addChild(actionSelPanel)
    }

    onSelAction(type:FightActionType) {
        log("选择类型：" + type)

        let tlItem = instantiate(this.timeLineItemPrefab)
        let tlItemComp = tlItem.getComponent(TimeLineItem)
        tlItemComp.type = type
        this.itemContainer.addChild(tlItem)
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
