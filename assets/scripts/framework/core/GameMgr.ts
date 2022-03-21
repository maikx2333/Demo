import { Camera, director, Game, game, ISchedulable, log, Scheduler, sys } from "cc";
import { DeviceInfoType } from "../../app/define/ConfigType";
import { yy } from "../../app/define/YYNamespace";
import { EnterApp } from "../../app/EnterApp";
import { Singleton } from "../components/Singleton";
import { ModelBase } from "../data/ModelBase";
import { modelEventMgr, msgEventMgr } from "../listener/EventMgr";
import { Message } from "../listener/Message";
import { sceneMgr } from "./SceneMgr";

/*
 * @Author: liuguoqing
 * @Date: 2022-03-02 17:58:23
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-03 15:34:23
 * @Description: file content
 */
type tickFunc = (hdl: number) => void;

export class GameMgr extends Singleton implements ISchedulable {
    // ISchedulable
    id?: string;
    uuid?: string;
    private _modelMapName: Map<string, any>;

    private _slowTickList: Array<tickFunc>;
    private _fastTickList: Array<tickFunc>;

    private _cameraMap: Map<string, Camera>;

    private _serverMessageQueue: Array<Message>; // 服务端消息队列
    private _innerMessageQueue: Array<Message>; // 内部消息队列

    private _app: EnterApp;
    private _deviceInfo:DeviceInfoType;

    //进入后台时间计时器ID
    private _curTimeoutID: any; 

    // 构造函数
    private constructor() {
        super();
        // camera
        this._cameraMap = new Map();

        // model
        this._modelMapName = new Map();

        // event tick
        this._slowTickList = [];
        this._fastTickList = [];

        // message queue
        this._innerMessageQueue = [];
        this._serverMessageQueue = [];

        // scheduler
        let s = director.getScheduler();
        Scheduler.enableForTarget(this);

        // slow tick
        s.schedule((dt) => {
                this._slowTick(dt);
            },
        this,1);

        // quick tick
        s.schedule((dt) => {
            this._fastTick(dt);
        },
        this,0);

        // game on foreground
        game.on(Game.EVENT_SHOW, this._enterForeground.bind(this), this);

        // game on background
        game.on(Game.EVENT_HIDE, this._enterBackground.bind(this), this);
    }

    public setApp(app: EnterApp) {
        this._app = app;
    }

    public addNetMessage(msg: Message) {
        this._serverMessageQueue.push(msg);
    }

    public addInnerMessage(msg: Message) {
        this._innerMessageQueue.push(msg);
    }

    public addSlowTick(func: tickFunc) {
        this._slowTickList.push(func);
    }

    /**
     * 把消息id绑定指定的model
     */
    public registerModel<T extends ModelBase>( modelConstructor: yy.types.CommonConstructor<T>)
    {
        this._modelMapName.set(modelConstructor.name, new modelConstructor());
    }

    /**
     * 获取model
     */
    public getModel<T extends ModelBase>(modelConstructor: yy.types.CommonConstructor<T>): T {
        return this._modelMapName.get(modelConstructor.name);
    }

    /**
     * 获取摄像机
     */
    public setCamera(key: string, camera: Camera) {
        this._cameraMap.set(key, camera);
    }

    /**
     * 获取摄像机
     */
    public getCamera(key: string) {
        return this._cameraMap.get(key);
    }

    public reRun() {
        log("GameMgr reRunRun0");
        sceneMgr.removeAllTableLayer();
        sceneMgr.setSystemOpenLayer(null);
        sceneMgr.setNewGuideLayer(null);
        if (this._app) {
            log("GameMgr reRunRun1");
            this._app.reRun();
        } else {
            log("GameMgr reRunRun2");
            director.loadScene("HotUpdate");
        }
    }

    public getDeviceInfo( refresh?:boolean): DeviceInfoType {
        if (this._deviceInfo && !refresh) {
            return this._deviceInfo;
        }
        let info = {
            DeviceModel: "",
            IMEI: "",
            NetWork: "",
            SystemVer: "",
        };
        let infoStr: string;
        if (sys.isNative) {
            if (sys.os == sys.OS.IOS) {
                // infoStr = jsb.reflection.callStaticMethod("MyOcHelper", "get_device_info");
            } else if (sys.os == sys.OS.ANDROID) {
                // todo
                infoStr = jsb.reflection.callStaticMethod(
                    "com/youai/lib/Helper",
                    "getDeviceInfo",
                    "()Ljava/lang/String;"
                );
            }
        }
        if (infoStr) {
            let keys = ["DeviceModel", "IMEI", "NetWork", "SystemVer"];
            let infoArray = infoStr.split("|");
            if (infoArray) {
                for (let index = 0; index < infoArray.length; index++) {
                    const element = infoArray[index];
                    info[keys[index]] = element;
                }
            }
        }
        this._deviceInfo = info;
        return info;
    }

    private _enterForeground() {
        console.log("游戏进入前台");
        // NotifyHelper.getInstance().gameEnterForeground();
        if (this._curTimeoutID) {
            clearTimeout(this._curTimeoutID);
        }
    }

    private _enterBackground() {
        console.log("游戏进入后台");
        // NotifyHelper.getInstance().gameEnterBackground();
        //5分钟后埋点登出
        this._curTimeoutID = setTimeout(() => {
            if (window["SDKHelper"]) {
                window["SDKHelper"].trackLogoutEvent();
            }
        }, 3000);
    }

    // 慢tick
    private _slowTick(dt) {
        this._slowTickList.forEach((hdl) => {
            hdl(dt);
        });
    }

    // 快tick
    private _fastTick(dt) {
        // handler inner msg
        let innerlenght = this._innerMessageQueue.length;
        while (innerlenght > 0) {
            let msgEvent = this._innerMessageQueue.shift();
            this._dispatchMsgEvent(msgEvent);
            innerlenght = this._innerMessageQueue.length;
        }

        // handler server msg
        let serverlenght = this._serverMessageQueue.length;
        while (serverlenght > 0) {
            let msgEvent = this._serverMessageQueue.shift();
            this._dispatchMsgEvent(msgEvent);
            serverlenght = this._serverMessageQueue.length;
        }

        this._fastTickList.forEach((hdl) => {
            hdl(dt);
        });
    }


    private _dispatchMsgEvent(msg: Message) {
        // model msg
        modelEventMgr.dispatchEvent(msg);
        // view msg
        msgEventMgr.dispatchEvent(msg);
        // redGuide msg
        // SFRedGuideMgr.dispatchEvent(msg);
    }

    clear(){
        gameMgr = null;
    }
}

// ()();
export let gameMgr = (()=>{
    return GameMgr.getInstance<GameMgr>();
})();