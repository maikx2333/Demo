
import { _decorator, Component, sp, Vec2, log } from 'cc';
const { ccclass, property } = _decorator;
 
/**
 * 抖动效果
 */
@ccclass('Jitter')
export class Jitter extends Component {
  
    @property({ type:sp.Skeleton })
    skeleton: sp.Skeleton | null = null;

    @property(Vec2)
    jitter:Vec2 = null;

    private _jitterEffect?:sp.VertexEffectDelegate;

    start () {
        this._jitterEffect = new sp.VertexEffectDelegate();
        // 设置好抖动参数。
        this._jitterEffect!.initJitter(this.jitter.x, this.jitter.y);
        // 调用 Skeleton 组件的 setVertexEffectDelegate 方法设置效果。
        this.skeleton!.setVertexEffectDelegate(this._jitterEffect!);
    }

}