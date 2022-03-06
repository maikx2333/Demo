/*
 * @Author: liuguoqing
 * @Date: 2022-03-04 23:09:26
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-06 15:21:23
 * @Description: file content
 */
import { error, log } from "cc";
import { DataModuleName } from "../../app/define/ConfigType";

import { DataBase, DataCallback, DataParserBase, Singleton } from "../yy";

class DataMgr extends Singleton {
    private _dataRawMap: Map<string, DataBase>;

    constructor() {
        super();
        this._dataRawMap = new Map();
    }

    registerDataFile(dataHandlerName: string, path: string, parser: DataParserBase| null): void {
        let dataRaw = new DataBase(dataHandlerName, path, parser);
        this._dataRawMap.set(dataHandlerName, dataRaw);
    }

    loadData(dataHandlerName: string,done:DataCallback){
        if (!this._dataRawMap.has(dataHandlerName)) {
            return error("Data is not be register[ %s ]", dataHandlerName);
        }

        let data = this._dataRawMap.get(dataHandlerName);
        data.loadData("",done);
    }

    getData(dataHandlerName: string, key?: string): any {
        if (this._dataRawMap.has(dataHandlerName)) {
            let dataRaw = this._dataRawMap.get(dataHandlerName);
            return dataRaw.getData(key);
        } else {
            error("Data get can't Find ! [ %s ] [ %s ] ", dataHandlerName, key);
        }
    }

    delData(dataHandlerName: string, key?: string): void {
        if (this._dataRawMap.has(dataHandlerName)) {
            let dataRaw = this._dataRawMap.get(dataHandlerName);
            return dataRaw.delData(key);
        } else {
            error("Data del can't Find ! [ %s ] [ %s ] ", dataHandlerName, key);
        }
    }

    getRawData(dataHandlerName: string): any {
        if (this._dataRawMap.has(dataHandlerName)) {
            let dataRaw = this._dataRawMap.get(dataHandlerName);
            return dataRaw;
        } else {
            error("Data get can't Find ! [ %s ] ", dataHandlerName);
        }
    }

    showAll() {
        log(this._dataRawMap);
    }

    _getDataByDataHandlerName<TMoudleName extends DataModuleName>(dataHandlerName:TMoudleName){

    }

    _getDataByDataHandlerNameAndKeyName<TMoudleName extends DataModuleName,T extends string>(dataHandlerName:TMoudleName,keyname:T){

    }
}

// ()();
export let dataMgr = (()=>{
    return DataMgr.getInstance<DataMgr>();
})();