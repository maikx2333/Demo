/*
 * @Author: liuguoqing
 * @Date: 2022-03-19 11:17:19
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-20 16:14:40
 * @Description: file content
 */
import { log, v3 } from "cc";
import { yy } from "../../../define/YYNamespace";
import { RoleSpineFactory } from "../../common/spine/RoleSpineFactory";
import { HeroSpineNode, MonsterSpineNode } from "../../common/spine/SpineNodeBase";
import { FormationView } from "../../formation/FormationView";
import { FightConstant } from "../FightConstant";
import { FightLayerBase } from "./FightLayerBase";

export class RoleLayer extends FightLayerBase {
  
    private _attackRoleList:Array<HeroSpineNode> = new Array<HeroSpineNode>();
    private _defendRoleList:Array<MonsterSpineNode> = new Array<MonsterSpineNode>();

    public init() {
        this._loadRoles();
    }

    public startGame(){
        this._attackRoleList.forEach(element => {
            element.spineCom.play(yy.macro.HeroAnimate.Stand,true);
        });

        this._defendRoleList.forEach(element => {
            element.spineCom.play(yy.macro.HeroAnimate.Stand,true);
        });
    }

    public updateView(data) {
        
    }

    private _loadRoles() {
        this._loadAttackers();
        this._loadDefenders();
    }

    private _loadAttackers() {
        for (let index = 0; index < 5; index++) {
            RoleSpineFactory.createHeroSpineById(1,(node:HeroSpineNode)=>{
                this.node.addChild(node);
                this._setPosition(node,index,true);
                this._attackRoleList.push(node);
                node.setScale(v3(-1,1,1));
            })
        }
    }

    private _loadDefenders(){
        for (let index = 0; index < 5; index++) {
            RoleSpineFactory.createHeroSpineById(1,(node:MonsterSpineNode)=>{
                this.node.addChild(node);
                this._setPosition(node,index);
                this._defendRoleList.push(node);
            })
        }
    }

    private _setPosition(node:HeroSpineNode,idx:number,isAttacker?:boolean) {
        let layer = this._mainWorld.getLayer(FightConstant.FightLayer.FORMATION);
        let com = layer.getComponentInChildren(FormationView);
        let pos = isAttacker? com.getAttackPosByIndex(idx) : com.getDefendPosByIndex(idx);
        node.position = pos;
    }
}