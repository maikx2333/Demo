
import { _decorator } from 'cc';
import { runInThisContext } from 'vm';
import { sceneMgr } from '../../../framework/core/SceneMgr';
import { LayerBase } from '../../../framework/ui/LayerBase';
const { ccclass, property } = _decorator;
 
@ccclass('TransLoadingLayer')
export class TransLoadingLayer extends LayerBase {
    
    private _enterCallback:Function = null
    private _completeCallback:Function = null

    start () {
      
    }

    setEnterCalback(cb:Function){
        this._enterCallback = cb;
    }

    setCompleteCallback(cb:Function){
        this._completeCallback = cb;
    }

    onEnterCallback(){
        if (this._enterCallback){
            this._enterCallback()
        }
    }

    onTransComplete(data:string){
        if (this._completeCallback){
            this._completeCallback()
        }
        sceneMgr.removeTransitionLayer();
    }
}