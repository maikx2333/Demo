/*
 * @Author: liuguoqing
 * @Date: 2022-03-19 11:17:19
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-20 23:02:10
 * @Description: file content
 */

import { _decorator, Prefab, instantiate, Node, js, sys } from 'cc';
import { ResourcesLoader } from '../../../framework/data/ResourcesLoader';
import { LayerBase } from '../../../framework/ui/LayerBase';
import { viewRegisterMgr } from '../../define/ViewRegisterMgr';
import { FightEvent } from './event/FightEvent';
import { fightEventMgr,FightEventMgr } from './event/FightEventMgr';
import { FightConstant } from './FightConstant';
import { fightController,FightController } from './FightController';
import { FightMainUI } from './FightMainUI';
import { FightMainWorld } from './FightMainWorld';
const { ccclass, property } = _decorator;
 
@ccclass('FightMainLayer')
export class FightMainLayer extends LayerBase {
    
    private _fightMainWorld:FightMainWorld = null;
    private _fightMainUI:FightMainUI = null;
    private _content:Node = null;
    private _rootNode:Node = null;

    onLoad () {
        super.onLoad();
        this._rootNode = this.node.parent;
        this._content = this._rootNode.getChildByName("content");
        this._initManagers();
        this._initBg();
        this._loadMainWorld();
        this._loadMainUI();
        this._addListeners();
    }

    /**
     * @description 初始化
     */
    public init(report:any) {
        
    }

    private _initManagers() {
        // 事件派发器
        FightEventMgr.init();
        // 回合控制器
        FightController.init();
        // 战斗播放器
    }

    private _initBg() {
        
    }

    private _loadMainWorld() {
        this._fightMainWorld = new FightMainWorld();
        this._fightMainWorld.init();
        this._content.addChild(this._fightMainWorld);
    }

    private _loadMainUI() {
        let viewInfo = viewRegisterMgr.getViewInfo("fight","FightMainUI");
        ResourcesLoader.loadWithViewInfo(viewInfo,(data:Prefab)=>{
            let uiNode = instantiate(data);
            this._content.addChild(uiNode);
            this._fightMainUI = uiNode.getComponentInChildren("FightMainUI") as FightMainUI;
        })
    }

    private _addListeners() {
        fightEventMgr.addEventListener(FightConstant.FightEvent.Game_Star,this._startGame.bind(this));
    }

    private _startGame(event:FightEvent) {
        this._fightMainWorld.startGame();
        this._fightMainUI.startGame();
    }

    update (dt: number) {
        this._fightMainWorld.tick(dt);
    }

    onDestroy(){
        fightEventMgr.destory();
        fightController.destory();
    }
}