
import { _decorator, Component, Node, find, UITransform, Label, tween, v3, log } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Tips
 * DateTime = Fri Mar 11 2022 15:26:10 GMT+0800 (中国标准时间)
 * Author = maikx123456
 * FileBasename = Tips.ts
 * FileBasenameNoExtension = Tips
 * URL = db://assets/scripts/app/views/common/Tips.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('Tips')
export class Tips extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    private _bg: Node;
    private _labelNode: Node;

    start() {
        // [3]


        let contentNode = find("content", this.node)
        tween(contentNode)
            .by(0.3, { position: v3(0, 200, 0) })
            .delay(0.2)
            .call(()=>{
                this.node.destroy();
            })
            .start()
    }

    private _text: string;
    public get text(): string {
        return this._text;
    }
    public set text(value: string) {
        if (!this._bg) {
            this._bg = find("content/bg", this.node)
            this._labelNode = find("content/Label", this.node)

            this._labelNode.on(Node.EventType.SIZE_CHANGED, ()=>{
                let width = this._labelNode.getComponent(UITransform).width
                let bgUITrans = this._bg.getComponent(UITransform)
                bgUITrans.width = width + 10
            })
        }


        this._text = value;

        let labelComp = this._labelNode.getComponent(Label)
        labelComp.string = value
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
