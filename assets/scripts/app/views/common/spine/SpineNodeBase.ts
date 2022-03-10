
import { _decorator,Node } from 'cc';
const { ccclass } = _decorator;
@ccclass
class SpineNodeBase extends Node {
    
}

// 武将
export class HeroSpineNode extends SpineNodeBase {}
// 敌方
export class MonsterSpineNode extends SpineNodeBase {}