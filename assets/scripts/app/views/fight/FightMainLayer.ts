
import { _decorator, Component, Node, tween, director, AnimationManager, view, log } from 'cc';
import { FightMainWorld } from './FightMainWorld';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = FightMainLayer
 * DateTime = Wed Mar 09 2022 10:44:34 GMT+0800 (中国标准时间)
 * Author = Steven_Greeard
 * FileBasename = FightMainLayer.ts
 * FileBasenameNoExtension = FightMainLayer
 * URL = db://assets/scripts/app/views/fight/FightMainLayer.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('FightMainLayer')
export class FightMainLayer extends Component {
    
    private _fightMainWorld:FightMainWorld = null;

    start () {
        this._fightMainWorld = new FightMainWorld()
    }

    update (deltaTime: number) {
        this._fightMainWorld.tick(deltaTime);
    }
}