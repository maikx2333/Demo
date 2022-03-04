import { find, Widget, widgetManager } from "cc";
import { NodeBaseComponent } from "./NodeBaseComponent";

export default class LayerBaseComponent extends NodeBaseComponent {
    onLoad() {
        super.onLoad();
        
        let widget = this.node.addComponent(Widget)
        let rootNode = find("Canvas");
        widget!.alignMode = Widget.AlignMode.ON_WINDOW_RESIZE;
        widget!.alignFlags = widgetManager.AlignFlags.HORIZONTAL | widgetManager.AlignFlags.VERTICAL;
        widget!.target = rootNode;
        widget!.left = 0;
        widget!.right = 0;
        widget!.bottom = 0;
        widget!.top = 0;
        widget.target = rootNode
    }
}