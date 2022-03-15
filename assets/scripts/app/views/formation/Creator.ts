import { instantiate, Prefab } from "cc";
import { sceneMgr } from "../../../framework/core/SceneMgr";
import { ResourcesLoader } from "../../../framework/data/ResourcesLoader";
import { Message } from "../../../framework/listener/Message";
import { ViewCreatorBase } from "../../../framework/ui/ViewCreatorBase";
import { ViewProtocol } from "../../define/ViewProtocol";
import { viewRegisterMgr } from "../../define/ViewRegisterMgr";

export class FormationCreator extends ViewCreatorBase {

    onInit() {
        this.regMsg(ViewProtocol.FormationView, this.onCreateFormationView.bind(this))
    }

    onCreateFormationView(event:Message) {
        let viewInfo = viewRegisterMgr.getViewInfo("formation","FormationView");
        ResourcesLoader.loadWithViewInfo(viewInfo,(data:Prefab)=>{
            let node = instantiate(data);
            sceneMgr.pushNewTableLayer();
            sceneMgr.replaceTableContent(node,viewInfo.View);
        })
    }
}