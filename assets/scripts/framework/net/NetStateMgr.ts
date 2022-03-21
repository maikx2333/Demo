/*
 * @Author: liuguoqing
 * @Date: 2022-03-02 15:55:24
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-03 15:35:05
 * @Description: file content
 */


import { G } from "../../app/common/GlobalFunction";
import { DoubleBtnDialogArgsType } from "../../app/define/ConfigType";
import { Protocol } from "../../app/define/define";
import { ModelLogin } from "../../app/model/model";
import { GameConfig } from "../../GameConfig";
import { Singleton } from "../components/Singleton";
import { gameMgr } from "../core/GameMgr";
import { msgEventMgr } from "../listener/EventMgr";
import { socketMgr } from "./SocketMgr";

class NetStateMgr extends Singleton{
    private _reconnect;
    private _request_server_info_time: number = null;
    private _status: any;
    
    // 构造函数;
    private constructor() {
        super()
        msgEventMgr.addEventListener(
            Protocol.Login.identify,
            this.loginCheck.bind(this)
        );
        msgEventMgr.addEventListener(
            Protocol.Login.login,
            this.loginHandler.bind(this)
        );

        gameMgr.addSlowTick(this.slowTickHandler.bind(this));
    }

    loginCheck(data: any) {
        let resultCode = data.code;
        if (resultCode == 0) {
            let model = G.getModel(ModelLogin);
            if (model && model.getEnterGame()) {
                socketMgr.send(Protocol.Login.login);
            }
        }
    }

    loginHandler(data: any) {
        let resultCode = data.code;
        if (resultCode == 0) {
            let model = G.getModel(ModelLogin);
            if (model && model.getEnterGame()) {
                socketMgr.sendInnerMsg(Protocol.Inner.ReloginSuccess);
            }
        }
    }

    onSocketChange(event) {
        if (event.type == "close") {
            if (event.code == 4888) {
                return;
            }
            let msg = event.reason;
            if (msg == "") {
                msg = "与战车失去联系，请指挥官检查网络再尝试。";
            }
            this.netWorkError(msg);
            socketMgr.sendInnerMsg(Protocol.Inner.FightPause);
        } else if (event.type == "open") {
            if (this._reconnect) {
                this.relogin();
                socketMgr.sendInnerMsg(Protocol.Inner.FightResume);
            }
        }
        this._status = event.type;
    }

    // 返回登录界面
    redirectLoginView() {
        gameMgr.reRun();
    }

    // 重新链接
    socketReconnect() {
        this._reconnect = true;
        socketMgr.reConnect();
    }

    relogin() {
        let model = G.getModel(ModelLogin);
        if (model && !model.getEnterGame()) {
            return;
        }
        let loginData = model.getLoginData();

        let deviceInfo = gameMgr.getDeviceInfo();
        socketMgr.send(Protocol.Login.identify, {
            user_id: loginData.user_id,
            user_key: loginData.user_key,
            channel_key: GameConfig,
            device_id: deviceInfo.IMEI,
        });
    }

    netWorkError(msg?: string) {
        if (msg == "" || msg == undefined) {
            msg = "与战车失去联系，请指挥官检查网络再尝试。";
        }
        let args:DoubleBtnDialogArgsType = {
            msg: msg,
            leftBtnName: "",
            rightBtnName: "确定",
            leftCallback: () => {
                // this.redirectLoginView();
            },
            rightCallback: () => {
                // this.socketReconnect();
                this.redirectLoginView();
            },
            hideLeftButton: true,
        };

        G.showDoubleBtnDialog(args);
    }

    // 请求更新更新服务器时间
    requestServerInfo() {
        if (this._status != "open") {
            return;
        }
        let model = G.getModel(ModelLogin);
        if (model && !model.getEnterGame()) {
            return;
        }

        this._request_server_info_time = this._request_server_info_time || new Date().getTime();
        let now = new Date().getTime();

        let spaceTime = Math.abs(now - this._request_server_info_time);

        // -- 20s同步一次
        if (spaceTime < 20000) {
            return;
        }
        this._request_server_info_time = now;
        socketMgr.send(Protocol.Server.game_info);
    }

    slowTickHandler(dt: number) {
        this.requestServerInfo();
    }

    clear() {
        netStateMgr = null;
    }
}

// ()();
export let netStateMgr = (()=>{
    return NetStateMgr.getInstance<NetStateMgr>();
})();
