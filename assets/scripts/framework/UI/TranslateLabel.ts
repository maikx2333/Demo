import { CCBoolean, CCInteger, Component, Label, _decorator } from "cc";
import { translateMgr } from "../translate/TranslateMgr";

const { ccclass, property } = _decorator;

@ccclass
export default class TranslateLabel extends Component {
    @property(CCInteger)
    translateId: number = 0;
    @property({type:CCBoolean,tooltip:"是否代码翻译,即由代码setString翻译"})
    isTranslateByCode:boolean = false;

    onLoad() {
        let lbl = this.node.getComponent(Label);
        if (lbl && this.translateId && !this.isTranslateByCode) {
            lbl.string = translateMgr.translate(this.translateId);
        }
    }
}
