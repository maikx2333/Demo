
import { _decorator, Component, Node, find, Button, Label, Prefab, instantiate } from 'cc';
import { FightActionTypeName } from '../scripts/app/define/FightConst';
import { TimeSetPanel } from './TimeSetPanel';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = TimeLineItem
 * DateTime = Wed Mar 09 2022 14:25:09 GMT+0800 (中国标准时间)
 * Author = maikx123456
 * FileBasename = TimeLineItem.ts
 * FileBasenameNoExtension = TimeLineItem
 * URL = db://assets/skill_eitor/TimeLineItem.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('TimeLineItem')
export class TimeLineItem extends Component {

    @property(Prefab)
    setTimePanelPrefab:Prefab

    start () {
        // [3]
    }

    //Action类型
    private _type: number;
    public get type(): number {
        return this._type;
    }
    public set type(value: number) {
        this._type = value;
        let labelNode = find("Button/Label", this.node)
        labelNode.getComponent(Label).string = FightActionTypeName.get(value)
    }

    private _time: number = 0;
    public get time(): number {
        return this._time;
    }
    public set time(value: number) {
        this._time = value;

        let labelNode = find("timeBtn/Label", this.node)
        labelNode.getComponent(Label).string = value + "s"
    }

    onClick(){
        
    }

    onClickSetTime(){
        let setTimePanel = instantiate(this.setTimePanelPrefab)
        let setTimePanelComp = setTimePanel.getComponent(TimeSetPanel)
        setTimePanelComp.callBack = this.onSetTimeFinish.bind(this)
        let canvas = find("Canvas")
        canvas.addChild(setTimePanel)
    }

    onSetTimeFinish(sec:number) {
        this.time = sec
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
