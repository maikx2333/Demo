
import { _decorator, Component, Node, find, EditBox, error } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = TimeSetPanel
 * DateTime = Wed Mar 09 2022 15:04:15 GMT+0800 (中国标准时间)
 * Author = maikx123456
 * FileBasename = TimeSetPanel.ts
 * FileBasenameNoExtension = TimeSetPanel
 * URL = db://assets/skill_eitor/TimeSetPanel.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('TimeSetPanel')
export class TimeSetPanel extends Component {
    @property(Node)
    editBoxNode:Node

    callBack:(sec:number)=>{};

    start () {
        // [3]
    }

    onClickCancle(){
        this.node.destroy()
    }

    onClickOk(){
        let editBoxComp = this.editBoxNode.getComponent(EditBox)
        let sec:number;
        sec = Number(editBoxComp.string)
        sec || error("请出入数字")
        this.callBack(sec)
        this.node.destroy()
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
