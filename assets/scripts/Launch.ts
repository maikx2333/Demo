/*
 * @Author: liuguoqing
 * @Date: 2022-03-03 13:52:55
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-03 13:55:50
 * @Description: file content
 */

import { _decorator, Component, Node, JsonAsset } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Launch
 * DateTime = Thu Mar 03 2022 13:52:55 GMT+0800 (中国标准时间)
 * Author = Steven_Greeard
 * FileBasename = Launch.ts
 * FileBasenameNoExtension = Launch
 * URL = db://assets/resources/scripts/Launch.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('Launch')
export class Launch extends Component {
    // [1]
    // dummy = '';

    // [2]
    @property({type:JsonAsset})
    serverConfig:JsonAsset=null;

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
