import { error, JsonAsset, log, resources } from "cc";
import { DataParserBase, FileHelper } from "../yy";

/*
 * @Author: liuguoqing
 * @Date: 2022-03-03 08:54:10
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-03 13:29:56
 * @Description: file content
 */

export type DataCallback = (done: boolean) => void;

export class DataBase {
    private _dataName: string = "";
    private _fileName: string = "";
    private _fileType: number = 0;
    private _parser: DataParserBase = null;
    private _data: Map<string, any> = new Map();
    constructor(dataName: string, fileName: string, flieType: number, parser?: DataParserBase) {
        this._dataName = dataName;
        this._fileName = fileName;
        this._fileType = flieType;
        this._parser = parser;
    }

    // 资源预加载，仅下载
    preLoadWithName(namekey: string, func: DataCallback): void {
        this._parseFile(namekey, func);
    }

    preLoadWithIndex(startIndex: number, endIndex: number, func: DataCallback): void {
        let amount = 0;
        for (let index = startIndex; index < endIndex + 1; index++) {
            amount++;
            this._parseFile(index.toString(), (done) => {
                amount--;
                if (amount == 0) {
                    func(true);
                }
            });
        }
    }

    getData(namekey: string = ""): any {
        // let dataName = this._fileName + namekey;
        namekey = namekey.toString();
        if (this._data.has(namekey)) {
            return this._data.get(namekey);
        }

        error("Can't Find Json File:", this._fileName + namekey);
    }

    delData(namekey: string): void {
        let dataName = this._fileName + namekey;
        if (this._data.has(dataName)) {
            this._data.delete(dataName);
        }
    }

    getAllData(): any {
        return this._data;
    }

    showAll(): void {
        log(this._data);
    }

    private _parseFile(namekey: string, func: DataCallback) {
        let fileName = "";
        if (this._parser) {
            let data = this._parser.getMergeFileName(this._dataName, this._fileName, namekey);
            fileName = data[1];
        } else {
            fileName = this._fileName + namekey;
        }

        this._loadFile(fileName, namekey, this._fileType, func);
    }

    // 资源预加载，仅下载
    private _loadFile(fileName: string,namekey: string,mergeType: number,func: DataCallback): void {
        FileHelper.load(fileName,(jsonData) => {
            if (!jsonData) {
                func(false);
                return;
            }

            let jsonAsset = <JsonAsset>jsonData;
            let data = jsonAsset.json;
            if (mergeType == 1) {
                // 技术自动合并json
                Object.keys(data).forEach((key) => {
                    let dataName = key;
                    let newData = data[key];
                    if (this._parser) {
                        newData = this._parser.parse(newData, this._dataName, namekey);
                    }
                    this._data.set(dataName.toString(), newData);
                });
            } else if (mergeType == 2) {
                // 策划合并json
                if (this._parser) {
                    data = this._parser.parse(data, this._dataName, namekey);
                    let keys = Object.keys(data)
                    keys.forEach((key) => {
                        let dataName = key;
                        let newData = data[key];
                        this._data.set(dataName.toString(), newData);
                    });
                }
            } else {
                // 单个json数值;
                let dataName = namekey;
                if (this._parser) {
                    data = this._parser.parse(data, this._dataName, namekey);
                }
                this._data.set(dataName.toString(), data);
            }

            func(true);

            resources.release(fileName);
        });
    }

}