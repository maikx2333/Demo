import { Asset, AssetManager, log, resources } from "cc";

/*
 * @Author: liuguoqing
 * @Date: 2022-03-03 09:14:09
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-03 10:27:52
 * @Description: file content
 */

type UnionAsset = Asset | AssetManager.RequestItem[]

type FileCallback<T extends UnionAsset> = {
    (data:T):void
}

export class FileHelper {
    // 下载资源
    static preload(path: string, doneFunc:FileCallback<UnionAsset>) {
        resources.preload(path, (err, dataAsset) => {
            if (err) {
                log("FileHelper preload error:", err.message);
            }
            doneFunc(dataAsset);
        });
    }


    static load<T extends Asset>(path: string, doneFunc:FileCallback<UnionAsset>, type?:T) {
        if ( type == undefined ) {
            resources.load(path, (err, dataAsset) => {
                if (err) {
                    log("FileHelper load error:", err.message);
                }
                doneFunc(dataAsset);
            });
        } else {
            resources.load(path, type, (err, dataAsset) => {
                if (err) {
                    log("FileHelper load error:",err.message);
                }
                doneFunc(dataAsset);
            });            
        }
    }
}