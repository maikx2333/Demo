
import { _decorator, Component, Node, Label, Prefab, instantiate, log, EventTouch, AnimationClip, Animation } from 'cc';
import { gameMgr } from '../../../framework/core/GameMgr';
import { sceneMgr } from '../../../framework/core/SceneMgr';
import { storage } from '../../../framework/core/storage/Storage';
import { ResourcesLoader } from '../../../framework/data/ResourcesLoader';
import { httpMgr } from '../../../framework/net/HttpMgr';
import { socketMgr } from '../../../framework/net/SocketMgr';
import { LayerBase } from '../../../framework/ui/LayerBase';
import { G } from '../../common/GlobalFunction';
import { Protocol } from '../../define/Protocol';
import { ViewProtocol } from '../../define/ViewProtocol';
import { ModelLogin } from '../../model/model';

const { ccclass, property } = _decorator;
 
@ccclass('LoginLayer')
export class LoginLayer extends LayerBase {

    @property(Label)
    serverName: Label = null;

    @property(Label)
    versionLbl: Label = null;

    private _rootNode = null;

    start(){
        // super.onLoad();
        this._rootNode = this.node.parent;
        // set version
        if (this.versionLbl) {
            // FileHelper.load("Txt/showVer", (data) => {
            //     cc.log("showVer txt:", data.text);
            //     let showVer = data.text || "1.0";
            //     let realVer = GameConfig.realVer || "0.0";
            //     this.versionLbl.string = "ver " + showVer.toString() + "." + realVer.toString();
            // });
        }

        this.addMsgListener(Protocol.Login.identify,this._onIdentifyHandler.bind(this));
        this.addMsgListener(Protocol.Login.login,this._onLoginHandler.bind(this));
        this.addMsgListener(Protocol.Inner.SelectServer,this._onSelectServerHandler.bind(this));
        this.addMsgListener(Protocol.Inner.CloseNoticeView,this.playShowEnterBtnAnimate.bind(this)); 
        // 新手引导层
        this._addNewGuideLayer(() => {
            this._serverInfoRequest();
        });
    }

    private _onIdentifyHandler(data:any) {
        // let model = gameMgr.getModel(ModelLogin);
        // let serverData = model.getSelectServerData();
        // let param: any = {};
        // let serverInfo: any = {};
        // serverInfo.address = serverData.address;
        // serverInfo.port = serverData.port;
        // serverInfo.id = serverData.id;
        // param.serverInfo = serverInfo;
        // socketMgr.send(Protocol.Login.login);
    }

    private _onLoginHandler(data:any) {
        // if (data.code == 0) {
            this._enterGame();
        // } else if (data.code == 1) {
            // SocketMgr.getInstance().send(Protocol.Login.creator);
        // }
    }

    private _onSelectServerHandler(data:any) {
        // let model = gameMgr.getModel(ModelLogin);
        // let serverData = model.getSelectServerData();
        // this.serverName.string = serverData.name;
        // storage.set("SelectServerData",serverData)
    }

    private _addNewGuideLayer(cb: Function) {
        // ResourcesLoader.load("prefab/xinshou_ui/xinshou_mai_ui", (prefab: Prefab) => {
        //     let layer = instantiate(prefab);
        //     sceneMgr.setNewGuideLayer(layer);
            cb();
        // });
    }

    private _serverInfoRequest() {
        // httpMgr.get((msg) => {
            // if (msg.code == 0) {
            //     let data = msg.data;
            //     let serverList = data.sg[0].sl;

            //     if (!serverList || serverList.length == 0) {
            //         GlobalFunction.ShowMsgTips(GetTranslateCode(175));
            //         return;
            //     }
        
                // let model = gameMgr.getModel(ModelServerInfo);
                // model.setSeverList(serverList);

                this._openLoginAccount();
            // } else {
            //     GlobalFunction.ShowMsgTips(GetTranslateCode(176));
            // }
        // }, GameConfig.ServerListUrl + "/static/server/" + GameConfig.QDKey + ".json");
    }

    private _openLoginAccount() {
        sceneMgr.sendCreateView(ViewProtocol.LoginAccountLayer);
    }

    private _connectServer() {
            let model = gameMgr.getModel(ModelLogin);
            let loginData = model.getLoginData();
    
            // GET service + /client/which_server?user_id=xxx&channel_key=xxxxx&version=yyyy
            // user_id 账号唯一标识 内网包是上面接口的user_id sdk包是sdk唯一用户id
            // channel_key 渠道key
            // version 客户端版本
            // let realVer = GameConfig.realVer || "0.0";
            // let channelKey = GameConfig.QDKey;
            // let url =
            //     GameConfig.ServerUrl +
            //     "/client/which_server?user_id=" +
            //     loginData.user_id +
            //     "&channel_key=" +
            //     channelKey +
            //     "&version=" +
            //     realVer;
            // httpMgr.get((msg) => {
            //     if (msg.code == 0) {
            //         if (msg.data.result_code == 0) {
            //             let serverId = msg.data.server_id;
            //             let modelServer = gameMgr.getModel(ModelServerInfo);
            //             let serverData = modelServer.getServerInfoById(serverId);
            //             model.setSelectServerData(serverData);
    
            //             socketMgr.connect(
            //                 serverData.address,
            //                 serverData.port,
            //                 (event) => {
            //                     //打点
            //                     let param: any = {};
            //                     let serverInfo: any = {};
            //                     serverInfo.address = serverData.address;
            //                     serverInfo.port = serverData.port;
            //                     serverInfo.id = serverData.id;
            //                     param.serverInfo = serverInfo;
                                this._loginServer();
            //                 },
            //                 (event) => {
            //                     log(event);
            //                 }
            //             );
            //         } else {
            //             G.showMsgTips(GetTranslateCode(178));
            //         }
            //     }
            // }, url);
        }

    private _loginServer() {
        // let model = gameMgr.getModel(ModelLogin);
        // let loginData = model.getLoginData();

        // let deviceInfo = gameMgr.getDeviceInfo();
        // socketMgr.send(Protocol.Login.identify, {
        //     user_id: loginData.user_id,
        //     user_key: loginData.user_key,
        //     channel_key: GameConfig.QDKey,
        //     device_id: deviceInfo.IMEI,
        // });


        // 单机模式直接进入游戏
        this._enterGame();
    }

    private _enterGame() {
        //打点
           // logDot(DotIDS.loginGameSuccess);
           sceneMgr.sendCreateView(ViewProtocol.ResLoadingLayer);
           // 功能开启监听层
           // sceneMgr.sendCreateView(ViewProtocol.SystemOpenLayer);
           // model.setEnterGame(true);
           // NotifyHelper.getInstance().startNotify();
    }

    // 点击进入游戏
    onClickEnterGameBtn(event:EventTouch,customEventData:string){
        this._enterGame();
    }

    // 点击打开服务器列表
    onClickServerListBtn(event:EventTouch,customEventData:string){
        G.showMsgTips("系统未开发");
    }

    playShowEnterBtnAnimate(){
        let com = this._rootNode.getComponent(Animation);
        com.play();
    }
}
