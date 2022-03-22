/*
 * @Author: liuguoqing
 * @Date: 2022-03-03 13:52:55
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-03 17:52:07
 * @Description: file content
 */

import { _decorator, Component, JsonAsset, log, sys, director, dynamicAtlasManager } from 'cc';
import { ResourcesLoader } from './framework/data/ResourcesLoader';
import { GameConfig } from './GameConfig';
const { ccclass, property } = _decorator;
 
@ccclass('Launch')
export class Launch extends Component {

    @property({type:JsonAsset})
    serverConfig:JsonAsset=null;

    onLoad(){
        if (this.serverConfig) {
            let config = this.serverConfig.json;
            log("ServerConfig.json",JSON.stringify(config));
            Object.keys(config).forEach((key)=>{
                let value = config[key];
                GameConfig[key] = value;
            })
        }
    }

    start(){
        //动态合图
        // dynamicAtlasManager.enabled = false;
        this._keepScreenOn();
        this.scheduleOnce((dt:number)=>{
            this._startHotUpdate();
        },1)
    }

    //设置屏幕常亮
    private _keepScreenOn(){
        if (sys.isNative) {
            if (sys.os == sys.OS.IOS || sys.os == sys.OS.ANDROID) {
                jsb.device.setKeepScreenOn(true);
            }
        }
    }

    // 走热更新流程
    private _startHotUpdate() {
        director.loadScene("hotUpdate", () => {
            // 预加载
            // let paths = [
            //     "prefab/tongyong_ui/tongyong_tipsUI_00",
            //     "prefab/tongyong_ui/tongyong_tipsUI_01",
            // ];
            // for (let index = 0; index < paths.length; index++) {
            //     const element = paths[index];
            //     ResourcesLoader.preload(element, () => {});
            // }
        });
    }
}

