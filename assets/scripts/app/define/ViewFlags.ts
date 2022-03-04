/*
 * @Author: Gino
 * @Date: 2020-09-26 15:11:46
 * @LastEditTime: 2022-01-12 21:18:45
 * @LastEditors: Gino
 */
// loaderView枚举
export enum ViewFlags {
    TestFightCache,
    FightMain,
    FightPauseView,
    FightNewPauseView,
    FightDoubleView,
    FightAutoView,
    FightStronger,
    LoginMain,
    LoginAccount,
    RegisterAccount,
    ServerList,
    IDCardLayer,
    IDCardWaitTips,
    MainLayer,
    TaskMain,
    TipsLayer,
    CommonRewardPanel,
    CommonNewHeroPanel,
    CommonNewCarPanel,
    CommonGetRewardPanel,
    CommonGetRewardResultPanel,
    CommonRewardItemInfo,
    CommonAccessDescription,
    SignInLayer,
    ShopMainView,
    ShopRewardView,
    SettingLayer,
    CarMainView,
    CarBodyListView,
    TeamUpgradeView,
    CarPartWarehouse,
    CarPartInfoView,
    CarPartAttributeView,
    CarPartUpgradeView,
    CarPartUpStarView,
    CarPartMaterialsView,
    HeroMainView,
    HeroInfoView,
    HeroUpStarView,
    HeroNewStarView,
    HeroAttributeView,
    ScienceMainView,
    ScienceUpgradeView,
    ScienceTotalAdditionView,
    CampMainView,
    CampAdditionView,
    HandbookMainView,
    HandbookInfoView,
    WarPath,
    WarPathTips,
    WarPathReward,
    WarPathAD,
    DoubleBtnDialog,
    AdvertMainView,
    GiftCardView,
    MapPassRankView,
    PlayerInfoView,
    SettingMainView,
    ModifyNameView,
    SystemOpenLayer,
    BattleValueLayer,
    CommonItemInfo,
    CommonCarInfo,
    OffLineReward,
    ResLoading,
    TransLoading,
    FightDescription,
    FightBuffSelect,
    UserAgreement,
    PrivacyPolicy,
    MailMainView,
    MailDetailsView,
    FightChapterRewardView,
    FightHangUpInfoView,
    ShopSupplyBoxInfiView,
    HalfwayRewView,
    FightBuffSplit,
    FightPartsSelect,
    FightReBornUI,
    GloryWayView,
    GloryWayBuyView,
    GloryWayRewardView,
    CarSkillIntroductionView,
    RecordDataLayer,
    BeHitLayer,
    PVPFightMainView,
    PVPFightReadyView,
    NoticeView,
    PVPGameOverView,
    PVPReadChangeView,
    PVPFightKingView,
    PVPRankRewView,
    PVPStrongView,
    PVPMatchView,
    ModifyHeadView,
    CampAddInstructionView,
    PVPRecordView,
    PVPProtectVIew,
    PVPReadyDefenseView,
    PVPKingTipsView,
    PVPReadyRewardBox,
    SupportLayer,
    SupportRewardView,
    SupportDescView,
    PVPRankEndRewView,
    PVPSeasonEndView,
    RechargeMainView,
    PVPReadRewarsView,
    PVPRecycleView,
    FirstTopup,
    ConversionDiamond,
    BattleKingView,
    BattleKingBuyView,
    BattleKingRewardView,
    PVPBuildingUpView,
    PVPBuildingUpRewardView,
    PVPRecordNotifyView,
    CommonBoxSelectUI,
    CommonBoxRandomUI,
}

