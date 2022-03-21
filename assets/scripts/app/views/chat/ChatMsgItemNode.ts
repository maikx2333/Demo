
import { _decorator, Component, Node, NodePool, Prefab, UITransform, instantiate, Widget, find, Label, widgetManager, log, RichText, v2, v3, TweenSystem } from 'cc';
import { ChatMsgItemComp } from './ChatMsgItemComp';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = ChatMsgItem
 * DateTime = Thu Mar 17 2022 14:32:09 GMT+0800 (中国标准时间)
 * Author = maikx123456
 * FileBasename = ChatMsgItem.ts
 * FileBasenameNoExtension = ChatMsgItem
 * URL = db://assets/scripts/app/views/chat/ChatMsgItem.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

export class ChatMsgItemNode extends Node {
    
    public static chatMsgNodePool:NodePool = new NodePool
    private _chatMsgItemPrefab:Prefab;
    private _chatMsgItemNode:Node; 
    private _uiTransComp:UITransform;

    private _playerName:string;
    private _text:string;


    constructor (prefab) {
        super()
        this._chatMsgItemPrefab = prefab

        this._uiTransComp = this.addComponent(UITransform)
        this._uiTransComp.anchorX = 0
        this._uiTransComp.height = 50
    
        let widget = this.addComponent(Widget)
        widget!.alignMode = Widget.AlignMode.ON_WINDOW_RESIZE;
        widget!.alignFlags = widgetManager.AlignFlags.HORIZONTAL
        widget!.left = 0;
        widget!.right = 0;

        this.on(Node.EventType.SIZE_CHANGED, this._updateView.bind(this))
    }


    setData(idx:number, name:string, text) {
        this._playerName = name;
        this._text = text;
        this._updateView()
    }
    
    _updateView(){
        if (this._chatMsgItemNode) {

            //更新数据
            let nodeComp = this._chatMsgItemNode.getComponent(ChatMsgItemComp)
            nodeComp.playerName = this._playerName
            nodeComp.text = this._text

            //更新富文本长度
            nodeComp.setRichLabelMaxWidth(this._uiTransComp.width)
            this._uiTransComp.height = nodeComp.getRichHeight()


            //置顶
            this._chatMsgItemNode.position = v3( this._chatMsgItemNode.position.x, this._uiTransComp.height / 2,0)
        }
    }

    //刷新item
    reuse() {
        if (this._chatMsgItemNode) {
            return
        }

        let msgNode = ChatMsgItemNode.chatMsgNodePool.get()
        if (!msgNode) {
            msgNode = instantiate(this._chatMsgItemPrefab)
        }
        this.addChild(msgNode)
        this._chatMsgItemNode = msgNode

        this._updateView()
    }

    unuse () {
        if (this._chatMsgItemNode) {
            ChatMsgItemNode.chatMsgNodePool.put(this._chatMsgItemNode)
        }
        this._chatMsgItemNode = null
    }

    private createNode() {
        
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
