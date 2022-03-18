
import { _decorator, Component, Node, tween, director, AnimationManager, view, log, Prefab, instantiate, TweenSystem } from 'cc';
import { ResourcesLoader } from '../../../framework/data/ResourcesLoader';
import { LayerBase } from '../../../framework/ui/LayerBase';
import { Protocol } from '../../define/Protocol';
import { viewRegisterMgr } from '../../define/ViewRegisterMgr';
import { fightEventMgr } from './event/FightEventMgr';
import { FightConstant } from './FightConstant';
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
        this._ladMainUI();
        this._addListeners();
    }

    /**
     * @description 初始化
     */
    public init(report:any) {
        
    }

    private _initManagers() {
        fightEventMgr.init();
    }

    private _initBg() {
        
    }

    private _loadMainWorld() {
        this._fightMainWorld = new FightMainWorld();
        this._fightMainWorld.init();
        this._content.addChild(this._fightMainWorld);
    }

    private _ladMainUI() {
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

    private _startGame() {
        this._fightMainWorld.startGame();
    }

    update (dt: number) {
        this._fightMainWorld.tick(dt);
    }



    onDestroy(){

    }
}