// 定义非全屏界面不需要隐藏背后的层级
export const HiddenBackground = {};
HiddenBackground["LoginAccount"] = 1;
HiddenBackground["RegisterAccount"] = 1;
HiddenBackground["ServerList"] = 1;
HiddenBackground["SignInLayer"] = 1;
HiddenBackground["SettingLayer"] = 1;
HiddenBackground["CarBodyListView"] = 1;
HiddenBackground["TeamUpgradeView"] = 1;
HiddenBackground["CarPartWarehouse"] = 1;
HiddenBackground["CarPartInfoView"] = 1;
HiddenBackground["CarPartAttributeView"] = 1;
HiddenBackground["CarPartUpgradeView"] = 1;
HiddenBackground["CarPartUpStarView"] = 1;
HiddenBackground["CarPartMaterialsView"] = 1;
HiddenBackground["HeroInfoView"] = 1;
HiddenBackground["HeroUpStarView"] = 1;
HiddenBackground["HeroNewStarView"] = 1;
HiddenBackground["HeroAttributeView"] = 1;
HiddenBackground["ScienceUpgradeView"] = 1;
HiddenBackground["ScienceTotalAdditionView"] = 1;
HiddenBackground["CampMainView"] = 1;
HiddenBackground["CampAdditionView"] = 1;
HiddenBackground["HandbookMainView"] = 1;
HiddenBackground["HandbookInfoView"] = 1;
HiddenBackground["GiftCardView"] = 1;
HiddenBackground["SettingMainView"] = 1;
HiddenBackground["ModifyNameView"] = 1;
HiddenBackground["FightPauseView"] = 1;
HiddenBackground["FightDoubleView"] = 1;
HiddenBackground["FightAutoView"] = 1;
HiddenBackground["FightStronger"] = 1;
HiddenBackground["CommonItemInfo"] = 1;
HiddenBackground["CommonCarInfo"] = 1;
HiddenBackground["WarPathTips"] = 1;
HiddenBackground["WarPathReward"] = 1;
HiddenBackground["OffLineReward"] = 1;
HiddenBackground["CommonRewardPanel"] = 1;
HiddenBackground["CommonNewHeroPanel"] = 1;
HiddenBackground["CommonNewCarPanel"] = 1;
HiddenBackground["TransLoading"] = 1;
HiddenBackground["FightDescription"] = 1;
HiddenBackground["FightBuffSelect"] = 1;
HiddenBackground["UserAgreement"] = 1;
HiddenBackground["PrivacyPolicy"] = 1;
HiddenBackground["MailDetailsView"] = 1;
HiddenBackground["FightChapterRewardView"] = 1;
HiddenBackground["FightHangUpInfoView"] = 1;
HiddenBackground["ShopSupplyBoxInfiView"] = 1;
HiddenBackground["HalfwayRewView"] = 1;
HiddenBackground["FightBuffSplit"] = 1;
HiddenBackground["FightPartsSelect"] = 1;
HiddenBackground["FightReBornUI"] = 1;
HiddenBackground["CarSkillIntroductionView"] = 1;
HiddenBackground["RecordDataLayer"] = 1;
HiddenBackground["NoticeView"] = 1;
HiddenBackground["PVPGameOverView"] = 1;
HiddenBackground["PVPReadChangeView"] = 1;
HiddenBackground["PVPRankRewView"] = 1;
HiddenBackground["PVPStrongView"] = 1;
HiddenBackground["ModifyHeadView"] = 1;
HiddenBackground["IDCardLayer"] = 1;
HiddenBackground["IDCardWaitTips"] = 1;
HiddenBackground["CampAddInstructionView"] = 1;
HiddenBackground["PVPRecordView"] = 1;
HiddenBackground["PVPKingTipsView"] = 1;
HiddenBackground["PVPMatchView"] = 1;
HiddenBackground["PVPReadyRewardBox"] = 1;
HiddenBackground["PlayerInfoView"] = 1;
HiddenBackground["SupportDescView"] = 1;
HiddenBackground["PVPRankEndRewView"] = 1;
HiddenBackground["PVPSeasonEndView"] = 1;
HiddenBackground["CommonRewardItemInfo"] = 1;
HiddenBackground["PVPReadRewarsView"] = 1;
HiddenBackground["FirstTopup"] = 1;
HiddenBackground["GloryWayBuyView"] = 1;
HiddenBackground["GloryWayRewardView"] = 1;
HiddenBackground["ConversionDiamond"] = 1;
HiddenBackground["BattleKingBuyView"] = 1;
HiddenBackground["BattleKingRewardView"] = 1;
HiddenBackground["PVPRecycleView"] = 1;
HiddenBackground["DoubleBtnDialog"] = 1;
HiddenBackground["FightNewPauseView"] = 1;
HiddenBackground["CommonAccessDescription"] = 1;
HiddenBackground["PVPProtectVIew"] = 1;
HiddenBackground["PVPReadyDefenseView"] = 1;
HiddenBackground["PVPBuildingUpView"] = 1;
HiddenBackground["PVPBuildingUpRewardView"] = 1;
HiddenBackground["PVPRecordNotifyView"] = 1;
HiddenBackground["CommonBoxSelectUI"] = 1;
HiddenBackground["CommonBoxRandomUI"] = 1;
