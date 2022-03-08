/*
 * @Author: liuguoqing
 * @Date: 2022-03-02 10:59:24
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-06 14:50:40
 * @Description: file content
 */
import { _decorator, Component, Node, log, Sprite, tween, Vec3, Prefab, instantiate } from 'cc';
import { sceneMgr } from '../framework/core/SceneMgr';
import { ResourcesLoader } from '../framework/data/ResourcesLoader';
import { G } from './common/GlobalFunction';
import { Protocol } from './define/Protocol';
import { ViewProtocol } from './define/ViewProtocol';
import { ModelLogin } from './model/ModelLogin';

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
    model:ModelLogin;
    onload(){
        // console.log("onload",this.bg);

       
    }

    start () {
        // this.node.addComponent
        // // [3]
        // tween(this.node)
        // .to(3, { position: new Vec3(10, 10, 10)}, { easing: 'bounceInOut' })
        // .to(3, { position: new Vec3(0, 0, 0)}, { easing: 'elasticOut' })
        // .union()
        // .repeat(2) // 执行 2 次
        // .start();

        sceneMgr.init()

        ResourcesLoader.load("prefabs/common_ui/defautl_bg",<Prefab>(dataAsset)=>{
            let main:Node = instantiate(dataAsset)
            sceneMgr.replaceMainLayer(main, "sdasd")

            // ResourcesLoader.load("preview_reward/preview_reward_prefab",<Prefab>(dataAsset)=>{
            //     let ui:Node = instantiate(dataAsset)
            //     // sceneMgr.pushNewTableLayer()
            //     // sceneMgr.replaceTableContent(ui, ViewProtocol.PreviewReward)
            //     sceneMgr.replaceMainLayer(ui, "sdasd")
            // }, Prefab)

            sceneMgr.sendCreateView(ViewProtocol.PreviewReward)
        }, Prefab)
    }

    update (deltaTime: number) {
        // [4]
        // console.log(deltaTime);DataRegisterMgr
        // this.model = G.getModel(ModelLogin);
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
