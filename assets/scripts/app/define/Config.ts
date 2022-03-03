/*
 * @Author: liuguoqing
 * @Date: 2022-03-02 18:12:08
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-03 13:47:00
 * @Description: file content
 */

export type DeviceInfo = {
    DeviceModel:string;
    IMEI:string;
    NetWork:string;
    SystemVer:string;
}

export type GameConfig = {
    PartitionKey: string;
    QDKey: string;
    QDName: string;
    SDKLogin: string;
    ServerUrl: string;
    ServerListUrl: string;
    BigUpdateType: string;
}