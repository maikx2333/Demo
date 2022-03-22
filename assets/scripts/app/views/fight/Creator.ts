/*
 * @Author: liuguoqing
 * @Date: 2022-03-19 11:17:19
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-20 23:18:12
 * @Description: file content
 */
import { instantiate, JsonAsset, log, Prefab } from "cc";
import { sceneMgr } from "../../../framework/core/SceneMgr";
import { ResourcesLoader } from "../../../framework/data/ResourcesLoader";
import { Message } from "../../../framework/listener/Message";
import { ViewCreatorBase } from "../../../framework/ui/ViewCreatorBase";
import { ViewProtocol } from "../../define/define";
import { viewRegisterMgr } from "../../define/ViewRegisterMgr";
import { FightMainLayer } from "./FightMainLayer";


export class FightCreator extends ViewCreatorBase {

    onInit() {
        this.regMsg(ViewProtocol.FightMainLayer, this._onCreateFightMainLayer.bind(this))
        this.regMsg(ViewProtocol.FightFormation, this.onCreateFormationView.bind(this))
    }

    private _onCreateFightMainLayer(event:Message) {
        let viewInfo = viewRegisterMgr.getViewInfo("fight","FightMainLayer");
        ResourcesLoader.loadWithViewInfo(viewInfo,(data:Prefab)=>{
            let bgNode = instantiate(data);
            sceneMgr.pushNewTableLayer();
            sceneMgr.replaceTableContent(bgNode,viewInfo.View);
            let com = bgNode.getComponentInChildren(FightMainLayer);
            ResourcesLoader.load("fight/datas/report",(json:JsonAsset)=>{
                com.init(json);
            });
        })
    }

    private onCreateFormationView(event:Message) {
        let viewInfo = viewRegisterMgr.getViewInfo("fight","FightFormation");
        ResourcesLoader.loadWithViewInfo(viewInfo,(data:Prefab)=>{
            let node = instantiate(data);
            sceneMgr.pushNewTableLayer();
            sceneMgr.replaceTableContent(node,viewInfo.View);
        })
    }

}