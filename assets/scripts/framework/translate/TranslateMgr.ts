import { Singleton } from "../components/Singleton";
import { dataMgr } from "../data/DataMgr";

class TranslateMgr extends Singleton {
    // 缓存
    private _translateCfg:any = {};
    // 构造函数
    constructor() {
        super();
    }

    loadCodeCfg(fileName: string) {
        this._translateCfg = dataMgr.getData(fileName);
    }


    // loadPBCfg(fileName: string) {
    //     this._translatePBCfg = dataMgr.getData(fileName);
    // }

    // getPBStr(key: string) {
    //     return this._translatePBCfg[key] || key;
    // }

    // loadExCfg(fileName: string) {
    //     this._translateExCfg = dataMgr.getData(fileName);
    // }

    // getExStr(key: string) {
    //     return this._translateExCfg[key] || key;
    // }

    translate(id: number):string{
        return this._getTranslateStr("t"+id);
    }

    translateData(key:string):string{
        return this._getTranslateStr(key);
    }

    private _getTranslateStr(key: string) {
        return this._translateCfg[key] || key;
    }

    clear(){
        translateMgr = null;
    }
}

// 代码翻译
// export function translate(id: number): string {
//     return translateMgr.getTranslateStr("t" + id);
// }

// // 预制体翻译
// export function GetTranslatePB(id: number): string {
//     return TranslateMgr.getInstance().getPBStr("p" + id);
// }

// // 数值表翻译
// export function GetTranslateEx(id: number | string): string {
//     return TranslateMgr.getInstance().getExStr("e" + id);
// }

// ()();
export let translateMgr = (()=>{
    return TranslateMgr.getInstance<TranslateMgr>();
})();