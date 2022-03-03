/*
 * @Author: liuguoqing
 * @Date: 2022-03-02 15:20:53
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-03 13:41:57
 * @Description: file content
 */
export namespace Protocol {
    /**
     * 网关协议
     */
    export enum Login {
        identify,
        login
    }

    /**
     * 服务器协议
     */
    export enum Server {

    }

    /**
     * 内部协议
     */
    export enum Inner {
        ReloginSuccess,
        FightPause,
        FightResume
    }
}