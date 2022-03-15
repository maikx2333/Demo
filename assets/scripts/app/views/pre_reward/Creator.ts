import { instantiate, log, Prefab } from "cc";
import { sceneMgr } from "../../../framework/core/SceneMgr";
import { ResourcesLoader } from "../../../framework/data/ResourcesLoader";
import { Message } from "../../../framework/listener/Message";
import { ViewCreatorBase } from "../../../framework/ui/ViewCreatorBase";
import { ViewProtocol } from "../../define/ViewProtocol";
import { viewRegisterMgr } from "../../define/ViewRegisterMgr";

export class PreRewardCreator extends ViewCreatorBase {

    onInit() {
        log("PreRewardCreator === ")
        this.regMsg(ViewProtocol.PreviewReward, this.onCreate.bind(this))
    }

    onCreate(event:Message) {
        log("onCreate PreRewardCreator=== ")

        let viewInfo = viewRegisterMgr.getViewInfo("preReward","preRewardMain");
        let path = viewInfo.Path;
        ResourcesLoader.loadWithViewInfo(viewInfo,(data:Prefab)=>{
            let node = instantiate(data);
            sceneMgr.pushNewTableLayer();
            sceneMgr.replaceTableContent(node,viewInfo.View);
        })
    }
}