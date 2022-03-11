import { instantiate, Prefab, UITransform, v3 } from "cc";
import { sceneMgr } from "../../../framework/core/SceneMgr";
import { ResourcesLoader } from "../../../framework/data/ResourcesLoader";
import { Message } from "../../../framework/listener/Message";
import { ViewCreatorBase } from "../../../framework/ui/ViewCreatorBase";
import { ViewProtocol } from "../../define/ViewProtocol";
import { viewRegisterMgr } from "../../define/ViewRegisterMgr";
import { Tips } from "../common/Tips";

export class DialogCreator extends ViewCreatorBase {

    onInit() {
        this.regMsg(ViewProtocol.DoubleBtnDialog, this.onCreateDoubleBtnDialogView.bind(this))
        this.regMsg(ViewProtocol.Tips, this.onCreateTips.bind(this))
    }

    onCreateDoubleBtnDialogView(event:Message) {
        //创建登录界面
        let viewInfo = viewRegisterMgr.getViewInfo("dialog","DoubleBtnDialog");
        let path = viewInfo.Path;
        ResourcesLoader.load(path,(data:Prefab)=>{
            let node = instantiate(data);
            // let com = node.getComponent("DoubleBtnDialog").updateDialog(event.getRawData[0]);
            sceneMgr.pushNewTableLayer();
            sceneMgr.replaceTableContent(node,viewInfo.View);
        })
    }

    onCreateTips(event:Message){
        let str = event.getRawData()
        let tipsLayer = sceneMgr.getTipsLayer()
        let lastTips = tipsLayer.children.length > 0 && tipsLayer.children[tipsLayer.children.length - 1]
        if (lastTips && lastTips.getComponent(Tips).text == str) {
            return
        }

        ResourcesLoader.load("common_ui/prefabs/tips", (data:Prefab)=>{
            // let tipsList = tipsLayer.children
            // for (let index = 0; index < tipsList.length; index++) {
            //     const element = tipsList[index]
            //     if (tipsList.length - index > 5)
            //         element.position.set(0, (tipsList.length - index) * 10 * 45,0)  
            //     else element.position.set(0, (tipsList.length - index) * 45)
            // }

            let tipsNode = instantiate(data)
            tipsNode.getComponent(Tips).text = str
            sceneMgr.getTipsLayer().addChild(tipsNode)
        }, Prefab)
    }
}