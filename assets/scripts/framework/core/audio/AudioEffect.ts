import { AudioClip, AudioSource, error, _decorator } from 'cc';
import { ResourcesLoader } from '../../data/ResourcesLoader';
const { ccclass, menu } = _decorator;

/**
 * 注：用playOneShot播放的音乐效果，在播放期间暂时没办法即时关闭音乐
 */

/** 游戏音效 */
@ccclass('AudioEffect')
export class AudioEffect extends AudioSource {
    private effects: Map<string, AudioClip> = new Map<string, AudioClip>();

    public load(url: string, callback?: Function) {
        ResourcesLoader.load(url,(data:AudioClip)=>{
            this.effects.set(url, data);
            this.playOneShot(data, this.volume);
            callback && callback();
        },AudioClip)
    }

    release() {
        for (let key in this.effects) {
            ResourcesLoader.release(key);
        }
        this.effects.clear();
    }
}
