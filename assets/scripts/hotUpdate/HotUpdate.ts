
import { _decorator, Component, Node, js, director } from 'cc';
import { EnterApp } from '../app/EnterApp';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = HotUpdate
 * DateTime = Tue Mar 08 2022 10:55:51 GMT+0800 (中国标准时间)
 * Author = Steven_Greeard
 * FileBasename = HotUpdate.ts
 * FileBasenameNoExtension = HotUpdate
 * URL = db://assets/scripts/hotUpdate/HotUpdate.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('HotUpdate')
export class HotUpdate extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        // [3]
        this.scheduleOnce((dt:number)=>{
            this.goMainScene();
        },1);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    goMainScene(){
        director.loadScene("main", () => {
            new EnterApp();
        });
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
