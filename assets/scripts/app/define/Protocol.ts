/*
 * @Author: liuguoqing
 * @Date: 2022-03-02 15:20:53
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-04 08:55:39
 * @Description: file content
 */
export namespace Protocol {
    /**
     * 网关协议
     */
    export enum Login {
        identify = 1,
        login
    }

    /**
     * 服务器协议
     */
    export enum Server {
        game_info = 10000,
    }

    //内部协议
    export enum Inner {
        ReloginSuccess,
        FightPause,
        FightResume,

        // 登录
        CloseNoticeView,
        SelectServer,

        // 设置懂哈速度
        SetAnimationSpeed,
    }
}