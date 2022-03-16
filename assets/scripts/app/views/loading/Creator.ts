import { instantiate, Prefab } from "cc";
import { sceneMgr } from "../../../framework/core/SceneMgr";
import { ResourcesLoader } from "../../../framework/data/ResourcesLoader";
import { Message } from "../../../framework/listener/Message";
import { ViewCreatorBase } from "../../../framework/ui/ViewCreatorBase";
import { ViewProtocol } from "../../define/ViewProtocol";
import { viewRegisterMgr } from "../../define/ViewRegisterMgr";

export class LoadingCreator extends ViewCreatorBase {

    onInit() {
        this.regMsg(ViewProtocol.ResLoadingLayer, this.onCreateResLoadingLayer.bind(this))
        this.regMsg(ViewProtocol.TransLoadingLayer,this.onCreateTransLoadingLayer.bind(this))
    }

    onCreateResLoadingLayer(event:Message) {
        let viewInfo = viewRegisterMgr.getViewInfo("loading","ResLoadingLayer");
        ResourcesLoader.loadWithViewInfo(viewInfo,(data:Prefab)=>{
            let node = instantiate(data);
            sceneMgr.pushNewTableLayer();
            sceneMgr.replaceTableContent(node,viewInfo.View);
        })
    }

    onCreateTransLoadingLayer(event:Message){
        let viewInfo = viewRegisterMgr.getViewInfo("loading","TransLoadingLayer");
        ResourcesLoader.loadWithViewInfo(viewInfo,(data:Prefab)=>{
            let node = instantiate(data);
            sceneMgr.pushNewTableLayer();
            sceneMgr.replaceTableContent(node,viewInfo.View);
        })
    }
}