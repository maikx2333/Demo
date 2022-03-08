/*
 * @Author: liuguoqing
 * @Date: 2022-03-03 20:51:02
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-04 23:37:27
 * @Description: file content
 */

import { log } from "cc";
import { Singleton } from "../../framework/components/Singleton";
import { viewCreatorMgr } from "../../framework/ui/ViewCreatorManager";
import { DialogCreator } from "../views/dialog/Creator";
import { LoginCreator } from "../views/login/Creator";
import { PreRewardCreator } from "../views/pre_reward/Creator";
import { NoInfer, ViewModuleName, ViewInfoType } from "./ConfigType";
import { HiddenBackgroundMgr } from "./define";

export class ViewRegisterMgr extends Singleton{

    // 注册预页面预制体路径
    ViewType = {
        login: {
            prefab: {
                "LoginView": ['core/prefab/LoginView',true],
                "AccountView":['core/prefab/AccountView',true]
            },
        },
        dialog:{
            prefab:{
                "DoubleBtnDialog":['core/prefab/LoginView',true]
            }
        },
        preReward:{
            prefab:{
                "preRewardMain":["preview_reward/preview_reward_prefab", true]
            }
        }
    };

    // 注册各个系统的预制体
    Cretors = [
        LoginCreator,
        DialogCreator,
        PreRewardCreator
    ]
    
    private constructor() {
        super();
        Object.keys(this.ViewType).forEach((system:string)=>{
            log("ViewRegisterMgr:ctor() system [ %s ]",system);
            let module = this.ViewType[system];
            Object.keys(module.prefab).forEach((view:string)=>{
                let arr = module.prefab[<string><unknown>view];
                let isHidden = <boolean>arr[1];
                log("ViewRegisterMgr:ctor() view [ %s ] [ %s ]",view,isHidden.toString());
                if (isHidden) {
                    HiddenBackgroundMgr.regHiddenBackgroundView(view);
                }
            })
        })
    }


    // 各个系统中获取页面预制的都路径
    getViewInfo<TMoudleName extends ViewModuleName,
                            TPrefabName  = keyof  ViewRegisterMgr['ViewType'][TMoudleName]['prefab']>
                                (name: TMoudleName, prefabName: NoInfer<TPrefabName>):ViewInfoType{
        let module = this.ViewType[name];
        let arr = module.prefab[<string><unknown>prefabName];
        return {
            System:name,
            View: <string><unknown>prefabName,
            Path: arr[0],
            Hidden:arr[1]
        };
    }

    // enter app call this method
    public registerAllCreator(){
        this.Cretors.forEach((ctor)=>{
            viewCreatorMgr.registeredCreator(new ctor());
        })
    }
}

// ()();
export let viewRegisterMgr = (()=>{
    return ViewRegisterMgr.getInstance<ViewRegisterMgr>();
})();