/*
 * @Author: liuguoqing
 * @Date: 2022-03-04 23:09:26
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-05 15:11:03
 * @Description: file content 
 */
import { Node, UIOpacity } from "cc"

export class functions {
    public static setNodeVisible = (node:Node, isVisible:boolean) => {
        // let opComp = node.addComponent(UIOpacity)
        // opComp.opacity = isVisible ? 255:0

        node.active = isVisible
    }
}