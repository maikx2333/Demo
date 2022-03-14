import { instantiate, Prefab } from "cc";
import { sceneMgr } from "../../../framework/core/SceneMgr";
import { ResourcesLoader } from "../../../framework/data/ResourcesLoader";
import { Message } from "../../../framework/listener/Message";
import { ViewCreatorBase } from "../../../framework/ui/ViewCreatorBase";
import { ViewProtocol } from "../../define/ViewProtocol";
import { viewRegisterMgr } from "../../define/ViewRegisterMgr";

export class LoginCreator extends ViewCreatorBase {

    onInit() {
        this.regMsg(ViewProtocol.LoginView, this.onCreateLoginView.bind(this))
    }

    onCreateLoginView(event:Message) {
        //创建登录界面
        let viewInfo = viewRegisterMgr.getViewInfo("login","LoginView");
        let path = viewInfo.Path;
        ResourcesLoader.load(path,(data:Prefab)=>{
            let node = instantiate(data);
            sceneMgr.pushNewTableLayer();
            sceneMgr.replaceTableContent(node,viewInfo.View,data);
        })
    }
}