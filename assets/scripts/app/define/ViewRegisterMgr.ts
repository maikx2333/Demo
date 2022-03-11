/*
 * @Author: liuguoqing
 * @Date: 2022-03-03 20:51:02
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-04 23:37:27
 * @Description: file content
 */

import { log } from "cc";
import { Singleton } from "../../framework/components/Singleton";
import { DialogCreator } from "../views/dialog/Creator";
import { LoginCreator } from "../views/login/Creator";
import { PreRewardCreator } from "../views/pre_reward/Creator";
import { MainCityCreator } from "../views/maincity/Creator";
import { ShowBackgroundMgr } from "./define";
import { viewCreatorMgr } from "../../framework/ui/ViewCreatorManager";
import { FightCreator } from "../views/fight/Creator";
import { FormationCreator } from "../views/formation/Creator";
import { yy } from "./YYNamespace";
import { ViewInfoType } from "./ConfigType";

export class ViewRegisterMgr extends Singleton{

    // 注册预页面预制体路径
    ViewType = {
        commonUI:{
            prefab:{
                "RewardItemIcon":["common_ui/prefabs/RewardItemIcon",false]
            }
        },
        // 登陆
        login: {
            prefab: {
                "LoginView": ['core/prefab/LoginView',false],
                "AccountView":['core/prefab/AccountView',false]
            },
        },
        // dialog/tips
        dialog:{
            prefab:{
                "DoubleBtnDialog":['common_ui/prefabs/double_btn_dialog',true]
            }
        },
        preReward:{
            prefab:{
                "preRewardMain":["preview_reward/prefabs/preview_reward_prefab", true]
            }
        },
        // 主城
        maincity:{
            prefab:{
                "MainCityLayer":["maincity/prefabs/maincitylayer",false],
                "MainCityUI":["maincity/prefabs/maincityui",false]
            }
        },
        // 战斗
        fight:{
            prefab:{
                "FightMainLayer":["fight/prefabs/changjing/mainfightlayer",false],
                "FightMainUI":["fight/prefabs/changjing/mainfightui",false],
                "FightFormation":["fight/prefabs/changjing/FightFormation", false],
            }
        },
        // 武将
        hero:{
            prefab:{
                "HeroSpinePrefab":["hero/prefabs/hero/",false]
            }
        },
        //布阵
        formation:{
            prefab:{
                "FormationView":["formation/prefabs/formation",false]
            }
        }
    
    }

    // 注册各个系统的预制体
    Cretors = [
        LoginCreator,
        DialogCreator,
        PreRewardCreator,
        MainCityCreator,
        FightCreator,
        FormationCreator,
    ]
    
    private constructor() {
        super();
        Object.keys(this.ViewType).forEach((system:string)=>{
            // log("ViewRegisterMgr:ctor() system [ %s ]",system);
            let module = this.ViewType[system];
            Object.keys(module.prefab).forEach((view:string)=>{
                let arr = module.prefab[<string><unknown>view];
                let isHidden = <boolean>arr[1];
                // log("ViewRegisterMgr:ctor() view [ %s ] [ %s ]",view,isHidden.toString());
                if (isHidden) {
                    ShowBackgroundMgr.regShowBackgroundView(view);
                }
            })
        })
    }


    // 各个系统中获取页面预制的都路径
    getViewInfo<TMoudleName extends yy.types.ViewModuleName,
                            TPrefabName  = keyof  ViewRegisterMgr['ViewType'][TMoudleName]['prefab']>
                                (name: TMoudleName, prefabName: yy.types.NoInfer<TPrefabName>):ViewInfoType{
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