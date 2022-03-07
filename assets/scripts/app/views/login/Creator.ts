import { viewEventMgr } from "../../../framework/yy";
import { Protocol } from "../../define/Protocol";

export default class LoginCreator implements ViewCreatorBase {
    onInit() {
        viewEventMgr.addEventListener(Protocol.View.LoginView, this.onCreateLoginView)
    }

    onCreateLoginView() {
        //创建登录界面

        
    }
}