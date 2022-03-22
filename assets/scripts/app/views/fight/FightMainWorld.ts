import { Component, error, log, Node, UITransform } from "cc";
import { UIWidget } from "../../../framework/ui/UIWidget";
import { FightConstant } from './FightConstant';
import { FomationLayer } from "./layer/FomationLayer";
import { RoleLayer } from "./layer/RoleLayer";
export class FightMainWorld extends Node{
    
    // 层级管理
    private _layerMap:Map<number,Node> = new Map<number,Node>();

    private _formationLayer:FomationLayer = null;

    private _roleLayer:RoleLayer = null;

    /**
     * @description 初始化
     */
    public init() {
        this.addComponent(UITransform);
        this.addComponent(UIWidget);
        this._initLayers();
        this._addLayers();
    }

    private _initLayers() {
        this._layerMap.set(FightConstant.FightLayer.FORMATION,this._createNode("FORMATION")); //布阵层
        this._layerMap.set(FightConstant.FightLayer.BOTTM_EFFECT,this._createNode("BOTTM_EFFECT")); //底层特效层
        this._layerMap.set(FightConstant.FightLayer.ROLE,this._createNode("ROLE")); //角色层
        this._layerMap.set(FightConstant.FightLayer.TOP_EFFECT,this._createNode("TOP_EFFECT")); //上层特效层
        this._layerMap.set(FightConstant.FightLayer.BOOLD,this._createNode("BOOLD")); //数字层
        this._layerMap.set(FightConstant.FightLayer.Dailog,this._createNode("Dailog")); //对话层
    }

    private _createNode(name:string):Node {
        let node = new Node();
        node.name = name;
        node.addComponent(UITransform);
        node.addComponent(UIWidget);
        this.addChild(node);
        return node
    }

    private async _addLayers() {
        // 布阵
        this._formationLayer = this.addCommonentInLayer(FightConstant.FightLayer.FORMATION,FomationLayer) as FomationLayer;
        await this._formationLayer.init();

        // 角色
        this._roleLayer = this.addCommonentInLayer(FightConstant.FightLayer.ROLE,RoleLayer) as RoleLayer;
        this._roleLayer.init();
    }

    /**
     * game start
     */
    public startGame() {
        this._formationLayer.startGame();
        this._roleLayer.startGame();
    }

    /**
     * tick
     */
    public tick(dt:number) {
        
    }

    /**
     * @description 根据层索引返回层节点
     * @param index:number 层索引
     */
    public getLayer(index:number):Node | null {
        if (!this._layerMap.get(index)){
            error("There is not exist layer in FightMainWorld! index:[ %s ]",index.toString());
            return null;
        }
        return this._layerMap.get(index);
    }

    /**
     * @description 根据层索引往层中添加节点
     * @param index 层索引
     * @param node  需要添加的节点
     * @param siblingIndex? 设置当前节点在父节点的 children 数组中的位置。
     */
    public insertChildInLayer(index:number,child:Node,siblingIndex?:number) {
        let layer = this.getLayer(index);
        if (layer) {
            layer.addChild(child);
            layer.setSiblingIndex(siblingIndex);
        }
    }

      /**
     * @description 根据层索引往层中添加组件
     * @param index 层索引
     * @param com  组件
     */
    public addCommonentInLayer(index:number,com:typeof Component):Component {
        let layer = this.getLayer(index);
        if (layer) {
            return layer.addComponent(com);
        }
    }
}