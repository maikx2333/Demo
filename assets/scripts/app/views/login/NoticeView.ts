
import { _decorator, WebView } from 'cc';
import { sceneMgr } from '../../../framework/core/SceneMgr';
import { socketMgr } from '../../../framework/net/SocketMgr';
import { LayerBase } from '../../../framework/ui/LayerBase';
import { Protocol } from '../../define/Protocol';
const { ccclass, property } = _decorator;
 
@ccclass('NoticeView')
export class NoticeView extends LayerBase {
    
    @property(WebView)
    webview: WebView = null;

    private _callback:Function = null;

    updateView(data){
        let msgData = data[0];
        this._callback = data[1];
        let htmlID = msgData.html_id;
        this.webview.url = data[0];//`${GameConfig.ServerListUrl}/static/new_notice/html/${htmlID}.html`;
    }

    close(){
        sceneMgr.popTableLayer(); 
        if (this._callback) {
            this._callback();
        }
        socketMgr.sendInnerMsg(Protocol.Inner.CloseNoticeView);
    }

}