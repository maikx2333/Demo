import { CCBoolean, CCInteger, Component, Label, _decorator } from "cc";
import { translateMgr } from "../translate/TranslateMgr";

const { ccclass, property } = _decorator;

@ccclass
export default class TranslateLabel extends Component {
    @property(CCInteger)
    translateId: number = 0;

    @property(CCBoolean)
    isTranslateByCode:boolean = false;
    
    onLoad() {
        let lbl = this.node.getComponent(Label);
        if (lbl && this.translateId) {
            lbl.string = translateMgr.translate(this.translateId);
        }
    }
}
