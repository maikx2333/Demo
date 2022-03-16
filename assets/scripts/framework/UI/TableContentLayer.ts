import { find, log, Node, Widget, widgetManager } from "cc";
import { setNodeVisible } from "../utils/functions";
/*
 * @Author: Gino
 * @Date: 2020-09-21 20:08:11
 * @LastEditTime: 2022-03-05 15:12:00
 * @LastEditors: liuguoqing
 */
export class TableContentLayer extends Node {
    _contentLayerMap: Map<string, Node>;
    _displayLayer: any;

    // 构造函数
    constructor() {
        super();
        this._contentLayerMap = new Map();

        //全屏
        let widget = this.addComponent(Widget)
        widget!.alignMode = Widget.AlignMode.ON_WINDOW_RESIZE;
        widget!.alignFlags = widgetManager.AlignFlags.HORIZONTAL | widgetManager.AlignFlags.VERTICAL;
        widget!.left = 0;
        widget!.right = 0;
        widget!.bottom = 0;
        widget!.top = 0;
    }

    add(layer: Node, key?: string) {
        if (key == null) {
            key = layer.name;
        }

        this._contentLayerMap.set(key, layer);
        this.addChild(layer);

        if (this._displayLayer == null) {
            this._displayLayer = layer;
        }
    }

    findByKey(key: string): any {
        return this._contentLayerMap.get(key);
    }

    switch(key: string) {
        let layer = this._contentLayerMap.get(key);
        if (layer != null) {
            this._displayLayer = layer;
        }
    }

    hide() {
        this._contentLayerMap.forEach((layer) => {
            setNodeVisible(layer, false);
        });
    }

    show() {
        if (this._displayLayer == null) {
            return;
        }
        this._contentLayerMap.forEach((layer) => {
            setNodeVisible(layer, false);
            layer.setSiblingIndex(0);
        });

        // this._displayLayer.opacity = 255;
        // this._displayLayer.zIndex = 10;

        setNodeVisible(this._displayLayer, true);
        this._displayLayer.setSiblingIndex(10)
    }

    clearAll() {
        this._contentLayerMap.forEach((layer) => {
            layer.removeFromParent();
            layer.destroy();
        });

        this._contentLayerMap.clear();
        this._displayLayer = null;
    }

    getDisplayLayer(): Node {
        return this._displayLayer;
    }

    isEmpty(): boolean {
        if (!this._contentLayerMap || this._contentLayerMap.size == 0) {
            return true;
        }
        return false;
    }
}
