/*
 * @Author: liuguoqing
 * @Date: 2022-03-02 17:36:55
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-02 17:36:56
 * @Description: file content
 */
export class Message {
    msgId: number;
    msgData: any;

    // 构造函数
    constructor(id: number, data: any) {
        this.msgId = id;
        this.msgData = data;
    }

    getMsg(key: string) {
        return this[key];
    }

    getData() {
        return this.msgData.msg;
    }

    getRawData() {
        return this.msgData;
    }

    getResultCode() {
        return this.msgData.code;
    }
}
