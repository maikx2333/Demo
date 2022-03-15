/*
 * @Author: liuguoqing
 * @Date: 2022-03-02 18:12:08
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-04 23:47:53
 * @Description: 配置表类型声明
 */

export type ViewInfoType = {
    /**
     * 系统名称
     */
    System:string;
    /**
     * 界面名称
     */
    View:string;
    /**
     * 预制体路径
     */
    Path:string;

    /**
     * 是否隐藏背景
     */
    Hidden:boolean;

    /**
     * 是否永久缓存
     */
    Cache:boolean;
}

export type DeviceInfoType = {
    DeviceModel:string;
    IMEI:string;
    NetWork:string;
    SystemVer:string;
}

export type GameConfigType = {
    PartitionKey: string;
    QDKey: string;
    QDName: string;
    SDKLogin: string;
    ServerUrl: string;
    ServerListUrl: string;
    BigUpdateType: string;
}

export type DoubleBtnDialogArgsType = {
    msg: string;
    leftBtnName: string;
    rightBtnName: string,
    leftCallback: Function;
    rightCallback: Function,
    hideLeftButton: boolean,
}