import { Component, error, game, log, Node, Pool, Tween, tween, _decorator } from "cc"
import { ErrorCode } from "../../app/define/ErrorCode";
import { Protocol } from "../../app/define/Protocol";
import { Singleton } from "../components/Singleton"
import { gameMgr } from "../core/GameMgr";
import { sceneMgr } from "../core/SceneMgr";
import { Message } from "../listener/Message";


const { ccclass, property } = _decorator;
@ccclass('NetLoadindComp')
class NetLoadindComp extends Component {
    update(dt) {
        netLoadingMgr.tick(dt)
    }
}

interface IMsg {
    id:string;
    endTime:number;
}

//网络loading管理
class NetLoadingMgr extends Singleton {
    private _msgList:IMsg[] = []
    private _time:number = 0; 
    

    init() {
        let node = new Node("NetLoadingMgr")
        node.addComponent(NetLoadindComp)
        game.addPersistRootNode(node)
    }

    tick(dt:number) {
        this._time += dt;

        let index = 0
        while (this._msgList[index]) {
            let msg = this._msgList[index]
            if (msg.endTime > 0 && this._time >= msg.endTime) {
                this._msgList.splice(index)
                this.removeMsgLoading(msg.id)
                this.timeup(msg)
            }
            else {
                index++
            }
        }
    }

    timeup(msg:IMsg) {
        //超时
        error("<====time up==== msgId: " + msg.id)
        let msgId = Number(msg.id)
        let msgEvent = new Message(msgId, {code:ErrorCode.TIME_OUT})
        gameMgr.addInnerMessage(msgEvent)
    }

    addMsgLoading(id:number | string,  timeout:number = 10) {
        let idStr = id + ""
        let endTime = timeout > 0 ? this._time + timeout : 0
        this._msgList.push({id:idStr, endTime: endTime})
        sceneMgr.showNetLoading(true)
    }

    removeMsgLoading(id:number | string) {
        let idStr = id + ""
        for (let index = 0; index < this._msgList.length; index++) {
            const element = this._msgList[index];
            if (idStr == element.id) {
                this._msgList.splice(index)
                break;
            }
        }

        if (this._msgList.length == 0) {
            sceneMgr.showNetLoading(false)
        }
    }

    clear() {
        netLoadingMgr = null;
    }
}

export let netLoadingMgr = (() => {
    return NetLoadingMgr.getInstance<NetLoadingMgr>();
})();