
import { _decorator, Component, Node, assert, Vec3 } from 'cc';
import { ComponentBase } from '../../../framework/ui/ComponentBase';
const { ccclass, property } = _decorator;
 
@ccclass('FormationView')
export class FormationView extends ComponentBase {

    @property([Node])
    leftPosList:Node[]=[];

    @property([Node])
    rightPosList:Node[]=[];

    start(){
        
    }

    /**
     * 
     * @description 获取攻方部队索引值 (左)
     * @param index 部队所引致
     */
    public getAttackPosByIndex(index:number):Vec3{
        let node = this.leftPosList[index];
        assert(node,"FormationView:getAttackPosByIndex() node does not exit [%s]",index.toString());
        return node.position;
    }

    /**
     * 
     * @description 获取守方部队索引值 (右)
     * @param index 部队所引致
     */
    public getDefendPosByIndex(index:number):Vec3{
        let node = this.rightPosList[index];
        assert(node,"FormationView:getDefendPosByIndex() node does not exit [%s]",index.toString());
        return node.position;
    }

}

