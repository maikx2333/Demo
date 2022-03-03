/*
 * @Author: liuguoqing
 * @Date: 2022-03-02 15:55:24
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-02 17:02:02
 * @Description: file content
 */


import { Protocol } from "../../app/define/protocol";
import { Singleton } from "../yy";

class NetStateMgr extends Singleton {
    private _reconnect;
    private _request_server_info_time: number = null;
    private _status: any;
    // 构造函数;
    constructor() {
        super();
        MsgEventMgr.getInstance().addEventListener(
            Protocol.Login.identify,
            this.loginCheck.bind(this)
        );
        MsgEventMgr.getInstance().addEventListener(
            Protocol.Login.login,
            this.loginHandler.bind(this)
        );

        GameMgr.getInstance().addSlowTick(this.slowTickHandler.bind(this));
    }

    loginCheck(data: any) {
        let resultCode = data.code;
        if (resultCode == 0) {
            let model = GameMgr.getInstance().getModel("ModelLogin");
            if (model && model.getEnterGame()) {
                SocketMgr.getInstance().send(Protocol.Login.login);
            }
        }
    }

    loginHandler(data: any) {
        let resultCode = data.code;
        if (resultCode == 0) {
            let model = GameMgr.getInstance().getModel("ModelLogin");
            if (model && model.getEnterGame()) {
                SocketMgr.getInstance().sendInnerMsg(Protocol.Inner.ReloginSuccess);
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
            SocketMgr.getInstance().sendInnerMsg(Protocol.Inner.FightPause);
        } else if (event.type == "open") {
            if (this._reconnect) {
                this.relogin();
                SocketMgr.getInstance().sendInnerMsg(Protocol.Inner.FightResume);
            }
        }
        this._status = event.type;
    }

    // 返回登录界面
    redirectLoginView() {
        GameMgr.getInstance().reRun();
    }

    // 重新链接
    socketReconnect() {
        this._reconnect = true;
        SocketMgr.getInstance().reConnect();
    }

    relogin() {
        let model = GameMgr.getInstance().getModel("ModelLogin");
        if (model && !model.getEnterGame()) {
            return;
        }
        let loginData = model.getLoginData();

        let deviceInfo = GameMgr.getInstance().getDeviceInfo();
        SocketMgr.getInstance().send(Protocol.Login.identify, {
            user_id: loginData.user_id,
            user_key: loginData.user_key,
            channel_key: GameConfig.QDKey,
            device_id: deviceInfo.IMEI,
        });
    }

    netWorkError(msg?: string) {
        if (msg == "" || msg == undefined) {
            msg = "与战车失去联系，请指挥官检查网络再尝试。";
        }
        let args = {
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

        GlobalFunction.ShowDoubleBtnDialog(args);
    }

    // 请求更新更新服务器时间
    requestServerInfo() {
        if (this._status != "open") {
            return;
        }
        let model = GameMgr.getInstance().getModel("ModelLogin");
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
        SocketMgr.getInstance().send(Protocol.Server.game_info);
    }

    slowTickHandler(dt: number) {
        this.requestServerInfo();
    }
}

// ()();
export let netStateMgr = (()=>{
    return NetStateMgr.getInstance<NetStateMgr>();
})();
