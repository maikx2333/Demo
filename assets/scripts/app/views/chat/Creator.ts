import { instantiate, Prefab } from "cc";
import { sceneMgr } from "../../../framework/core/SceneMgr";
import { ResourcesLoader } from "../../../framework/data/ResourcesLoader";
import { ViewCreatorBase } from "../../../framework/ui/ViewCreatorBase";
import { ViewProtocol } from "../../define/ViewProtocol";
import { viewRegisterMgr } from "../../define/ViewRegisterMgr";

export default class ChatCreator extends ViewCreatorBase {
    //重写
    onInit():void{
        this.regMsg(ViewProtocol.ChatLayer, this.onCreateChatLayer.bind(this))
    };

    onCreateChatLayer(){
        let viewInfo = viewRegisterMgr.getViewInfo("chat", "ChatLayer")
        ResourcesLoader.loadWithViewInfo(viewInfo, (pre:Prefab)=>{
            let node = instantiate(pre)
            sceneMgr.pushNewTableLayer()
            sceneMgr.replaceTableContent(node, viewInfo.View)
        })
    }
}