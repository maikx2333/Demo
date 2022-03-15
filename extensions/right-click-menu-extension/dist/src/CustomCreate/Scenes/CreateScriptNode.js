"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    onShow(data) {
        return {
            enable: true,
            visible: true //如果为false，直接不显示菜单
        };
    },
    /**
     * @description 点击菜单时
     * @param data {name:string,info | uuid:string}
     */
    onClick(data) {
        createScriptNode(data.uuid);
    },
};
async function createScriptNode(uuid) {
    const result = await Editor.Message.request('scene', 'query-node-tree', uuid);
    let isExist = false;
    find(result, (nm) => {
        if (nm == "ScriptNode") {
            isExist = true;
        }
    });
    if (isExist) {
        return console.warn("当前场景中已存在ScriptNode");
    }
    // 创建scrip node
    const options = {
        parent: uuid,
        name: 'ScriptNode'
    };
    await Editor.Message.request('scene', 'create-node', options);
    console.log("创建ScriptNode成功!");
    await Editor.Message.request('scene', 'save-scene');
}
function find(node, callback) {
    node.children.forEach(n => {
        return find(n, callback);
    });
    callback(node.name);
}
