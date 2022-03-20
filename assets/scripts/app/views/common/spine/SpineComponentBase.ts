
import { _decorator, Component, Node, sp, log, Vec3 } from 'cc';
import { Message } from '../../../../framework/listener/Message';
import { ComponentBase } from '../../../../framework/ui/ComponentBase';
import { Protocol } from '../../../define/Protocol';
import { yy } from '../../../define/YYNamespace';
const { ccclass, property } = _decorator;

@ccclass('SpineComponentBase')
export class SpineComponentBase extends ComponentBase {
  
    @property(Node)
    spineNode:Node = null;


    @property(Node)
    effectFontNode = null;

    @property(Node)
    effectBackNode = null;

    private _spine:sp.Skeleton = null;

    // private _attachedNodes:Map<string,Node> = new Map<string,Node>();

    private _animateStartCallback: yy.interfaces.SpineTrackEntryCallFunc = null;

    private _animateEndCallback: yy.interfaces.SpineTrackEntryCallFunc = null;

    private _animiateInterruptCallback: yy.interfaces.SpineTrackEntryCallFunc = null;

    private _animiateEventCallback: yy.interfaces.SpineFrameEventCallFunc = null;

    private _mixTime = 0.2; //动作融合时间

    onLoad () {
        this._init();
        this.addMsgListener(Protocol.Inner.SetAnimationSpeed,this._setSpineAnimationSpeed.bind(this))
    }

    private _setSpineAnimationSpeed(event:Message) {
        let speed = event.getRawData();
        this._spine.timeScale = speed;
    }
    
    private _init() {
        let spine = this.spineNode.getComponent(sp.Skeleton);
        this._spine = spine;
        this._initSpineListener();
        this._initMix();
    }

    private _initSpineListener() {
        if (!this._spine) {
            return;
        }

        this._spine.setStartListener(this._onAnimateStartCallback.bind(this));
        this._spine.setEndListener(this._onAnimateEndCallback.bind(this));
        this._spine.setInterruptListener(this._onAnimateInterruptCallback.bind(this));
        this._spine.setEventListener(this._onAnimateEventCallback.bind(this));
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
        if (this._spine.findAnimation(anim1) && this._spine.findAnimation(anim2)) {
            this._spine.setMix(anim1, anim2, mixTime || this._mixTime);
            this._spine.setMix(anim2, anim1, mixTime || this._mixTime);
        }
    }


    /**
     * @description 立即播放当前动画
     * @param actionName spine 动作名称
     * @param isLoop 是否循环播放 默认值false
     */
    public play(actionName:string,isLoop?:boolean){
        if (this._spine){
            let trackIndex = 0;
             this._spine.setAnimation(trackIndex, actionName, isLoop??false);
        }
    }

    /**
     * @description 暂停当前动画
     */
    public stop(){
        this._spine.paused = true;
    }

    /**
     * @description 继续播放当前动画
     */
    public resume(){
        this._spine.paused = false;
    }

    /**
     * @description 清理当前动画
     * @param trackIndex 播放动作队列索引，默认0，即当前动画
     */
    public clear(trackIndex:number=0){
        this._spine.clearTrack(trackIndex);
    }

    /**
     * @description 清理作队列索引
     */
    public clearAll(){
        this._spine.clearTracks();
    }


    /** 动画开始回调 */
    public setAnimateStartCallback(callback:yy.interfaces.SpineTrackEntryCallFunc) {
        this._animateStartCallback = callback;
    }

    /** 动画结束回调 */
    public setAnimateEndCallback(callback: yy.interfaces.SpineTrackEntryCallFunc) {
        this._animateEndCallback = callback;
    }

    /** 动画被打断回调 */
    public setAnimateInterruptCallback(callback: yy.interfaces.SpineTrackEntryCallFunc) {
        this._animiateInterruptCallback = callback;
    }

    /** 动画事件回调 */
    public setAnimateEventCallback(callback) {
        this._animiateEventCallback = callback;
    }

    public addEffectFont(node:Node,offset?:Vec3){
        this.effectFontNode.addChild(node);
        if (offset) {
            node.position = offset;
        }
    }

    public addEffectBack(node:Node,offset?:Vec3){
        this.effectBackNode.addChild(node);
        if (offset) {
            node.position = offset;
        }
    }
}