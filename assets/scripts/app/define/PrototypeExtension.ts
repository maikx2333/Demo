import { Label } from "cc";
import { EDITOR } from "cc/env";
import { translateMgr } from "../../framework/translate/TranslateMgr";
import TranslateLabel from "../../framework/ui/TranslateLabel";

Object.defineProperty(Label.prototype, "setString", {
    value: function (text:string) {
        if (EDITOR) {
            return;
        }
        let lbComp:TranslateLabel = this.node.getComponent(TranslateLabel);
        if (!lbComp.isTranslateByCode){
            return;
        }
        let id = lbComp.translateId;
        this.string = translateMgr.translate(id);
    },
    configurable: true,
});
