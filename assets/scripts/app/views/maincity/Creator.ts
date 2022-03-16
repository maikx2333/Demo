import { instantiate, log, Prefab } from "cc";
import { sceneMgr } from "../../../framework/core/SceneMgr";
import { ResourcesLoader } from "../../../framework/data/ResourcesLoader";
import { ViewCreatorBase } from "../../../framework/ui/ViewCreatorBase";
import { ViewProtocol } from "../../define/define";
import { viewRegisterMgr } from "../../define/ViewRegisterMgr";


export class MainCityCreator extends ViewCreatorBase {

    onInit() {
        this.regMsg(ViewProtocol.MainCityLayer, this._onCreateMainCityLayer.bind(this))
    }

    private _onCreateMainCityLayer() {
        let viewInfo = viewRegisterMgr.getViewInfo("maincity","MainCityUI");
        ResourcesLoader.loadWithViewInfo(viewInfo,(data:Prefab)=>{
            let uiNode = instantiate(data);
            this._loadBg((bg:Prefab)=>{
                let bgNode = instantiate(bg);
                sceneMgr.replaceMainLayer(bgNode,viewInfo.System);
                bgNode.addChild(uiNode);
            })
        })
    }

    private _loadBg(callback:(bg:Prefab)=>void) {
        //创建主城界面
        let viewInfo = viewRegisterMgr.getViewInfo("maincity","MainCityLayer");
        ResourcesLoader.loadWithViewInfo(viewInfo,(data:Prefab)=>{
            if (callback){
                callback(data);
            }
        })
    }

}