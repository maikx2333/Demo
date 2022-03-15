import { instantiate, Prefab } from "cc";
import { sceneMgr } from "../../../framework/core/SceneMgr";
import { ResourcesLoader } from "../../../framework/data/ResourcesLoader";
import { Message } from "../../../framework/listener/Message";
import { ViewCreatorBase } from "../../../framework/ui/ViewCreatorBase";
import { ViewProtocol } from "../../define/ViewProtocol";
import { viewRegisterMgr } from "../../define/ViewRegisterMgr";
import { Tips } from "./Tips";

export class DialogCreator extends ViewCreatorBase {

    private _tipsQueue:Array<Message> = new Array<Message>();
    private _tempTipsQueue:Array<Message> = new Array<Message>();
    private _timer: NodeJS.Timer = null;

    // private _isDispatching:boolean = false;

    onInit() {
        this.regMsg(ViewProtocol.DoubleBtnDialog, this.onCreateDoubleBtnDialogView.bind(this))
        this.regMsg(ViewProtocol.Tips, this.onCreateTips.bind(this))
    }

    onCreateDoubleBtnDialogView(event:Message) {
        let viewInfo = viewRegisterMgr.getViewInfo("dialog","DoubleBtnDialog");
        ResourcesLoader.loadWithViewInfo(viewInfo,(data:Prefab)=>{
            data.addRef()
            let node = instantiate(data);
            // let com = node.getComponent("DoubleBtnDialog").updateDialog(event.getRawData[0]);
            sceneMgr.pushNewTableLayer();
            sceneMgr.replaceTableContent(node,viewInfo.View);
        })
    }

    onCreateTips(event:Message){
        let isScheduled = this._timer ? true : false;
        if (isScheduled) {
            // 暂存队列
            this._tempTipsQueue.push(event);
            return;
        }

        this._tipsQueue.push(event);
        this._timer = setInterval(this._tipsTick.bind(this),100);
    }

    _tipsTick(){
        if (this._tipsQueue.length == 0) {
            if (this._tempTipsQueue.length == 0 ){
                clearInterval(this._timer);
                this._timer = null;
                return;
            }
            
            this._tipsQueue = this._tempTipsQueue;
            this._tempTipsQueue.length = 0;
        }

        let event:Message = this._tipsQueue.shift();
        if (event){
            let viewInfo = viewRegisterMgr.getViewInfo("dialog","Tips");
            ResourcesLoader.loadWithViewInfo(viewInfo, (data:Prefab)=>{
                let tipsNode = instantiate(data)
                let str = event.getRawData()
                tipsNode.getComponent(Tips).text = str;
                sceneMgr.getTipsLayer().addChild(tipsNode)
            }, Prefab)
        }
       
    }
}