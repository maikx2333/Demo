import { instantiate, log, Prefab } from "cc";
import { sceneMgr } from "../../../framework/core/SceneMgr";
import { ResourcesLoader } from "../../../framework/data/ResourcesLoader";
import { Message } from "../../../framework/listener/Message";
import { ViewCreatorBase } from "../../../framework/ui/ViewCreatorBase";
import { ViewProtocol } from "../../define/define";
import { viewRegisterMgr } from "../../define/ViewRegisterMgr";


export class FightCreator extends ViewCreatorBase {

    onInit() {
        this.regMsg(ViewProtocol.FightMainLayer, this._onCreateFightMainLayer.bind(this))
        this.regMsg(ViewProtocol.FightFormation, this.onCreateFormationView.bind(this))
    }

    private _onCreateFightMainLayer(event:Message) {
        let viewInfo = viewRegisterMgr.getViewInfo("fight","FightMainUI");
        let path = viewInfo.Path;
        ResourcesLoader.load(path,(data:Prefab)=>{
            let uiNode = instantiate(data);
            this._loadBg((bg:Prefab)=>{
                let bgNode = instantiate(bg);
                sceneMgr.pushNewTableLayer();
                sceneMgr.replaceTableContent(bgNode,viewInfo.View);
                bgNode.addChild(uiNode);
            })
        })
    }

    private _loadBg(callback:(bg:Prefab)=>void) {
        //创建主城界面
        let viewInfo = viewRegisterMgr.getViewInfo("fight","FightMainLayer");
        let path = viewInfo.Path;
        ResourcesLoader.load(path,(data:Prefab)=>{
            if (callback){
                callback(data);
            }
        })
    }

    private onCreateFormationView(event:Message) {
        let viewInfo = viewRegisterMgr.getViewInfo("fight","FightFormation");
        let path = viewInfo.Path;
        ResourcesLoader.load(path,(data:Prefab)=>{
            let node = instantiate(data);
            sceneMgr.pushNewTableLayer();
            sceneMgr.replaceTableContent(node,viewInfo.View);
        })
    }

}