
import { _decorator, Component, Node, find } from 'cc';
import { sceneMgr } from '../../../framework/core/SceneMgr';
import { ListView } from '../../../framework/ui/ListView';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = PreReward
 * DateTime = Tue Mar 08 2022 15:03:30 GMT+0800 (中国标准时间)
 * Author = maikx1989
 * FileBasename = PreReward.ts
 * FileBasenameNoExtension = PreReward
 * URL = db://assets/scripts/app/views/pre_reward/PreReward.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('PreReward')
export class PreReward extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        // [3]

        this.setItems()
    }

    private setItems() {
        let listViewNode = find("content/ScrollView", this.node.parent)
        let items:number[] = [];
        for (let index = 0; index < 100; index++) {
            items.push(index);
        }

        let listViewComp = listViewNode.getComponent(ListView)
        listViewComp.setDelegate({items:()=>items})
        listViewComp.reload()
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
    private onClickClose() {
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
