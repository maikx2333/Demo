
import { _decorator,Node, sp, Prefab, instantiate } from 'cc';
import { SpineComponentBase } from './SpineComponentBase';
const { ccclass } = _decorator;
@ccclass
class SpineNodeBase extends Node {

    private _spine:SpineComponentBase = null; 

    public get spine() :SpineComponentBase {
        return this._spine
    }
    
    constructor(spineNode:Node){
        super();
        this.addChild(spineNode);
        this._spine = this.getComponentInChildren(SpineComponentBase);
    }
}

// 武将
export class HeroSpineNode extends SpineNodeBase {}
// 敌方
export class MonsterSpineNode extends SpineNodeBase {}