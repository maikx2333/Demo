import { instantiate, log, Prefab } from "cc";
import { sceneMgr } from "../../../framework/core/SceneMgr";
import { ResourcesLoader } from "../../../framework/data/ResourcesLoader";
import { Message } from "../../../framework/listener/Message";
import { ViewCreatorBase } from "../../../framework/ui/ViewCreatorBase";
import { ViewProtocol } from "../../define/define";
import { viewRegisterMgr } from "../../define/ViewRegisterMgr";


export class MainCityCreator extends ViewCreatorBase {

    onInit() {
        this.regMsg(ViewProtocol.MainCityLayer, this.onCreateMainCityLayer.bind(this))
    }

    onCreateMainCityLayer(event:Message) {
        //创建主城界面
        let viewInfo = viewRegisterMgr.getViewInfo("maincity","MainCityLayer");
        let path = viewInfo.Path;
        ResourcesLoader.load(path,(data:Prefab)=>{
            let node = instantiate(data);
            log("=====>viewInfo",viewInfo)
            sceneMgr.replaceMainLayer(node,viewInfo.View);
        })
    }
}