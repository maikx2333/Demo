/*
 * @Author: Chenning
 * @Date: 2021-02-04 17:23:50
 * @LastEditTime: 2022-01-24 10:22:53
 * @LastEditors: Gino
 */
// 场景触发器，当然设置界面名字处于最前时候会回调
//  只有在切换table的时候会主动检查，不够可以找我聊

import { log } from "cc";
import { Singleton } from "../components/Singleton";
import { sceneMgr } from "../core/SceneMgr";

//  监听 使用范例
//  @参数
// -- #1.界面名字
// -- #2.回调方法 返回值为false即吞掉事件，后面的不触发
// -- #3.优先级, 默认为1, 越大优先级越高
// -- SFSceneTriggerMgr.getInstance().addTriggrt("GameMainUI", ()=> { return true; }, 1);
// -- SFSceneTriggerMgr.getInstance().addTriggrt("GameMainUI", ()=> { return false; }, 4);
// -- SFSceneTriggerMgr.getInstance().addTriggrt("GameMainUI", ()=> { return true; }, 2);
// -- SFSceneTriggerMgr.getInstance().addTriggrt("GameMainUI", ()=> { return true; }, 3);
// -- SFSceneTriggerMgr.getInstance().addTriggrt("scens7", "2");
// -- 主动检查 使用范例
// -- SFSceneTriggerMgr.getInstance().check();


export class SceneTriggerMgr extends Singleton {
    _listeners: Map<string, Array<any>>;
    _listenerHandleIndex;
    // 构造函数
    constructor() {
        super();
        this._listeners = new Map();
        this._listenerHandleIndex = 0;
    }

    // -- -- -- -- --
    // 添加监听事件
    // #1.界面名字
    // #2.回调方法 返回值为false即吞掉事件，后面的不触发
    // #3.优先级, 默认为1, 越大优先级越高
    addTriggrt(pSceneName, pHandler, pPriority) {
        if (this._listeners.get(pSceneName) == null) {
            this._listeners.set(pSceneName, []);
        }

        // 默认优先级1
        pPriority = pPriority || 1;
        this._listenerHandleIndex += 1;
        let handle = "Trigger_" + this._listenerHandleIndex;

        this._listeners.get(pSceneName).push([handle, pHandler, pPriority]);
        // 按照优先级重新排序
        this._sortTriggerByPriority(pSceneName);
        return handle;
    }

    // 分发事件
    dispatchEvent(pSceneName) {
        if (this._listeners.get(pSceneName) == null) {
            return;
        }
        let delArray;
        for (let index = 0; index < this._listeners.get(pSceneName).length; index++) {
            const event = this._listeners.get(pSceneName)[index];

            let handle = event[0];
            let listener = event[1];
            log(" ==========  SceneTriggerMgr go   " + pSceneName + handle);
            let ret = listener(event, pSceneName);
            if (ret == false) {
                break;
            } else if (ret == "__REMOVE__") {
                if (!delArray) {
                    delArray = [];
                }
                delArray.push(index);
            }
        }
        if (delArray && delArray.length > 0) {
            for (let index = 0; index < delArray.length; index++) {
                const element = delArray[index];
                this._listeners.get(pSceneName).splice(element, 1);
            }
        }
    }

    // 删除监听事件
    removeTriggrtListener(pSceneName, key) {
        if (this._listeners.get(pSceneName) == null) {
            return;
        }
        let removeIndex = -1;
        for (let index = 0; index < this._listeners.get(pSceneName).length; index++) {
            const event = this._listeners.get(pSceneName)[index];
            let handle = event[0];
            let listener = event[1];

            if (key == handle || key == listener) {
                removeIndex = index;
                break;
            }
        }
        if (removeIndex != -1) {
            this._listeners.get(pSceneName).splice(removeIndex, 1);
        }
    }

    //  场景管理器调用检查方法
    check() {
        let frontLayer = this._getCurFrontLayer();

        if (frontLayer) {
            let sceneName = frontLayer["name"];
            if ("__MainGroup" == sceneName) {
                sceneName = frontLayer["obj"]["name"];
            }

            if (sceneName == null) {
                return;
            }
            this.dispatchEvent(sceneName);
        }
    }

    //  -- -- -- -- -- -- --
    //  [Privete Function]
    //

    //  优先级排序
    private _sortTriggerByPriority(pSceneName) {
        this._listeners.get(pSceneName).sort((idA, idB) => {
            return idB - idA;
        });
    }

    // 获取最前面的层
    private _getCurFrontLayer() {
        let layer = sceneMgr.getCurFrontLayer();
        return layer;
    }

    // 覆盖销毁
    clear() {
        this._listeners.clear();
        this._listenerHandleIndex = 0;
        sceneTriggerMgr = null;
    }
}

export let sceneTriggerMgr = (() => {
    return SceneTriggerMgr.getInstance<SceneTriggerMgr>();
})();
