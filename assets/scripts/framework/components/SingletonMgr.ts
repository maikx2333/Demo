/*
 * @Author: liuguoqing
 * @Date: 2022-03-02 16:35:22
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-20 20:52:15
 * @Description: file content
 */
class SingletonMgr {
    static _instance: any;

    private _index: number = 0;
    private _singletonList: Array<any>;

    static getInstance<T>() {
        if (this._instance == null) {
            this._instance = new SingletonMgr();
        }
        return this._instance;
    }

    private constructor() {
        this._singletonList = [];
    }

    sign(T: any) {
        this._index++;
        T.sIndex = this._index;
        this._singletonList.push(T);
    }

    unSign(T: any) {
        for (let i = 0; i < this._singletonList.length; i++) {
            let s = this._singletonList[i];
            if (s._sIndex == T.sIndex) {
                this._singletonList.splice(i, 1);
                i--;
                break;
            }
        }
    }

    destoryAll() {
        while (this._singletonList.length > 0) {
            let singleton = this._singletonList.pop();
            singleton.clear();
            singleton.destoryInstance();
            singleton.instance = null;
        }
    }

    clear(){
        singletonMgr = null;
    }
}

// ()();
export let singletonMgr = (()=>{
    return SingletonMgr.getInstance<SingletonMgr>();
})();