import { Asset, instantiate, Prefab } from "cc";
import { ResourcesLoader } from "../../../../framework/data/ResourcesLoader";
import { viewRegisterMgr } from "../../../define/ViewRegisterMgr";
import { FightLayerBase } from "./FightLayerBase";

export class FomationLayer extends FightLayerBase {

    public async init(){
        let prefab = await this._loadPrefab();
        let node = instantiate(prefab);
        this.node.addChild(node);
    }

    private async _loadPrefab():Promise<Prefab> {
        let viewInfo = viewRegisterMgr.getViewInfo("formation","FormationView");
        return ResourcesLoader.loadPromise(viewInfo.Path,Prefab);
    }
}