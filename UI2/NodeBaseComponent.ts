/*
 * @Author: Chenning
 * @Date: 2020-12-09 19:31:24
 * @LastEditTime: 2020-12-31 10:04:01
 * @LastEditors: Gino
 */
import { Component } from "cc";
import { MsgEventMgr } from "../Listener/SFEventMgr";

type callbackFunc = (data: any) => void | string | boolean;


export class NodeBaseComponent extends Component{
    private _eventMsgListeners: Map<string, number>;

    constructor() {
        super();
        this._eventMsgListeners = new Map();
    }

    start() {}

    /**
     * 在组件加载的时候调用addMsgListener来监听消息
     */
    onLoad() {}

    onEnable() {}

    onDisable() {}

    /**
     * 记得如果需要要重写此方法 注意必须调用super.onDestroy(),
     * 组件删除前会自动删除所有消息监听
     */
    onDestroy() {
        this.removeAllMsgListener();
    }

    /**
     * 添加网络消息监听
     */
    addMsgListener(msgId: number, listener: callbackFunc) {
        let handle = MsgEventMgr.getInstance().addEventListener(
            msgId,
            listener
        );
        if (this._eventMsgListeners.get(handle) != null) return;

        this._eventMsgListeners.set(handle, msgId);
    }

    /**
     * 移除对这个消息的监听
     * 某些情况node里面需要动态加减某个消息监听
     */
    removeMsgListener(msgId: number) {
        this._eventMsgListeners.forEach((value, key) => {
            if (value == msgId) {
                MsgEventMgr.getInstance().removeEventListener(value, key);
                this._eventMsgListeners.delete(key);
            }
        });
    }

    /**
     * 去掉所有网络消息监听
     */
    removeAllMsgListener() {
        this._eventMsgListeners.forEach((value, key) => {
            MsgEventMgr.getInstance().removeEventListener(value, key);
            this._eventMsgListeners.delete(key);
        });
        this._eventMsgListeners.clear;
    }
}
