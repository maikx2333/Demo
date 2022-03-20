/*
 * @Author: liuguoqing
 * @Date: 2022-03-19 11:17:19
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-20 16:41:48
 * @Description: file content
 */

import { _decorator,Node, sp, Prefab, instantiate, Vec3 } from 'cc';
import { SpineComponentBase } from './SpineComponentBase';
const { ccclass } = _decorator;
@ccclass
class SpineNodeBase extends Node {

    private _spineCom:SpineComponentBase = null; 

    public get spineCom() :SpineComponentBase {
        return this._spineCom
    }
    
    constructor(spineNode:Node){
        super();
        this.addChild(spineNode);
        this._spineCom = this.getComponentInChildren(SpineComponentBase);
    }

    
    /**
     * @description 添加特效在角色身上
     */
    public addEffectFont(node:Node,offset?:Vec3) {
        this._spineCom.addEffectFont(node,offset);
    }

    /**
     * @description 添加特效在角色脚上
     */
    public addEffectBack(node:Node,offset?:Vec3){
        this._spineCom.addEffectBack(node,offset);
    }
}

// 武将
export class HeroSpineNode extends SpineNodeBase {}
// 敌方
export class MonsterSpineNode extends SpineNodeBase {}