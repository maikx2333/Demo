/*
 * @Author: liuguoqing
 * @Date: 2022-03-03 20:51:02
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-04 23:37:27
 * @Description: file content
 */

import { Singleton } from "../../framework/yy";
import { NoInfer, ViewModuleName } from "./ConfigType";

export class ViewRegisterMgr extends Singleton{
    ViewType = {
        login: {
            prefab: {
                "LoadingView": 'core/prefab/LoadingView',
                "AccountView": 'core/prefab/AccountView',
            },
        },
        game: {
            prefab: {
                "block": 'game/prefab/block',
            },
        },
        home: {
            prefab: {
                "initPrefab": 'home/prefab/initPrefab',
            },
        },
    };

    getViewPrefrabPath<TMoudleName extends ViewModuleName,TPrefabName  = keyof  ViewRegisterMgr['ViewType'][TMoudleName]['prefab']>(name: TMoudleName, prefabName: NoInfer<TPrefabName>):string|null {
        let module = this.ViewType[name];
        return module.prefab[<string><unknown>prefabName];
    }
}

// ()();
export let viewRegisterMgr = (()=>{
    return ViewRegisterMgr.getInstance<ViewRegisterMgr>();
})();