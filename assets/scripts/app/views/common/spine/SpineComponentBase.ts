
import { _decorator, Component, Node, sp } from 'cc';
import { yy } from '../../../define/YYNamespace';
const { ccclass, property } = _decorator;

@ccclass('SpineComponentBase')
export class SpineComponentBase extends Component {
  
    @property(sp.Skeleton)
    _spineNode:sp.Skeleton = null;

    // private _attachedNodes:Map<string,Node> = new Map<string,Node>();

    private _animateStartCallback: yy.interfaces.SpineTrackEntryCallFunc = null;

    private _animateEndCallback: yy.interfaces.SpineTrackEntryCallFunc = null;

    private _animiateInterruptCallback: yy.interfaces.SpineTrackEntryCallFunc = null;

    private _animiateEventCallback: yy.interfaces.SpineFrameEventCallFunc = null;

    private _mixTime = 0.2; //动作融合时间

    onLoad () {
        this._init();
    }
    
    /**
     * @description 立即播放当前动画
     * @param actionName spine 动作名称
     * @param isLoop 是否循环播放 默认值false
     */
    public play(actionName:string,isLoop?:boolean){
        if (this._spineNode){
            let trackIndex = 0;
             this._spineNode.setAnimation(trackIndex, actionName, isLoop??false);
        }
    }

    /**
     * @description 暂停当前动画
     */
    public stop(){
        this._spineNode.paused = true;
    }

    /**
     * @description 继续播放当前动画
     */
    public resume(){
        this._spineNode.paused = false;
    }

    /**
     * @description 清理当前动画
     * @param trackIndex 播放动作队列索引，默认0，即当前动画
     */
    public clear(trackIndex:number=0){
        this._spineNode.clearTrack(trackIndex);
    }

    /**
     * @description 清理作队列索引
     */
    public clearAll(){
        this._spineNode.clearTracks();
    }


    /** 动画开始回调 */
    public setAnimateStartCallback(callback: SF.Interfaces.TrackEntryCallFunc) {
        this._animateStartCallback = callback;
    }

    /** 动画结束回调 */
    public setAnimateEndCallback(callback: SF.Interfaces.TrackEntryCallFunc) {
        this._animateEndCallback = callback;
    }

    /** 动画被打断回调 */
    public setAnimateInterruptCallback(callback: SF.Interfaces.TrackEntryCallFunc) {
        this._animiateInterruptCallback = callback;
    }

    /** 动画事件回调 */
    public setAnimateEventCallback(callback) {
        this._animiateEventCallback = callback;
    }

    private _init() {
        this._initSpineListener();
        this._initMix();
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

    private _initMix() {
        this._setMix(yy.macro.HeroAnimate.Stand, yy.macro.HeroAnimate.Run);
        this._setMix(yy.macro.HeroAnimate.Stand, yy.macro.HeroAnimate.Die);
        this._setMix(yy.macro.HeroAnimate.Run, yy.macro.HeroAnimate.Die);
        this._setMix(yy.macro.HeroAnimate.Run, yy.macro.HeroAnimate.Attack);
        this._setMix(yy.macro.HeroAnimate.Attack, yy.macro.HeroAnimate.Stand);
        this._setMix(yy.macro.HeroAnimate.Attack, yy.macro.HeroAnimate.Die);
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

    // 动作融合
    private _setMix(anim1, anim2, mixTime?) {
        if (this._spineNode.findAnimation(anim1) && this._spineNode.findAnimation(anim2)) {
            this._spineNode.setMix(anim1, anim2, mixTime || this._mixTime);
            this._spineNode.setMix(anim2, anim1, mixTime || this._mixTime);
        }
    }
}