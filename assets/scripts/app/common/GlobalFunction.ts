// import { dataMgr, gameMgr, ModelBase } from "../../framework/yy";
import { director, log } from "cc";
import { gameMgr } from "../../framework/core/GameMgr";
import { sceneMgr } from "../../framework/core/SceneMgr";
import { dataMgr } from "../../framework/data/DataMgr";
import { ModelBase } from "../../framework/data/ModelBase";
import { httpMgr } from "../../framework/net/HttpMgr";
import { DoubleBtnDialogArgsType} from "../define/ConfigType";
import { ViewProtocol } from "../define/ViewProtocol";
import { yy } from "../define/YYNamespace";


/**
 * 通用全局函数
 */
export namespace G {
    export function showDoubleBtnDialog(args:DoubleBtnDialogArgsType){
        //主场景
        if (director.getScene().name == "Main") {
            sceneMgr.sendCreateView(ViewProtocol.DoubleBtnDialog, args);
        }
        // } else {
        //     let msgData = new SFMessage(ViewFlags.DoubleBtnDialog, args);
        //     LoaderEventMgr.getInstance().dispatchEvent(msgData);
        // }
    }
    /**
     * 
     * @param dataHandlerName 注册的hand name
     * @param namekey?:string|number 索引值
     */
    export function getConfig<TMoudleName extends yy.types.DataModuleName>(dataHandlerName:TMoudleName,namekey?:string|number) {
        return dataMgr.getData(dataHandlerName,namekey);
    }

    /**
     * 
     * @param mdoelName model的名称
     * @returns 获取model
     */
    export function getModel<T extends ModelBase>(modelConstructor: yy.types.CommonConstructor<T>):T {
        return gameMgr.getModel(modelConstructor);
    }

    export function showMsgTips(tips:string) {
        sceneMgr.sendCreateView(ViewProtocol.Tips, tips)
    }

    // 公告
    export function showNotice(callback?: Function) {
    let url = `http://192.168.0.122:8080/notice.jpg`;
    // {
    //   "html_id": 1, // 实际html id
    //   "start": 1590935388, // 开始时间
    //   "end": 1626767612 // 结束时间
    //  }
    // httpMgr.get((msg) => {
        // log(msg)
        // if (msg.code == 0) {
            // if (msg.data.start) {
            //     var date = new Date();
            //     let curTime = date.getTime() / 1000;
            //     let realVer = GameConfig.realVer || "0.0";
            //     //获取成功
            //     if (
            //         realVer == msg.data.version &&
            //         curTime > msg.data.start &&
            //         curTime < msg.data.end
            //     ) {
                    sceneMgr.sendCreateView(ViewProtocol.NoticeView, [url, callback]);
            //     } else {
            //         if (callback) {
            //             callback();
            //         }
            //     }
            // } else {
            //     if (callback) {
            //         callback();
            //     }
                // GlobalFunction.ShowMsgTips(GetTranslateCode(29));
            // }
        // } else {
            // GlobalFunction.ShowMsgTips(GetTranslateCode(29));
        // }
    // }, url);
}
}

