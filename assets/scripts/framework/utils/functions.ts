import { Node, UIOpacity } from "cc"

export default class {
    public static setNodeVisible = (node:Node, isVisible:boolean) => {
        // let opComp = node.addComponent(UIOpacity)
        // opComp.opacity = isVisible ? 255:0

        node.active = isVisible
    }
}