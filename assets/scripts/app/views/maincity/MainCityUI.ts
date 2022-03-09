
import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('MainCityUI')
export class MainCityUI extends Component {

    @property(Label)
    roleName:Label=null;

    start () {
        this.roleName.setString("麦坤雄");
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}