import { Node } from "cc";
import { RoleSpineFactory } from "../common/spine/RoleSpineFactory";
import { HeroSpineNode } from "../common/spine/SpineNodeBase";

export class FightMainWorld extends Node{
    

    /**
     * tick
     */
    public tick(dt:number) {
        
    }

    public addHero(id){
        let hero = RoleSpineFactory.createHeroSpineById(1,(node:HeroSpineNode)=>{

        });

    }
}