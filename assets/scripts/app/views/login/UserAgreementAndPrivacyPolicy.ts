
import { EventTouch, _decorator } from 'cc';
import { sceneMgr } from '../../../framework/core/SceneMgr';
import { ComponentBase } from '../../../framework/ui/ComponentBase';
import { ViewProtocol } from '../../define/ViewProtocol';
const { ccclass, property } = _decorator;
 
@ccclass('UserAgreementAndPrivacyPolicy')
export class UserAgreementAndPrivacyPolicy extends ComponentBase {
 
    start () {
        
    }

    clickUserAgreement(event:EventTouch, customEventData:string) {
        sceneMgr.sendCreateView(ViewProtocol.UserAgreementLayer);
    }

    clickPrivacyPolicy(event:EventTouch, customEventData:string) {
        sceneMgr.sendCreateView(ViewProtocol.PrivacyPolicyLayer);
    }
}