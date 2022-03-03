/*
 * @Author: liuguoqing
 * @Date: 2022-03-02 15:57:12
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-02 16:39:32
 * @Description: file content
 */

import { SingletonMgr } from "./SingletonMgr";

export class Singleton {
    private static _instance: any;
    sIndex: number = -1;
    static getInstance<T>():T {
        if (!(<any>this).instance) {
            (<any>this).instance = new this();
            SingletonMgr.getInstance().sign(<any>this);
        }
        return (<any>this).instance as T;
    }

    static destoryInstance() {
        if ((<any>this).instance) {
            (<any>this).instance.clear();
            (<any>this).instance = null;
            SingletonMgr.getInstance().unSign(<any>this);
        }
    }

    clear() {}
}
