
import { _decorator, Component, Node, Prefab, instantiate, log } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = skill_edirot
 * DateTime = Wed Mar 09 2022 11:18:57 GMT+0800 (中国标准时间)
 * Author = maikx123456
 * FileBasename = skill_edirot.ts
 * FileBasenameNoExtension = skill_edirot
 * URL = db://assets/scripts/skillEditor/skill_edirot.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('skill_edirot')
export class skill_edirot extends Component {
    @property(Prefab)
    timeLinePrefab:Prefab;

    @property(Node)
    timeLineContainer:Node;

    // @property(cc.Prefab)
    // playScene: cc.Prefab

    start () {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    onAddTimeLine(){
        log("add time line..")
        var timeLineNew: Node = instantiate(this.timeLinePrefab)
        this.timeLineContainer.addChild(timeLineNew)


        // var timeLineComp = timeLineNew.getComponent(TimeLine)
        // if (data == "sceneTimeLine") {
        //     timeLineComp.setType(define.TimeLineType_Scene)
        // }
        // else if (data == "roleTimeLine") {
        //     timeLineComp.setType(define.TimeLineType_Role)
        // }
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
