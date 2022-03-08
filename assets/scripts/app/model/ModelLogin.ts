import { ModelBase } from "../../framework/data/ModelBase";

export interface LoginData {
    user_id: number;
    user_key: string;
}

export class ModelLogin extends ModelBase {
    constructor() {
        super();
        // this.regMsg(Protocol.Server.game_info)
    }

    getEnterGame():boolean{
        return true
    }

    getLoginData():LoginData{
        return {
            user_id:0,
            user_key:"123"
        }
    }
}
