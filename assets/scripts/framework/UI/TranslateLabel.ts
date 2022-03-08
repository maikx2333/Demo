import { Component, Label, _decorator } from "cc";
import { translateMgr } from "../translate/TranslateMgr";

const { ccclass, property } = _decorator;

@ccclass
export default class TranslateLabel extends Component {
    @property(Number)
    translateId: number = 0;

    onLoad() {
        let lbl = this.node.getComponent(Label);
        if (lbl && this.translateId) {
            lbl.string = translateMgr.translate(this.translateId);
        }
    }
}
