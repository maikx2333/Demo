import { instantiate, log, Prefab } from "cc";
import { sceneMgr } from "../../../framework/core/SceneMgr";
import { ResourcesLoader } from "../../../framework/data/ResourcesLoader";
import { Message } from "../../../framework/listener/Message";
import { ViewCreatorBase } from "../../../framework/ui/ViewCreatorBase";
import { ViewProtocol } from "../../define/ViewProtocol";
import { viewRegisterMgr } from "../../define/ViewRegisterMgr";
import { NoticeView } from "./NoticeView";

export class LoginCreator extends ViewCreatorBase {

    onInit() {
        this.regMsg(ViewProtocol.LoginLayer, this.onCreateLoginView.bind(this));
        this.regMsg(ViewProtocol.LoginAccountLayer,this.onCreateAccountLayer.bind(this));
        this.regMsg(ViewProtocol.UserAgreementLayer, this.onCreateUserAgreementLayer.bind(this))
        this.regMsg(ViewProtocol.PrivacyPolicyLayer, this.onCreatePrivacyPolicyLayer.bind(this))
        this.regMsg(ViewProtocol.NoticeView, this.onCreateNoticeView.bind(this))
    }

    onCreateLoginView(event:Message) {
        //创建登录界面
        let viewInfo = viewRegisterMgr.getViewInfo("login","LoginLayer");
        ResourcesLoader.loadWithViewInfo(viewInfo,(data:Prefab)=>{
            let node = instantiate(data);
            sceneMgr.replaceMainLayer(node,viewInfo.View);
        })
    }

    onCreateAccountLayer(event:Message) {
        //账号界面
        let viewInfo = viewRegisterMgr.getViewInfo("login","LoginAccountLayer");
        ResourcesLoader.loadWithViewInfo(viewInfo,(data:Prefab)=>{
            let node = instantiate(data);
            sceneMgr.pushNewTableLayer();
            sceneMgr.replaceTableContent(node,viewInfo.View);
        })
    }
    
    onCreateUserAgreementLayer(event:Message) {
        //用户协议
        let viewInfo = viewRegisterMgr.getViewInfo("login","UserAgreementLayer");
        ResourcesLoader.loadWithViewInfo(viewInfo,(data:Prefab)=>{
            let node = instantiate(data);
            sceneMgr.pushNewTableLayer();
            sceneMgr.replaceTableContent(node,viewInfo.View);
        })
    }

    onCreatePrivacyPolicyLayer(event:Message) {
        //隐私政策
        let viewInfo = viewRegisterMgr.getViewInfo("login","PrivacyPolicyLayer");
        ResourcesLoader.loadWithViewInfo(viewInfo,(data:Prefab)=>{
            let node = instantiate(data);
            sceneMgr.pushNewTableLayer();
            sceneMgr.replaceTableContent(node,viewInfo.View);
        })
    }
    
    onCreateNoticeView(event:Message) {
        //隐私政策
        let viewInfo = viewRegisterMgr.getViewInfo("login","NoticeView");
        ResourcesLoader.loadWithViewInfo(viewInfo,(data:Prefab)=>{
            let node = instantiate(data);
            sceneMgr.pushNewTableLayer();
            sceneMgr.replaceTableContent(node,viewInfo.View);
            let msg = event.getRawData();
            let child = node.getChildByName("ScriptNode");
            let comp = child.getComponent("NoticeView") as NoticeView;
            comp.updateView(msg);
        })
    }
}