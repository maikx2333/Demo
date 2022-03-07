/*
 * @Author: Gino
 * @Date: 2020-11-06 20:48:44
 * @LastEditTime: 2021-12-23 15:15:26
 * @LastEditors: Gino
 */

import { gameMgr } from "../../framework/yy";
import { ModelLogin } from "./ModelLogin";

export class ModelReg {
    static loadAllModel() {
        let gmr = gameMgr
        gmr.registerModel(new ModelLogin(), "ModelLogin");
    }
}
