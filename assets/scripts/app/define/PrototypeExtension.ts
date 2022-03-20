/*
 * @Author: liuguoqing
 * @Date: 2022-03-12 11:22:04
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-19 15:25:51
 * @Description: file content
 */
import { Label, log } from "cc";
import { EDITOR } from "cc/env";
import { translateMgr } from "../../framework/translate/TranslateMgr";
import TranslateLabel from "../../framework/ui/TranslateLabel";

Object.defineProperty(Label.prototype, "setString", {
    value: function (text:string) {
        if (EDITOR) {
            return;
        }
        // let lbComp:TranslateLabel = this.node.getComponent(TranslateLabel);
        // if (lbComp && !lbComp?.isTranslateByCode){
        //     return;
        // }
        // let id = lbComp.translateId;
        this.string = translateMgr.translateData(text);
    },
    configurable: true,
});
