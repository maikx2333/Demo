
import { _decorator, Component, Node, Label, log, EventTouch, resources } from 'cc';
import { sceneMgr } from '../../../framework/core/SceneMgr';
import { ComponentBase } from '../../../framework/ui/ComponentBase';
import { ViewProtocol } from '../../define/ViewProtocol';
const { ccclass, property } = _decorator;
 
@ccclass('MainCityUI')
export class MainCityUI extends ComponentBase {

    @property(Label)
    roleName:Label=null;

    start(){
        this.roleName.setString("麦坤雄");
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
    onClickBattleBtn(event:EventTouch,customEventData: string){
        sceneMgr.sendCreateView(ViewProtocol.FightFormation);
    }

    onClickQuestionBtn(event:EventTouch,customEventData: string){
        sceneMgr.sendCreateView(ViewProtocol.PreviewReward);
    }
}