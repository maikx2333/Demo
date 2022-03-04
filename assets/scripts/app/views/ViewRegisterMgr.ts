/*
 * @Author: liuguoqing
 * @Date: 2022-03-03 20:51:02
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-04 08:56:10
 * @Description: file content
 */

import { Singleton } from "../../framework/yy";

// 延时推断输入泛型 ，输入的泛型会被置于默认泛型之后
type NoInfer<A extends any> = [A][A extends any ? 0 : never];
export type ViewModuleName = keyof ViewRegisterMgr["ViewType"];

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