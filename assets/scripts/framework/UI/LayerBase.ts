/*
 * @Author: liuguoqing
 * @Date: 2022-03-04 23:09:26
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-05 15:08:57
 * @Description: file content
 */
import { _decorator, Node } from "cc";
import { ComponentBase } from "./ComponentBase";
const { ccclass, property } = _decorator;


type callbackFunc = (data: any) => void | string | boolean;

@ccclass('LayerBase')
export class LayerBase extends ComponentBase {
    // private _eventMsgListeners: Map<string, number>;

    constructor() {
        super();
        // this._eventMsgListeners = new Map();
    }

    start() {}

    /**
     * 在组件加载的时候调用addMsgListener来监听消息
     */
    onLoad() {
        // 防止点击穿透
        this.setSwallTouches(true);
    }

    onEnable() {}

    onDisable() {}

    /**d
     * 记得如果需要要重写此方法 注意必须调用super.onDestroy(),
     * 组件删除前会自动删除所有消息监听
     */
    onDestroy() {
        // this.removeAllMsgListener();
        // this.onReleaseRes();
    }

    onReleaseRes() {
        // cc.sys.garbageCollect();
    }

    // 是否吞没点击
    setSwallTouches(flag: boolean) {
        this.node.on(
            Node.EventType.TOUCH_START,
            (touch) => {
                return true;
            },
            this
        );
        this.node["_touchListener"].swallowTouches = flag;
    }

    // /**
    //  * 添加网络消息监听
    //  */
    // addMsgListener(msgId: number, listener: callbackFunc) {
    //     let handle = MsgEventMgr.getInstance().addEventListener(msgId, listener);
    //     if (this._eventMsgListeners.get(handle) != null) return;

    //     this._eventMsgListeners.set(handle, msgId);
    // }

    // /**
    //  * 移除对这个消息的监听
    //  * 某些情况node里面需要动态加减某个消息监听
    //  */
    // removeMsgListener(msgId: number) {
    //     this._eventMsgListeners.forEach((value, key) => {
    //         if (value == msgId) {
    //             MsgEventMgr.getInstance().removeEventListener(value, key);
    //             this._eventMsgListeners.delete(key);
    //         }
    //     });
    // }

    // /**
    //  * 去掉所有网络消息监听
    //  */
    // removeAllMsgListener() {
    //     this._eventMsgListeners.forEach((value, key) => {
    //         MsgEventMgr.getInstance().removeEventListener(value, key);
    //         this._eventMsgListeners.delete(key);
    //     });
    //     this._eventMsgListeners.clear();
    // }

    // btnClose(event, customEventData) {
    //     SceneMgr.getInstance().removeTableLayer();
    // }
}
