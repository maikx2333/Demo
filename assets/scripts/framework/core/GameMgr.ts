import { Camera, director, Game, game, ISchedulable, Scheduler, sys } from "cc";
import { DeviceInfoType } from "../../app/define/ConfigType";
import { EnterApp } from "../../app/EnterApp";
import { Message, modelEventMgr, msgEventMgr, netStateMgr, Singleton, socketMgr } from "../yy";

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
    private _deviceInfo: {
        DeviceModel: string;
        IMEI: string;
        NetWork: string;
        SystemVer: string;
    };

    private _curTimeoutID: any; //进入后台时间计时器ID

    // 构造函数
    constructor() {
        super();

        this._cameraMap = new Map();
        this._modelMapName = new Map();

        this._slowTickList = [];
        this._fastTickList = [];
        this._innerMessageQueue = [];
        this._serverMessageQueue = [];

        let s = director.getScheduler();
        Scheduler.enableForTarget(this);
        s.schedule(
            (dt) => {
                this.fastTick(dt);
            },
            this,
            0
        );

        s.schedule(
            (dt) => {
                this.slowTick(dt);
            },
            this,
            1
        );

        let socketParams = {
            StateChangeCallback: this.listenOnSocketState.bind(this),
        };
        socketMgr.registerCallbackHandler(socketParams);

        game.on(Game.EVENT_SHOW, this.enterForeground.bind(this), this);
        game.on(Game.EVENT_HIDE, this.enterBackground.bind(this), this);
    }

    setApp(app: EnterApp) {
        this._app = app;
    }

    // 慢tick
    private slowTick(dt) {
        this._slowTickList.forEach((hdl) => {
            hdl(dt);
        });
    }

    // 快tick
    private fastTick(dt) {
        // handler inner msg
        let innerlenght = this._innerMessageQueue.length;
        while (innerlenght > 0) {
            let msgEvent = this._innerMessageQueue.shift();
            this.dispatchMsgEvent(msgEvent);
            innerlenght = this._innerMessageQueue.length;
        }

        // handler server msg
        let serverlenght = this._serverMessageQueue.length;
        while (serverlenght > 0) {
            let msgEvent = this._serverMessageQueue.shift();
            this.dispatchMsgEvent(msgEvent);
            serverlenght = this._serverMessageQueue.length;
        }

        this._fastTickList.forEach((hdl) => {
            hdl(dt);
        });
    }

    public addNetMessage(msg: Message) {
        this._serverMessageQueue.push(msg);
    }

    public addInnerMessage(msg: Message) {
        this._innerMessageQueue.push(msg);
    }

    private dispatchMsgEvent(msg: Message) {
        // model msg
        modelEventMgr.dispatchEvent(msg);
        // view msg
        msgEventMgr.dispatchEvent(msg);
        // redGuide msg
        // SFRedGuideMgr.dispatchEvent(msg);
    }

    /**
     * 把消息id绑定指定的model
     */
    public registerModel(
        model: ModelBase,
        modelName: string
        // protocolIdList: number[]
    ) {
        this._modelMapName.set(modelName, model);
    }

    /**
     * 获取model
     */
    public getModel(modelName: string): ModelBase {
        return this._modelMapName.get(modelName);
    }

    /**
     * 获取RawData
     */
    public getDataRaw(rawName: string, key: string) {
        return DataRawMgr.getInstance().getData(rawName, key);
    }

    /**
     * 获取摄像机
     */
    public setCamera(key: string, camera: cc.Camera) {
        this._cameraMap.set(key, camera);
    }

    /**
     * 获取摄像机
     */
    public getCamera(key: string) {
        return this._cameraMap.get(key);
    }

    /**
     * 监听Socket 状态变化
     */
    public listenOnSocketState(event) {
        netStateMgr.onSocketChange(event);
    }

    public reRun() {
        log("GameMgr reRunRun0");
        SceneMgr.getInstance().removeAllTableLayer();
        SceneMgr.getInstance().setSystemOpenLayer(null);
        SceneMgr.getInstance().setNewGuideLayer(null);
        if (this._app) {
            log("GameMgr reRunRun1");
            this._app.reRun();
        } else {
            log("GameMgr reRunRun2");
            director.loadScene("HotUpdate");
        }
    }

    getDeviceInfo( refresh: false): DeviceInfoType {
        if (this._deviceInfo && refresh == false) {
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
                infoStr = jsb.reflection.callStaticMethod("MyOcHelper", "get_device_info");
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

    enterForeground() {
        console.log("游戏进入前台");
        NotifyHelper.getInstance().gameEnterForeground();
        if (this._curTimeoutID) {
            clearTimeout(this._curTimeoutID);
        }
    }

    enterBackground() {
        console.log("游戏进入后台");
        NotifyHelper.getInstance().gameEnterBackground();
        //5分钟后埋点登出
        this._curTimeoutID = setTimeout(() => {
            if (window["SDKHelper"]) {
                window["SDKHelper"].trackLogoutEvent();
            }
        }, 3000);
    }

    addSlowTick(func: tickFunc) {
        this._slowTickList.push(func);
    }
}

// ()();
export let gameMgr = (()=>{
    return GameMgr.getInstance<GameMgr>();
})();