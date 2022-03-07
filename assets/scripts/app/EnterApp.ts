import { gameMgr } from "../framework/yy";
import { Protocol } from "./define/Protocol";
import { ModelReg } from "./model/ModelReg";

/*
 * @Author: liuguoqing
 * @Date: 2022-03-02 16:36:11
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-02 18:00:01
 * @Description: file content
 */
export class EnterApp {
    constructor(parameters) {
        
    }

    loadAllModel() {
        ModelReg.loadAllModel();
    }
}