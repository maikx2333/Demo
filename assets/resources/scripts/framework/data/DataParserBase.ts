/*
 * @Author: liuguoqing
 * @Date: 2022-03-03 09:05:47
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-03 09:05:48
 * @Description: file content
 */
export class DataParserBase {
    // 处理合并数值文件读取
    // 0。单文件
    // 1。多个文件合并一个
    // 2。全部文件合并一个文件
    getMergeFileName( dataName: string, matchStr: string, namekey: number | string): [number, string] {
        let fileName = matchStr + namekey;
        return [0, fileName];
    }

    // 解析翻译
    // 只会在读取Json数值表的时候才会解析一次翻译表，解析完就永久缓存起来
    parse(jsonObject: any, dataName: string, namekey: string) {
        return jsonObject;
    }
}