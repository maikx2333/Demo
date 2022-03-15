import { AudioClip, AudioSource, error, log, _decorator } from 'cc';
import { ResourcesLoader } from '../../data/ResourcesLoader';
const { ccclass, menu } = _decorator;

/** 背景音乐 */
@ccclass('AudioMusic')
export class AudioMusic extends AudioSource {
    public onComplete: Function | null = null;

    private _progress: number = 0;
    private _url: string | null = null;
    private _isPlay: boolean = false;

    /**
     * 设置音乐当前播放进度
     * @param progress 进度百分比(0~1)
     */
    public get progress() {
        this._progress = this.currentTime / this.duration;
        return this._progress;
    }
    public set progress(value: number) {
        this._progress = value;
        this.currentTime = value * this.duration;
    }

    public load(url: string,isLoop:boolean=true, callback?: Function) {
        ResourcesLoader.load(url, (data:AudioClip)=>{
            if (this.playing) {
                this.stop();
                ResourcesLoader.release(this._url!);
            }

            this.clip = data;
            this.currentTime = 0;
            this.play();
            this.loop = isLoop;
            callback && callback();

            this._url = url;
        },AudioClip)
    }

    update(dt: number) {
        if (this.currentTime > 0) {
            this._isPlay = true;
        }

        if (this._isPlay && this.playing == false) {
            this._isPlay = false;
            this.onComplete && this.onComplete();
        }
    }

    release() {
        if (this._url) {
            ResourcesLoader.release(this._url);
            this._url = null;
        }
    }
}
