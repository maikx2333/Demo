/**
 * 生产角色spine工厂方法
 */

import { instantiate, Prefab } from "cc";
import { ResourcesLoader } from "../../../../framework/data/ResourcesLoader";
import { viewRegisterMgr } from "../../../define/ViewRegisterMgr";
import { HeroSpineNode, MonsterSpineNode } from "./SpineNodeBase";

export interface HeroCreateCallback {
    (node:HeroSpineNode):void
}

export interface MonsterCreateCallback {
    (node:MonsterSpineNode):void
}

export class RoleSpineFactory {
    /**
     * @description 创建武将
     * @param id 
     * @param callback 返回武将节点
     */
    public static createHeroSpineById(id:number,callback:HeroCreateCallback):void{
        let info = viewRegisterMgr.getViewInfo("hero","HeroSpinePrefab");
        let file = info.Path + "hero_" + id.toString();
        RoleSpineFactory._load(file,callback);
    }

    // 
       /**
     * @description 创建怪物
     * @param id 
     * @param callback 返回怪物节点
     */
    public static createMonsterSpineById(id:number,callback:MonsterCreateCallback) {
        
    }

    private static _load(fileUrl,callback:HeroCreateCallback):void{
        ResourcesLoader.load(fileUrl,(prefab:Prefab)=>{
            let spineNode = instantiate(prefab);
            let node = new HeroSpineNode(spineNode);
            if (callback){
                callback(node);
            }
        })
    }
}