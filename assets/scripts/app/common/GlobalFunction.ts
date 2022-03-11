// import { dataMgr, gameMgr, ModelBase } from "../../framework/yy";
import { director, instantiate, Prefab } from "cc";
import { gameMgr } from "../../framework/core/GameMgr";
import { sceneMgr } from "../../framework/core/SceneMgr";
import { dataMgr } from "../../framework/data/DataMgr";
import { ModelBase } from "../../framework/data/ModelBase";
import { ResourcesLoader } from "../../framework/data/ResourcesLoader";
import { CommonConstructor, DataModuleName, DoubleBtnDialogArgsType} from "../define/ConfigType";
import { ViewProtocol } from "../define/ViewProtocol";


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
    export function getConfig<TMoudleName extends DataModuleName>(dataHandlerName:TMoudleName,namekey?:string|number) {
        return dataMgr.getData(dataHandlerName,namekey);
    }

    /**
     * 
     * @param mdoelName model的名称
     * @returns 获取model
     */
    export function getModel<T extends ModelBase>(modelConstructor: CommonConstructor<T>):T {
        return gameMgr.getModel(modelConstructor);
    }

    export function showMsgTips(tips:string) {
        sceneMgr.sendCreateView(ViewProtocol.Tips, tips)
    }
}

