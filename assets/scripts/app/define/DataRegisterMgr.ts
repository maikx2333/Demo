import { dataMgr, Singleton } from "../../framework/yy";

type DataModuleName = keyof DataRegisterMgr["DataType"];

export class DataRegisterMgr extends Singleton{
    DataType = {
        Test:{
            "Test":["Test","Raw/map/buff_card",""]
        }
    }


    static loadAllData(doneFunc: () => void) {
        // [名字，文件路径, 文件类型，[index起始值, index结束值] or 名字，解析器]
        // 参数3：文件类型：0单个文件 1技术自动合并的数值 2策划手动合并的数值

        // 需要加载的文件数量：[index起始值, index结束值]  如果1-100就填[1,100],如果单文件就写 ""
        // 解析器：如果和策划沟通后多个文件合并到一个文件需要单独写一个解析器Parser 具体参考demo FightParser
        // ["CarBuff", "Raw/map/buff_card", 0, "", new DefaultParser()],
        // let dataList = [
      
        // ];

        // let drm = dataMgr;
        // let doneFiles = 0;
        // for (let i = 0; i < dataList.length; i++) {
        //     doneFiles++;
        //     const data = dataList[i];
        //     drm.regDataFile(data[0], data[1], data[2], data[4]);
        //     drm.preLoad(data[0], data[3], () => {
        //         doneFiles--;
        //         if (doneFiles == 0) {
        //             doneFunc();
        //         }
        //     });
        // }

    }
}

// ()();
export let dataRegisterMgr = (()=>{
    return DataRegisterMgr.getInstance<DataRegisterMgr>();
})();