// import {  Director, find, Node, Vec3, Widget, widgetManager } from 'cc';
// import { Protocol } from 'electron';
// import { Singleton } from "../yy";

// class  SceneMgr extends Singleton {

//     _layerMap: Map<string, Node>;
//     _tableLayerMap: Map<Node, String>;
//     _tableLayerStack: Array<Node>;
//     _skipHiddenBackground: any;

    
//     public init(){
//         this._layerMap = new Map()
//         this._tableLayerStack = []
//         this.initAllScence()
//     }

//     private createNode( ): Node {
//         let node = new Node
        
//         let widget = node.addComponent(Widget)
//         let rootNode = find("Canvas");
//         widget!.alignMode = Widget.AlignMode.ON_WINDOW_RESIZE;
//         widget!.alignFlags = widgetManager.AlignFlags.HORIZONTAL | widgetManager.AlignFlags.VERTICAL;
//         widget!.target = rootNode;
//         widget!.left = 0;
//         widget!.right = 0;
//         widget!.bottom = 0;
//         widget!.top = 0;
//         widget.target = rootNode

//         let viewRoot = find("Canvas/views")
//         viewRoot.addChild(node)

//         return node
//     }

//     private initAllScence() {
//         this._layerMap.set("MainGroup", this.createNode()); // 主界面层
//         this._layerMap.set("TableGroup", this.createNode()); // 页卡层
//         this._layerMap.set("NewGuideGroup", this.createNode()); // 新手引导层
//         this._layerMap.set("DialogGroup", this.createNode()); // 对话框层
//         this._layerMap.set("SystemOpenGroup", this.createNode()); // 功能开启层
//         this._layerMap.set("PreLoadingGroup", this.createNode()); // 加载层
//         this._layerMap.set("TipsGroup", this.createNode()); // 弹出提示
//         this._layerMap.set("TouchGroup", this.createNode()); // 触摸反馈
//     }

//     private clear() {
//         let viewRoot = find("Canvas/views")
//         viewRoot.removeAllChildren()
//         this.init()
//     }

//     public pushTableLayer(node:Node, layerName?:string):void {
//         let tableLayer = this._layerMap.get("TableGroup")
//         let childs = tableLayer.children
//         node.name = layerName
//         tableLayer.addChild(node)
//     }

//     /**
//      * @description: 检查当前场景列表是否存在某个界面
//      * @param {string}
//      * @return {[boolean, cc.Node]}
//      */
//      public checkLayerWithName(strNodeName: string): Boolean {
//         let tableLayer = this._layerMap.get("TableGroup")
//         let childs = tableLayer.children

//         childs.forEach(node => {
//             if (node.name == strNodeName) {
//                 return true
//             }
//         });

//         return false
//     }

//     /**
//      * @description:获取当前最高层
//      * @param {null}
//      * @return {cc.Node}
//      */
//      public getCurFrontLayer() {
//          if (this._tableLayerStack.length > 0) {
//              return this._tableLayerStack[this._tableLayerStack.length]
//          }

//          //页卡层没有，取主界面层
//          return this._layerMap.get("MainGroup")[0]
//     }


//     popTableLayer() {
//         let tableLayer = this._tableLayerStack.pop();
//         if (tableLayer) {
//             tableLayer.removeFromParent();
//             tableLayer.destroy();

//             this._hideTableLayer();
//             // SFSceneTriggerMgr.getInstance().check();
//             return true;
//         }
//         return false;
//     }
// }