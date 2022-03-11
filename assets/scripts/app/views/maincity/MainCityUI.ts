
import { _decorator, Component, Node, Label, log, EventTouch } from 'cc';
import { sceneMgr } from '../../../framework/core/SceneMgr';
import { ViewProtocol } from '../../define/ViewProtocol';
const { ccclass, property } = _decorator;
 
@ccclass('MainCityUI')
export class MainCityUI extends Component {

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
}