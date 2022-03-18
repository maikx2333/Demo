import { Singleton } from "../../../framework/components/Singleton";

/**
 * @description 回合控制器 
 * */
export class FightController extends Singleton{
    
    // 当前大回合
    private _round:number=0;
    // 当前事件(每回合有多个)
    private _event:number=0;

    public pause(){

    }

    public resume(){

    }

    public start(){

    }
}