import { error, JsonAsset, log, resources } from "cc";
import { DataParserBase } from "./DataParserBase";
import { ResourcesLoader } from "./ResourcesLoader";

/*
 * @Author: liuguoqing
 * @Date: 2022-03-03 08:54:10
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-06 14:47:17
 * @Description: file content
 */

export interface DataCallback {
    (done: boolean):void;
} 

export class DataBase {
    
    // 配置表handle name
    private _dataHandlerName: string = "";
    // 配置表文件名
    private _fileName: string = "";
    // 多语言解析器
    private _parser: DataParserBase = null;
    // 缓存起来(key:namekey,value:配置表内容) 例如:hero_01.json,filename:hero_,namekey:01
    private _data: Map<string, any> = new Map();

    constructor(dataHandlerName: string, fileName: string, parser: DataParserBase | null) {
        this._dataHandlerName = dataHandlerName;
        this._fileName = fileName;
        this._parser = parser;
    }

    // 加载
    public loadDataWithNameKey(namekey: string, func?: DataCallback){
        this._parseFileName(namekey,func)
    }

    public getData(namekey: string = ""): any {
        namekey = namekey.toString();
        if (this._data.has(namekey)) {
            return this._data.get(namekey);
        }
        return error("Can't Find Json File:", this._fileName + namekey);
    }

    public delData(namekey: string): void {
        let dataHandlerName = this._fileName + namekey;
        if (this._data.has(dataHandlerName)) {
            this._data.delete(dataHandlerName);
        }
    }

    public getAllData(): any {
        return this._data;
    }

    public showAll(): void {
        log(this._data);
    }

    private _parseFileName(namekey: string, func?:DataCallback) {
        // filename = genral_(this._fileName) + 1(namekey) 
        let fileName = this._fileName + namekey;
        this._loadFile(fileName, namekey, func);
    }

    // 加载json
    private _loadFile(fileName: string,namekey: string,func?: DataCallback): void {
        ResourcesLoader.load(fileName,(jsonData) => {
            if (!jsonData) {
                func(false);
                return;
            }

            let jsonAsset = <JsonAsset>jsonData;
            let data = jsonAsset.json;

            if (this._parser) {
                data = this._parser.parse(data, this._dataHandlerName, namekey);
            }
            this._data.set(namekey.toString(), data);

            if (func){
                func(true);
            }
            
            resources.release(fileName);
        });
    }

}