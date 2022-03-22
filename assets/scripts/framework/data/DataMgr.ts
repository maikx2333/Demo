/*
 * @Author: liuguoqing
 * @Date: 2022-03-04 23:09:26
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-06 15:21:23
 * @Description: file content
 */
import { error, log } from "cc";
import { Singleton } from "../components/Singleton";
import { DataBase, DataCallback } from "./DataBase";
import { DataParserBase } from "./DataParserBase";

class DataMgr extends Singleton {
    private _dataMap: Map<string, DataBase>;

    constructor() {
        super();
        this._dataMap = new Map();
    }

    registerDataFile(dataHandlerName: string, path: string, parser: DataParserBase| null): void {
        let data = new DataBase(dataHandlerName, path, parser);
        this._dataMap.set(dataHandlerName, data);
    }

    loadData<S extends string,PAIR extends Array<number>>(dataHandlerName:S,pair:PAIR,done?:DataCallback){
        let start = pair[0];
        let ended = pair[1];
        if (start && ended) {
            this._loadDataWithIndex(dataHandlerName,pair,done);
        }else{
            this._loadDataWithDataHandlerName(dataHandlerName,done);
        }
    }

    getData(dataHandlerName:string, namekey?: string | number): any {
        let key = namekey?.toString() || "" ;
        let data = this._getDataCache(dataHandlerName);
        if (data){
            return data.getData(key);
        } else {
            error("Calling getData() fail! Data can't Find ! [ %s ] [ %s ] ", dataHandlerName, key);
        }
    }

    delData(dataHandlerName: string, namekey?: string | number): void {
        let key = namekey?.toString() || "";
        let data = this._getDataCache(dataHandlerName);
        if (data){
            return data.delData(key);
        } else {
            error("Calling delData() fail! Data can't Find ! [ %s ] [ %s ] ", dataHandlerName, key);
        }
    }

    showAll() {
        log(this._dataMap);
    }

    private _getDataCache(dataHandlerName:string):DataBase | null {
        if (!this._dataMap.has(dataHandlerName)) {
            error("Data does not be registered[ %s ]", dataHandlerName);
            return null
        }

        let data = this._dataMap.get(dataHandlerName);
        return data;
    }

    private _loadDataWithIndex<S extends string,PAIR extends Array<number>>(dataHandlerName:S,pair:PAIR,done?:DataCallback){
        let data = this._getDataCache(dataHandlerName);
        if (data){
            let start = pair[0];
            let ended = pair[1];
            for (let index = start; index <= ended; index++) {
                if (index == ended) {
                    data.loadDataWithNameKey(index.toString(),done);
                }else{
                    data.loadDataWithNameKey(index.toString());
                }
            }
        }
    }

    private _loadDataWithDataHandlerName(dataHandlerName:string,done?:DataCallback){
        let data = this._getDataCache(dataHandlerName);
        if (data){
            data.loadDataWithNameKey("",done);
        }
    }

    clear() {
        dataMgr = null;
    }
}

// ()();
export let dataMgr = (()=>{
    return DataMgr.getInstance<DataMgr>();
})();