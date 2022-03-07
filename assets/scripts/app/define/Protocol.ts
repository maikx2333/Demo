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
        identify,
        login
    }

    /**
     * 服务器协议
     */
    export enum Server {
        game_info,
    }

    /**
     * 内部协议
     */
    export enum Inner {
        ReloginSuccess,
        FightPause,
        FightResume
    }

    export enum View {
        LoginView = "LginView"
    }

    export enum Model {
        LoginModel = "LoginModel"
    }
}