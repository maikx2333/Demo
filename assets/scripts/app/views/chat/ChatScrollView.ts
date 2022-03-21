
import { _decorator, Component, Node, ScrollView, log, Prefab, UITransform, math } from 'cc';
import { ChatMsgItemNode } from './ChatMsgItemNode';
const { ccclass, property, requireComponent } = _decorator;

/**
 * Predefined variables
 * Name = ChatLayer
 * DateTime = Thu Mar 17 2022 14:13:20 GMT+0800 (中国标准时间)
 * Author = maikx123456
 * FileBasename = ChatLayer.ts
 * FileBasenameNoExtension = ChatLayer
 * URL = db://assets/scripts/app/views/common/ui/ChatLayer.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

const itemIndex = new Set<number>();

@ccclass('ChatScrollView')
export class ChatScrollView extends Component {

    @property spaceY = 0;
    @property(Prefab) ChatItemPrefab: Prefab

    scrollView: ScrollView;
    private visibleHeight: number;
    private _itemList: ChatMsgItemNode[] = []
    private visibleNodes = new Map<number, ChatMsgItemNode>();
    private lastY;

    onLoad() {
        this.scrollView = this.getComponent(ScrollView);
        this.visibleHeight = this.scrollView.getComponent(UITransform).height

      
    }

    start() {
        for (let index = 0; index < 100; index++) {
            if (index % 2 == 0) {
                this.addChatMsg("玩家1：", "<color=#00ff00>Rich</color>", index)
            }
            else{
                this.addChatMsg("玩家2：", "撒大声地撒大所奥术大师多奥术大师多大时代实打实撒大声地撒大所奥术大师多奥术大师多大时代实打实", index)
            }
        }

        this.scrollView.scrollToTop()
    }

    addChatMsg(name: string, text: string, idx: number) {
        let msgNode = new ChatMsgItemNode(this.ChatItemPrefab)
        msgNode.setData(idx, name, text)
        this._itemList.push(msgNode)
        this.scrollView.content.addChild(msgNode)
    }

    lateUpdate() {
        const y = Math.floor(this.scrollView.getScrollOffset().y);
        if (this.lastY == y) {
            return
        }
        this.lastY = y;

        //更新可见item索引
        this.getVisibleItemIndex(y)
        this.visibleNodes.forEach((node, idx) => {
            if (!itemIndex.has(idx)) {
                node.unuse()
                this.visibleNodes.delete(idx);
                // console.log("丢弃:",idx );
            }
        });
        itemIndex.forEach((idx) => {
            if (!this.visibleNodes.has(idx)) {
                let msgNode = this._itemList[idx]
                msgNode.reuse()
                this.visibleNodes.set(idx, msgNode);
            }
        });
    }

    getVisibleItemIndex(y: number) {
        itemIndex.clear();

        let curH = 0;
        this._itemList.forEach((element, k) => {
            let itemH = element.getComponent(UITransform).height
            curH += itemH

            if (curH > y && (curH - itemH) < y + this.visibleHeight) {
                itemIndex.add(k);
            }
        });
    }

    onDestory(){
        log("ChatScrollView clear")
        ChatMsgItemNode.chatMsgNodePool.clear()
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
