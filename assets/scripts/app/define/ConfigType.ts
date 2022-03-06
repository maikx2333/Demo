/*
 * @Author: liuguoqing
 * @Date: 2022-03-02 18:12:08
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-04 23:47:53
 * @Description: file content
 */

import { DataRegisterMgr, ViewRegisterMgr } from "../../framework/yy";

// 延时推断输入泛型 ，输入的泛型会被置于默认泛型之后
export type NoInfer<A extends any> = [A][A extends any ? 0 : never];

// view module name type
export type ViewModuleName = keyof ViewRegisterMgr["ViewType"];

// data module name type
export type DataModuleName = keyof DataRegisterMgr["DataType"];

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