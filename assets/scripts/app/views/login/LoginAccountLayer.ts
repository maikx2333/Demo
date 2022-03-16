
import { _decorator, Component, Node, EditBox, log, sys, game, UITransform } from 'cc';
import { gameMgr } from '../../../framework/core/GameMgr';
import { sceneMgr } from '../../../framework/core/SceneMgr';
import { storage } from '../../../framework/core/storage/Storage';
import { httpMgr } from '../../../framework/net/HttpMgr';
import { socketMgr } from '../../../framework/net/SocketMgr';
import { LayerBase } from '../../../framework/ui/LayerBase';
import { G } from '../../common/GlobalFunction';
import { Protocol } from '../../define/define';
import { ViewProtocol } from '../../define/ViewProtocol';
import { ModelLogin } from '../../model/ModelLogin';
const { ccclass, property } = _decorator;

 
@ccclass('LoginAccountLayer')
export class LoginAccountLayer extends LayerBase {

    onLoad(){
        super.onLoad();
    }

    @property(EditBox)
    editAccount:EditBox=null;

    @property(EditBox)
    editPassword:EditBox=null;

    @property(EditBox)
    editDirectLogin:EditBox=null;

    start () {
        let userName = storage.get("LoginUserName");
        if (userName) {
            this.editAccount.string = userName;
        }
        let pwd = storage.get("LoginPassWord");
        if (pwd){
            this.editPassword.string = pwd;
        }
    }

    onEditDirectLoginEnded(editbox, customEventData) {
        //登录串
        // let directLoginKey = this.editDirectLogin.string;
        // gameMgr.getModel(ModelLogin).setDirectLoginKey(directLoginKey);
    }

    onClickRegBtn(){
        G.showMsgTips("暂未开启!");
    }

    onClickLoginBtn(){
        let userName = this.editAccount.string;
        let passWord = this.editPassword.string;

        if (userName == "") {
            G.showMsgTips("账号不能为空!");
            return;
        }
        if (passWord == "") {
            G.showMsgTips("密码不能为空!");
            return;
        }

        this._login(userName, passWord);
    }

    private _login(userName, passWord){
            //@ts-ignore
        // let url = GameConfig.ServerUrl + "/client/login";
        // httpMgr.post(
        //     (msg) => {
        //         log(msg);
        //         if (msg.code == 0) {
        //             log(msg.data);
        //             if (msg.data.result_code == 0) {
                        storage.set("LoginUserName", userName);
                        storage.set("LoginPassWord", passWord);
        //                 let model = gameMgr.getModel(ModelLogin);
                        // model.setLoginData(msg.data);
                        // sceneMgr.removeTableLayer();
                        // sceneMgr.sendCreateView()
                        // GlobalFunction.ShowMsgTips(GetTranslateCode(174));
                        //打点
                        this._checkShowIDVerify(0);//msg.data.user_id);
                    // } else {
                        // GlobalFunction.ShowMsgTips(msg.data.msg);
                    // }
                // }
            // },
            // url,
            // {
                // username: userName,
                // password: passWord,
            // }
        // );
    }

    // 实名认证
    private _checkShowIDVerify(userId: number) {
        // 实名验证开关
        // let sw = storage.get("idcard_verify");
        // if (sw == null || sw == undefined) {
        //     sw = 1;
        // }
        // if (sw == 0) {
        //     this._showNotice();
        //     return;
        // }

        //@ts-ignore
        // let url = GameConfig.ServerUrl + "/client/is_verify?youai_id=" + userId;
        // httpMgr.get((msg) => {
        //     log(msg);
        //     let code = msg.data.code;
        //     if (code == 1) {
        //         // 1提交了没出结果
        //         sceneMgr.sendCreateView(ViewProtocol.IDCardWaitTips, {
        //             callback: () => {
                        // this._showNotice();
                    // },
                // });
            // } else if (code == 2) {
                // "code": -1后台出错 0没记录需要提交 1提交了没出结果 2认证通过(才有下面数据) 3认证不通过
                // "birthday" "1999-01-01'
                // "age": 年龄
                // msg.age = 17;

                // if (msg.data.age < 18) {
                //     let args = {
                //         msg: GetTranslateCode(170),
                //         hideLeftButton: true,
                //         rightBtnName: GetTranslateCode(136),
                //         rightCallback: () => {
                //             sceneMgr.sendCreateView(ViewProtocol.AccountLayer);
                //         },
                //     };
                //     G.ShowDoubleBtnDialog(args);
                // } else {
                    this._showNotice();
                // }
            // } else {
                // sceneMgr.endCreateView(ViewProtocol.IDCardLayer, {
                    // callback: () => {
                        // this._showNotice();
                    // },
                // });
            // }
        // }, url);
    }

    private _showNotice() {
        sceneMgr.popTableLayer();
        G.showNotice();
    }
}
