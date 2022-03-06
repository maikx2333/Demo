/*
 * @Author: liuguoqing
 * @Date: 2022-03-02 10:59:24
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-06 14:50:40
 * @Description: file content
 */
import { _decorator, Component, Node, log, Sprite, tween, Vec3 } from 'cc';
import { dataMgr, httpMgr, viewRegisterMgr } from '../framework/yy';

const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = test_js
 * DateTime = Wed Mar 02 2022 10:59:24 GMT+0800 (中国标准时间)
 * Author = Steven_Greeard
 * FileBasename = test.js.ts
 * FileBasenameNoExtension = test.js
 * URL = db://assets/resources/scripts/app/test.js.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('test')
export class test extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property({type:Sprite})
    // bg:Sprite=null;
    // serializableDummy = 0;
    onload(){
        // console.log("onload",this.bg);
    }

    start () {
        // [3]
        tween(this.node)
        .to(3, { position: new Vec3(10, 10, 10)}, { easing: 'bounceInOut' })
        .to(3, { position: new Vec3(0, 0, 0)}, { easing: 'elasticOut' })
        .union()
        .repeat(2) // 执行 2 次
        .start();
    }

    update (deltaTime: number) {
        // [4]
        // console.log(deltaTime);DataRegisterMgr
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
