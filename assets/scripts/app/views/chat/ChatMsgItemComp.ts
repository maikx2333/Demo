
import { _decorator, Component, Node, find, RichText, UITransform, log } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = ChatMsgItemComp
 * DateTime = Thu Mar 17 2022 14:58:17 GMT+0800 (中国标准时间)
 * Author = maikx123456
 * FileBasename = ChatMsgItemComp.ts
 * FileBasenameNoExtension = ChatMsgItemComp
 * URL = db://assets/scripts/app/views/chat/ChatMsgItemComp.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('ChatMsgItemComp')
export class ChatMsgItemComp extends Component {

    private _playerName: string = "";
    public get playerName(): string {
        return this._playerName;
    }
    public set playerName(value: string) {
        this._playerName = value;
    }

    private _text: string = "";
    public get text(): string {
        return this._text;
    }
    public set text(value: string) {
        this._text = value;

        let richNode = find("RichText", this.node)
        let richTxtComp = richNode.getComponent(RichText)
        richTxtComp.string = value
    }

    private _richMaxWidth:number;
    private _richLabel:Node;


    onLoad() {
    }
    
    start() {
    }
    
    
    setRichLabelMaxWidth(width:number) {
        if (!this._richLabel) {
            this._richLabel = find("RichText", this.node)
        }
        this._richMaxWidth = width - this._richLabel.position.x - 10
        this._richLabel.getComponent(RichText).maxWidth = this._richMaxWidth
    }
    


    getRichHeight() {
        return this._richLabel.getComponent(UITransform).height
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
