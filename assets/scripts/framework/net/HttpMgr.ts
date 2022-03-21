/*
 * @Author: liuguoqing
 * @Date: 2022-03-02 10:41:03
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-03 15:03:06
 * @Description: file content
 */

import { log, sys } from "cc";
import { Singleton } from "../components/Singleton";
import { netStateMgr } from "./NetStateMgr";

export type HttpCallback = {
    (msg:HttpMessage):void
}

export class HttpMessage {
    private _code:number;
    public readonly code:number;//结果码
    private _data:any;
    public readonly data:number;//解析后的json{}
    constructor(code:number,data:any) {
        this._code = code;
        this._data = data;
    }
}

 class HttpMgr extends Singleton{
    private constructor(){
        super();
    }
   
    get(callback:HttpCallback,url:string,needLoading?: boolean){
        log("[Http] Get", url);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 500) {
                let msg = this._responseHandler(xhr);
                callback(msg);
            }
        };
        xhr.ontimeout = (ev) => {
            // GlobalFunction.ShowMsgTips("请求超时，请检查网络设置或稍后再试");
            netStateMgr.netWorkError();
        };
        xhr.onerror = (ev) => {
            // GlobalFunction.ShowMsgTips(
            //     "网络连接失败，请检查网络设置或稍后再试"
            // );
            netStateMgr.netWorkError();
        };
        xhr.open("GET", url);
        xhr.timeout = 6000;
        xhr.send();
    }

    post(callback:HttpCallback,url:string,data:any,needLoading?: boolean){
        log("[Http] Post", url);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 500) {
                let msg = this._responseHandler(xhr);
                callback(msg);
            }
        };
        xhr.ontimeout = (ev) => {
            // GlobalFunction.ShowMsgTips("请求超时，请检查网络设置或稍后再试");
            netStateMgr.netWorkError();
        };
        xhr.onerror = (ev) => {
            // GlobalFunction.ShowMsgTips(
            //     "网络连接失败，请检查网络设置或稍后再试"
            // );
            netStateMgr.netWorkError();
        };
        xhr.open("POST", url);
        if (sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }
        xhr.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
        );
        xhr.timeout = 6000;
        xhr.send(this._serializeData(data));
    }

    private _responseHandler(xhr: XMLHttpRequest):HttpMessage {
        let msg = null;
        if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status != 404) {
            msg = this._packMsg(0, JSON.parse(xhr.responseText));
        } else if (xhr.status === 404) {
            msg = this._packMsg(404, { error: "404 page not found!" });
        } else if (xhr.readyState === 3) {
            msg = this._packMsg(3, { error: "Request dealing!" });
        } else if (xhr.readyState === 2) {
            msg = this._packMsg(2, { error: "Request received!" });
        } else if (xhr.readyState === 1) {
            msg = this._packMsg(1, {
                error:
                    "Server connection established! Request hasn't been received",
            });
        } else if (xhr.readyState === 0) {
            msg = this._packMsg(4, {
                error: "Request hasn't been initiated!",
            });
        }

        return msg;
    }

    private _packMsg(code: number, data: any) {
        return new HttpMessage(code,data)
    }

    private _serializeData(datas: any) {
        let serializeParams = "";
        for (let variable in datas) {
            serializeParams =
                serializeParams + variable + "=" + datas[variable] + "&";
        }
        serializeParams = serializeParams.substring(
            0,
            serializeParams.length - 1
        );
        return serializeParams;
    }

    clear() {
        httpMgr = null;
    }
}

// ()();
export let httpMgr = (()=>{
    return HttpMgr.getInstance<HttpMgr>();
})();