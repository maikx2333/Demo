import fs from 'fs-extra';
import { AssetInfo } from '../../../@types/packages/asset-db/@types/public';
module.exports = {

    onShow(data:any){
        return {
            enable:true,//如果为false，菜单变灰且不可以点击
            visible:true//如果为false，直接不显示菜单
        }
    },

    /**
     * @description 点击菜单时
     * @param data {name:string,info | uuid:string}
     */
    onClick(data:any){
        let dir = <string>data.info.url;
        if (dir !== "db://assets/resources") {
            console.warn("自定义创建Assets 文件夹(系统),只允许在assets/resources目录下使用!");
            return
        }
        createSystemFolder(dir);
    },
}

async function createSystemFolder(dir:string) {
    let systemDir = dir+"/SystemFolders";
    let isExist:AssetInfo[] = await Editor.Message.request("asset-db","query-assets",{pattern:systemDir});
    if (isExist.length > 0) {
        return console.warn("自定义创建Assets 文件夹(系统),只允许在assets/resources/SystemFolders目录已存在!");
    }
    
    let res:AssetInfo = await Editor.Message.request("asset-db","create-asset",systemDir,null,{rename:true});
    if (res.isDirectory){
        await Editor.Message.request("asset-db","create-asset",systemDir+"/avs",null,{rename:true});
        await Editor.Message.request("asset-db","create-asset",systemDir+"/datas",null,{rename:true});
        await Editor.Message.request("asset-db","create-asset",systemDir+"/pics",null,{rename:true});
        await Editor.Message.request("asset-db","create-asset",systemDir+"/prefabs",null,{rename:true});
        await Editor.Message.request("asset-db","create-asset",systemDir+"/animations",null,{rename:true});
    }

    console.log("完成自定义创建Assets 文件夹(系统)!");
    console.log("%sSystemFolder目录名称需要自己手动更改!",dir);
}