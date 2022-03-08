import { DataParserBase } from "../../framework/data/DataParserBase";

export class Test_Parser extends DataParserBase {
    parse(jsonObject: any, dataHandlerName: string, namekey: string) {
        if (dataHandlerName == "Test"){
            jsonObject.test = "你好!"
        }
        return jsonObject
    }
}