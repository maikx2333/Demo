
import { _decorator, Component, Node, sp } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('SpineComponentBase')
export class SpineComponentBase extends Component {
  
    @property(sp.Skeleton)
    _spineNode:sp.Skeleton = null;

    private _attachedNodes:Map<string,Node> = new Map<string,Node>();

    private _isPaused: boolean = false;

    private _animateStartCallback: SF.Interfaces.TrackEntryCallFunc = null;

    private _animateEndCallback: SF.Interfaces.TrackEntryCallFunc = null;

    private _animiateInterruptCallback: SF.Interfaces.TrackEntryCallFunc = null;

    _mixTime = 0.2; //动作融合时间

    start () {
        // [3]
    }

    
    /**
     * @description 立即播放当前动画
     * @param actionName spine 动作名称
     * @param isLoop 是否循环播放 默认值false
     */
    play(actionName:string,isLoop?:boolean){
        if (this._spineNode){
            let trackIndex = 0;
             this._spineNode.setAnimation(trackIndex, actionName, isLoop??false);
        }
    }

    /**
     * @description 暂停当前动画
     */
    stop(){
        this._spineNode.paused = true;
    }

    /**
     * @description 继续播放当前动画
     */
    resume(){
        this._spineNode.paused = false;
    }

    /**
     * @description 清理当前动画
     * @param trackIndex 播放动作队列索引，默认0，即当前动画
     */
    clear(trackIndex:number=0){
        this._spineNode.clearTrack(trackIndex);
    }

    /**
     * @description 清理作队列索引
     */
    clearAll(){
        this._spineNode.clearTracks();
    }


    private _initSpineListener() {
        if (!this._spineNode) {
            return;
        }

        this._spineNode.setStartListener(this._onAnimateStartCallback.bind(this));
        this._spineNode.setEndListener(this._onAnimateEndCallback.bind(this));
        this._spineNode.setInterruptListener(this._onAnimateInterruptCallback.bind(this));
        this._spineNode.setEventListener(this._onAnimateEventCallback.bind(this));
    }

    // 动作开始回调
    private _onAnimateStartCallback(trackEntry: sp.spine.TrackEntry) {
        if (this._animateStartCallback) {
            this._animateStartCallback(trackEntry);
        }
    }

    // 动作播放完回调
    private _onAnimateEndCallback(trackEntry: sp.spine.TrackEntry) {
        if (this._animateEndCallback) {
            this._animateEndCallback(trackEntry);
        }
    }

    // 动作被打断回调
    private _onAnimateInterruptCallback(trackEntry: sp.spine.TrackEntry) {
        if (this._animiateInterruptCallback) {
            this._animiateInterruptCallback(trackEntry);
        }
    }

    // 帧事件回调
    private _onAnimateEventCallback(trackEntry: sp.spine.TrackEntry, event: sp.spine.Event) {
        if (this._animiateEventCallback) {
            this._animiateEventCallback(trackEntry, event);
        }
    }
}