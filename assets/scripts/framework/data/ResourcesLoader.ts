import { Asset, assetManager, AssetManager, error, resources } from "cc";

/*
 * @Author: liuguoqing
 * @Date: 2022-03-03 09:14:09
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-05 12:58:44
 * @Description: file content
 */

type UnionAsset = Asset | AssetManager.RequestItem[]

type FileCallback<T extends UnionAsset> = {
    (data:T):void
}

export class ResourcesLoader {

    // 下载资源
    static preload(path: string, doneFunc:FileCallback<UnionAsset>) {
        resources.preload(path, (err, dataAsset) => {
            if (err) {
                error("ResourcesLoader preload error:", err.message);
            }
            doneFunc(dataAsset);
        });
    }

    // resources需要动态加载的资源
    static load(path: string, doneFunc:FileCallback<UnionAsset>, type?:typeof Asset) {
        if ( type == undefined ) {
            resources.load(path, (err, dataAsset) => {
                if (err) {
                    error("ResourcesLoader load error:", err.message);
                }
                doneFunc(dataAsset);
            });
        } else {
            resources.load(path, type, (err, dataAsset) => {
                if (err) {
                    error("ResourcesLoader load error:",err.message);
                }
                doneFunc(dataAsset);
            });            
        }
    }
    
    static loadList(pathList:string[], onProcess:(finishNum:number, max:number, data)=>{}){
        let finishNum:number = 0
        let totalNum:number = pathList.length

        pathList.forEach(element => {
            this.load(element, (data)=>{
                finishNum++
                onProcess(finishNum, totalNum, data)
            })
        });
    }

    //释放单个资源
    static release(path: string, bundleName: string = "resources") {
        var bundle = assetManager.getBundle(bundleName);
        bundle?.release(path);
    }

    static releaseAll(){
        assetManager.releaseUnusedAssets()
    }

    static loadPromise(path: string, type?:typeof Asset){
        return new Promise((resolve, rejected)=>{
            this.load(path, (data)=>{
                resolve(data)
            }, type)
        })
    }
}