/*
 * @Author: Gino
 * @Date: 2020-09-21 20:14:47
 * @LastEditTime: 2021-01-27 15:27:43
 * @LastEditors: Gino
 */
import { Node } from "cc";
import { SFTableContentLayer } from "./SFTableContentLayer";

export class SFTableLayer extends Node {
    _bgLayer: Node;
    _contentLayer: SFTableContentLayer;
    _uiLayer: Node;
    _subContent: Node;
    _subContentList: Array<Node>;

    constructor() {
        super();

        this._bgLayer = new Node();
        this.addChild(this._bgLayer);

        this._contentLayer = new SFTableContentLayer();
        this.addChild(this._contentLayer);

        this._uiLayer = new Node();
        this.addChild(this._uiLayer);

        this._subContent = new Node();
        this.addChild(this._subContent);
    }

    clearAll() {
        this._bgLayer.removeAllChildren();
        this._contentLayer.clearAll();
        this._uiLayer.removeAllChildren();
        this._subContent.removeAllChildren();
    }

    appendSubContent(layer: Node) {
        this._subContent.addChild(layer);
        this._subContentList.push(layer);

        layer.on("exit", () => {
            // 如果发现顶层没有pop掉就pop一下
            let topLayer = this._subContentList[
                this._subContentList.length - 1
            ];
            if (topLayer == layer) {
                this._subContentList.pop();
            }
        });
    }

    popSubContent(): boolean {
        let layer = this._subContentList.pop();
        if (layer != null) {
            layer.removeFromParent();
            layer.destroy();
            return true;
        }

        return false;
    }

    getSubContent() {
        return this._subContent;
    }

    getUILayer() {
        return this._uiLayer;
    }

    getContentLayer() {
        return this._contentLayer;
    }

    getBgLayer() {
        return this._bgLayer;
    }

    isEmpty() {
        let childCount =
            this._uiLayer.children.length +
            this._contentLayer.children.length +
            this._bgLayer.children.length +
            this._subContent.children.length;
        return 0 >= childCount;
    }

    setContentLayerVisible(flag: boolean) {
        let contentLayer = this.getContentLayer();
        if (flag == false) {
            contentLayer.hide();
        } else {
            contentLayer.show();
        }
    }

    getLayerName() {
        if (this._subContent.name != "New Node") {
            return this._subContent.name;
        }

        if (this._contentLayer.name != "New Node") {
            return this._contentLayer.name;
        }

        if (this._uiLayer.name != "New Node") {
            return this._uiLayer.name;
        }

        if (this._bgLayer.name != "New Node") {
            return this._bgLayer.name;
        }
    }
}