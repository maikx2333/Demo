// import { Singleton, ViewCreatorBase } from "../yy";

import { Singleton } from "../components/Singleton";
import { ViewCreatorBase } from "./ViewCreatorBase";

class ViewCreatorManager extends Singleton {
    private _creatorList:ViewCreatorBase[];

    private constructor() {
        super();
        this._creatorList = new Array<ViewCreatorBase>();
    }

    registeredCreator(creator: ViewCreatorBase) {
        creator.onInit()
        this._creatorList.push(creator)
    }

    unregisteredCreator(){
        this._creatorList.forEach((creator) => {
            creator.unRegMsgAll();
        });
    }

    clear(){
        viewCreatorMgr = null;
    }
}

export let viewCreatorMgr = (()=>{
    return ViewCreatorManager.getInstance<ViewCreatorManager>();
})();