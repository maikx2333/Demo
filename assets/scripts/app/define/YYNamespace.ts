import { sp } from "cc";
import { ModelRegisterMgr } from "../model/ModelRegisterMgr";
import { DataRegisterMgr } from "./DataRegisterMgr";
import { ViewRegisterMgr } from "./ViewRegisterMgr";
/*
 * @Author: liuguoqing
 * @Date: 2022-03-02 15:20:04
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-02 15:22:02
 * @Description: file content
 */
export namespace yy {

    // 自定义类型
    export namespace types {
        // 延时推断输入泛型 ，输入的泛型会被置于默认泛型之后
        export type NoInfer<A extends any> = [A][A extends any ? 0 : never];

        // view module name type
        export type ViewModuleName = keyof ViewRegisterMgr["ViewType"];

        // data module name type
        export type DataModuleName = keyof DataRegisterMgr["DataType"];

        // model module name type
        export type ModelModuleName = keyof ModelRegisterMgr["ModelType"];

        // common construtor type
        export type CommonConstructor<T = unknown> = new (...args: any[]) => T;
    }


    // 自定义接口
    export namespace interfaces{
        /**
         * @description: 骨骼动画回调函数
         * @param {type} trackEntry:sp.spine.TrackEntr
         * @return {type} void
         */        
        export interface SpineTrackEntryCallFunc {
            (trackEntry:sp.spine.TrackEntry):void
        }

        /**
             * @description: 用来设置动画播放过程中帧事件的监听
             * @param {type} trackEntry:sp.spine.TrackEntr
             * @param {type} event:sp.spine.Event
             * @return {type} void
             */        
        export interface SpineFrameEventCallFunc {
            (trackEntry:sp.spine.TrackEntry, event: sp.spine.Event):void
        }
    }


    export namespace macro {
        // 动画名称
        export enum HeroAnimate {
            Attack = "attack01",
            Run = "run",
            Idle = "idle",
            Die = "die",
            Hurt = "hurt",
            Jump = "jump",
            Skill01 = "skill01",
            Skill02 = "skill02",
        }
    }
}