/*
 * @Author: liuguoqing
 * @Date: 2022-03-02 15:57:12
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-20 23:03:35
 * @Description: file content
 */

import { singletonMgr } from "./SingletonMgr";


export class Singleton {
    static getInstance<T>():T {
        if (!(<any>this).instance) {
            (<any>this).instance = new this();
            singletonMgr.sign(<any>this);
        }
        return (<any>this).instance as T;
    }

    static destoryInstance() {
        if ((<any>this).instance) {
            (<any>this).instance.clear();
            (<any>this).instance = null;
            singletonMgr.unSign(<any>this);
        }
    }
}
