/*
 * @Author: liuguoqing
 * @Date: 2022-03-19 11:17:19
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-20 23:09:19
 * @Description: file content
 */
import { Singleton } from "../../../../framework/components/Singleton";

export let fightDataMgr:FightDataMgr = null;

export class FightDataMgr extends Singleton{
    
    public static init(){
        fightDataMgr = FightDataMgr.getInstance<FightDataMgr>();
        fightDataMgr._init();
    }

    private _init(){
        
    }
    
    /**
     * @description 解析战报
     * @param data 战报数据
     */
    public parse(data:any) {
        
    }

    public destory(){
        FightDataMgr.destoryInstance();
    }

    public clear() {
        fightDataMgr = null;
    }
}