/*
 * @Author: liuguoqing
 * @Date: 2022-03-04 23:09:26
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-05 15:09:10
 * @Description: file content
 */
import { Component } from "cc";
import { msgEventMgr } from "../listener/EventMgr";

type callbackFunc = (data: any) => void | string | boolean;

export class ComponentBase extends Component {
    protected _eventMsgListeners: Map<string, number>;

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
        let handle = msgEventMgr.addEventListener(
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
                msgEventMgr.removeEventListener(value, key);
                this._eventMsgListeners.delete(key);
            }
        });
    }

    /**
     * 去掉所有网络消息监听
     */
    removeAllMsgListener() {
        this._eventMsgListeners.forEach((value, key) => {
            msgEventMgr.removeEventListener(value, key);
            this._eventMsgListeners.delete(key);
        });
        this._eventMsgListeners.clear;
    }
}
