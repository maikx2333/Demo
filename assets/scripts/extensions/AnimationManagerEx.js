/**
 * @name AnimationManagerEx 扩展库
 * @author StevenGerrard
 * @description 为AnimationManager添加setTimescale方法，用于改变播放动画速度（全局加速）
 */

 (function (global) {
    'use strict';

    var cc = global.cc;
    cc.log('Extensions AnimationManagerEx v1.0');

    // 游戏速率
    cc.director.__timescale = 1;
    var _originCalculateDeltaTime = cc.Director.prototype.calculateDeltaTime;
    cc.director.calculateDeltaTime = function (now) {
        _originCalculateDeltaTime.call(this, now);
        this._deltaTime *= this.__timescale;
    }

    Object.defineProperty(cc.AnimationManager.prototype, "setTimeScale", {
        value: function (timescale) {
            cc.director.__timescale = timescale;
        },
        configurable: true,
    });

    Object.defineProperty(cc.AnimationManager.prototype, "getTimeScale", {
        value: function () {
            return cc.director.__timescale = timescale;
        },
        configurable: true,
    });

})(window)