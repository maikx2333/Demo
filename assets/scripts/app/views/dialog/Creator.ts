import { instantiate, Prefab } from "cc";
import { sceneMgr } from "../../../framework/core/SceneMgr";
import { ResourcesLoader } from "../../../framework/data/ResourcesLoader";
import { Message } from "../../../framework/listener/Message";
import { ViewCreatorBase } from "../../../framework/ui/ViewCreatorBase";
import { ViewProtocol } from "../../define/ViewProtocol";
import { viewRegisterMgr } from "../../define/ViewRegisterMgr";

export class DialogCreator extends ViewCreatorBase {

    onInit() {
        this.regMsg(ViewProtocol.DoubleBtnDialog, this.onCreateDoubleBtnDialogView.bind(this))
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
}