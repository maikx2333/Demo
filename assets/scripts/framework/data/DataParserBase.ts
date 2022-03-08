/*
 * @Author: liuguoqing
 * @Date: 2022-03-03 09:05:47
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-05 14:24:13
 * @Description: file content
 */
// 解析翻译
export class DataParserBase {
    // 只会在读取Json数值表的时候才会解析一次翻译表，解析完就永久缓存起来
    parse(jsonObject: any, dataHandlerName: string, namekey: string) {
        return jsonObject;
    }
}