import { log } from "cc";
import { yy } from "../../../define/YYNamespace";
import { RoleSpineFactory } from "../../common/spine/RoleSpineFactory";
import { HeroSpineNode } from "../../common/spine/SpineNodeBase";
import { FormationView } from "../../formation/FormationView";
import { FightConstant } from "../FightConstant";
import { FightLayerBase } from "./FightLayerBase";

export class RoleLayer extends FightLayerBase {
  
    private _attackRoleList:Array<HeroSpineNode> = new Array<HeroSpineNode>();

    public init() {
        this._loadRoles();
    }

    public startGame(){
        this._attackRoleList.forEach(element => {
            element.spine.play(yy.macro.HeroAnimate.Stand,true);
        });
    }

    public updateView(data) {
        
    }

    private _loadRoles() {
        // setTimeout(() => {
            this._loadHeros();
            this._loadMonster();
        // }, 1000);
    }

    private _loadHeros() {
        for (let index = 0; index < 5; index++) {
            RoleSpineFactory.createHeroSpineById(1,(node:HeroSpineNode)=>{
                this.node.addChild(node);
                this._setPosition(node,index);
                this._attackRoleList.push(node);
            })
        }
    }

    private _loadMonster(){

    }

    private _setPosition(node:HeroSpineNode,idx:number) {
        let layer = this._mainWorld.getLayer(FightConstant.FightLayer.FORMATION);
        let com = layer.getComponentInChildren(FormationView);
        let pos = com.getDefendPosByIndex(idx);
        node.position = pos;
    }
}