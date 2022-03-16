/*
 * @Author: liuguoqing
 * @Date: 2022-03-04 23:09:26
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-05 15:08:57
 * @Description: file content
 */
import { _decorator, Node, BlockInputEventsComponent, UITransform, size, view } from "cc";
import { ComponentBase } from "./ComponentBase";
import { UIWidget } from "./UIWidget";
const { ccclass, property } = _decorator;


type callbackFunc = (data: any) => void | string | boolean;

@ccclass('LayerBase')
export class LayerBase extends ComponentBase {
    // private _eventMsgListeners: Map<string, number>;

    constructor() {
        super();
    }

    /**
     * 在组件加载的时候调用addMsgListener来监听消息
     */
    onLoad() {
        super.onLoad()
        this.addComponent(BlockInputEventsComponent);
        this.addComponent(UIWidget);
    }

    

    // 是否吞没点击
    // setSwallTouches(flag: boolean) {
    //     this.node.on(
    //         Node.EventType.TOUCH_START,
    //         (touch) => {
    //             return true;
    //         },
    //         this
    //     );
    //     this.node["_touchListener"].swallowTouches = flag;
    // }


    // btnClose(event, customEventData) {
    //     SceneMgr.getInstance().removeTableLayer();
    // }
}
