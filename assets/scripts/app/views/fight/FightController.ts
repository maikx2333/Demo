/*
 * @Author: liuguoqing
 * @Date: 2022-03-19 11:17:19
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-20 22:57:06
 * @Description: file content
 */
import { log } from "cc";
import { Singleton } from "../../../framework/components/Singleton";
import { FightEvent } from "./event/FightEvent";
import { FightEventDataType } from "./event/FightEventDataType";
import { fightEventMgr } from "./event/FightEventMgr";
import { FightConstant } from "./FightConstant";

export let fightController:FightController = null;
/**
 * @description 回合控制器 
 * */
export class FightController extends Singleton{

    // 当前大回合
    private _round:number=0;
    // 当前事件(每回合有多个)
    private _event:number=0;

    public static init(){
        fightController = FightController.getInstance<FightController>();
        fightController._init();
    }

    private _init(){
        fightEventMgr.addEventListener(FightConstant.FightEvent.Game_Star,this._start.bind(this));
    }

    private _start(){
        this._roundStart();
    }

    private _roundStart() {
        this._round += 1;//回合数+1
        this._event = 0;//每回合归零
        let data:FightEventDataType.Round_Start = {
            Round: this._round
        }
        fightEventMgr.send(new FightEvent(FightConstant.FightEvent.Round_Start,data))
        this._eventStart()
    }

    private _eventStart() {
        this._event += 1;


    }

    public replay(){

    }

    public pause(){

    }

    public resume(){

    }

    public destory(){
        FightController.destoryInstance();
    }

    public clear(){
        fightController = null;
    }
    
}