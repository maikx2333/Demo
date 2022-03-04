import { error, log } from "cc";
import { DataBase, DataParserBase, Singleton } from "../yy";

class DataMgr extends Singleton {
    private _dataRawMap: Map<string, DataBase>;

    constructor() {
        super();
        this._dataRawMap = new Map();
    }

    regDataFile(rawName: string, path: string, fileType: number, parser: DataParserBase): void {
        let dataRaw = new DataBase(rawName, path, fileType, parser);
        this._dataRawMap.set(rawName, dataRaw);
    }

    preLoad(rawName: string, indexData: string | [number, number], func: (done: boolean) => void) {
        if (this._dataRawMap.has(rawName)) {
            let dataRaw = this._dataRawMap.get(rawName);

            if (!indexData) {
                dataRaw.preLoadWithName("", func);
            } else if (typeof indexData == "string") {
                dataRaw.preLoadWithName(indexData, func);
            } else {
                dataRaw.preLoadWithIndex(indexData[0], indexData[1], func);
            }
        }
    }

    getData(rawName: string, key?: string): any {
        if (this._dataRawMap.has(rawName)) {
            let dataRaw = this._dataRawMap.get(rawName);
            return dataRaw.getData(key);
        } else {
            error("DataRaw get can't Find ! [ %s ] [ %s ] ", rawName, key);
        }
    }

    delData(rawName: string, key?: string): void {
        if (this._dataRawMap.has(rawName)) {
            let dataRaw = this._dataRawMap.get(rawName);
            return dataRaw.delData(key);
        } else {
            error("DataRaw del can't Find ! [ %s ] [ %s ] ", rawName, key);
        }
    }

    getRawData(rawName: string): any {
        if (this._dataRawMap.has(rawName)) {
            let dataRaw = this._dataRawMap.get(rawName);
            return dataRaw;
        } else {
            error("DataRaw get can't Find ! [ %s ] ", rawName);
        }
    }

    showAll() {
        log(this._dataRawMap);
    }
}

// ()();
export let dataMgr = (()=>{
    return DataMgr.getInstance<DataMgr>();
})();