
import { _decorator, Component, Node, sp } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('SpineComponentBase')
export class SpineComponentBase extends Component {
  
    @property(sp.Skeleton)
    _spineNode:sp.Skeleton = null;

    private _attachedNodes:[Node] =;

    _isPaused: boolean = false;

    start () {
        // [3]

    }


}