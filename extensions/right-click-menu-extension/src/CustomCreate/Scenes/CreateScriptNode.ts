import { Node } from 'cc';
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
        createScriptNode(data.uuid);
    },
}

async function createScriptNode(uuid:string) {
    const result = await Editor.Message.request('scene', 'query-node-tree', uuid);
    let isExist = false;
    find(result,(nm:string)=>{
        if (nm == "ScriptNode"){
            isExist = true;
        }
    });    
    if (isExist){
        return console.warn("当前场景中已存在ScriptNode");
    }

    // 创建scrip node
    const options: CreateNodeOptions = {
        parent: uuid,
        name: 'ScriptNode'
    };
    
    await Editor.Message.request('scene', 'create-node', options);
    console.log("创建ScriptNode成功!");
    
    await Editor.Message.request('scene', 'save-scene');
    
}

function find(node:NodeResult,callback:(nm:string)=>void) {
    node.children.forEach(n => {
        return find(n,callback);
    });

    callback(node.name);
}

interface NodeResult {
    name:string;
    children:Array<NodeResult>;
}

interface CreateNodeOptions {
    // Name of extension
    parent: string;
    name: string;
}