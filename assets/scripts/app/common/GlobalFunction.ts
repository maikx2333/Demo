import { DoubleBtnDialogArgsType } from "../define/ConfigType";

export namespace GlobalFunction {
    export function ShowDoubleBtnDialog(args:DoubleBtnDialogArgsType){
        //主场景
        // if (director.getScene().name == "Main") {
        //     sceneMgr.openUI(ViewFlags.DoubleBtnDialog, args);
        // } else {
        //     let msgData = new SFMessage(ViewFlags.DoubleBtnDialog, args);
        //     LoaderEventMgr.getInstance().dispatchEvent(msgData);
        // }
    }
}

