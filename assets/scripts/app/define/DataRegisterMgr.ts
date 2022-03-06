/*
 * @Author: liuguoqing
 * @Date: 2022-03-04 23:09:26
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-06 15:24:31
 * @Description: file content
 */
import { dataMgr, Singleton } from "../../framework/yy";

export class DataRegisterMgr extends Singleton{
    DataType = {
        Test:["Test","Raw/map/buff_card"]
    }

    loadAllData(doneFunc: () => void) {
        let length = Object.keys(this.DataType).length;
        for (const key in this.DataType) {
            if (Object.prototype.hasOwnProperty.call(this.DataType, key)) {
                const value = this.DataType[key];
                let dataHandlerName = value[0]
                let path = value[1]
                let paser = value[2]
                dataMgr.registerDataFile(dataHandlerName,path,paser)
                dataMgr.loadData(dataHandlerName,(isDone:boolean)=>{
                    length--;
                    if (length == 0){
                        if (doneFunc) {
                            doneFunc()
                        }
                    }
                })     
            }
        }
    }
}

// ()();
export let dataRegisterMgr = (()=>{
    return DataRegisterMgr.getInstance<DataRegisterMgr>();
})();