/*
 * @Author: liuguoqing
 * @Date: 2022-03-19 11:17:19
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-20 16:14:40
 * @Description: file content
 */
import { error, js, log, v3 } from "cc";
import { yy } from "../../../define/YYNamespace";
import { RoleSpineFactory } from "../../common/spine/RoleSpineFactory";
import { HeroSpineNode, MonsterSpineNode } from "../../common/spine/SpineNodeBase";
import { FormationView } from "../../formation/FormationView";
import { FightFormationData } from "../data/FightData";
import { fightDataMgr } from "../data/FightDataMgr";
import { FightConstant } from "../FightConstant";
import { FightLayerBase } from "./FightLayerBase";

export class RoleLayer extends FightLayerBase {
  
    private _attackRoleList:Array<HeroSpineNode> = new Array<HeroSpineNode>();
    private _defendRoleList:Array<MonsterSpineNode> = new Array<MonsterSpineNode>();

    public init() {
        this._loadRoles();
    }

    private _loadRoles() {
        let rp = fightDataMgr.getFightData();
        let attackers = rp.getAttackFormationDatas();
        this._loadAttackers(attackers);
        let defenders = rp.getDefendFormationDatas();
        this._loadDefenders(defenders);
    }

    private _loadAttackers(attackers:Array<FightFormationData>) {
        for (let index = 0; index < attackers.length; index++) {
            let attackInfo = attackers[index];
            let heroId = attackInfo.getHeroId();
            if (heroId == -1){
                return error(js.formatStr("RoleLayer:_loadAttackers heroId = -1 index:[%d]",index));
            }
            RoleSpineFactory.createHeroSpineById(heroId,(node:HeroSpineNode)=>{
                this.node.addChild(node);
                this._setPosition(node,index,true);
                this._attackRoleList.push(node);
                node.addBloodUI();
            })
        }
    }

    private _loadDefenders(defenders:Array<FightFormationData>){
        for (let index = 0; index < defenders.length; index++) {
            let defenderInfo = defenders[index];
            let heroId = defenderInfo.getHeroId();
            if (heroId == -1){
                return error(js.formatStr("RoleLayer:_loadDefenders heroId = -1 index:[%d]",index));
            }
            RoleSpineFactory.createHeroSpineById(heroId,(node:MonsterSpineNode)=>{
                this.node.addChild(node);
                this._setPosition(node,index);
                this._defendRoleList.push(node);
                node.setScale(v3(-1,1,1));
                node.changeSkin("2");
                node.addBloodUI();
            })
        }
    }

    private _setPosition(node:HeroSpineNode,idx:number,isAttacker?:boolean) {
        let layer = this._mainWorld.getLayer(FightConstant.FightLayer.FORMATION);
        let com = layer.getComponentInChildren(FormationView);
        let pos = isAttacker? com.getAttackPosByIndex(idx) : com.getDefendPosByIndex(idx);
        node.position = pos;
    }

    public startGame(){
        this._attackRoleList.forEach(element => {
            element.play(yy.macro.HeroAnimate.Idle,true);
            element.changeEquip("2","dao2","dao2");
        });

        this._defendRoleList.forEach(element => {
            element.play(yy.macro.HeroAnimate.Idle,true);
            element.changeEquip("2","dao2","dao2");
        });
    }

    public updateView(data) {
        
    }
}