import { Singleton } from "../yy";

class ViewCreatorManager extends Singleton {
    private _creatorList:ViewCreatorBase[];

    constructor() {
        super();
        this._creatorList = [];
    }

    registeredCreator(creator: ViewCreatorBase) {
        creator.onInit()
        this._creatorList.push(creator)
    }
}

export let viewCreatorMgr = (()=>{
    return ViewCreatorManager.getInstance<ViewCreatorManager>();
})();