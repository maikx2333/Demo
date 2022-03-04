/*
 * @Author: liuguoqing
 * @Date: 2022-03-02 18:12:08
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-03 15:34:12
 * @Description: file content
 */

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