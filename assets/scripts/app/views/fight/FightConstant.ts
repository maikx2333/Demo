
export namespace FightConstant {
    // 战斗场景层级
    export enum FightLayer {
        FORMATION,//布阵层
        BOTTM_EFFECT,//底层特效层
        ROLE,//角色层
        TOP_EFFECT,//上层特效层
        BOOLD,//数字层
        Dailog,//对话层
    }

    // 单位类型
    export enum FightUnitType {
        Attack,//攻击方
        Defend,//防守方
    }

    // 单位状态
    export enum FightUnitState {
        Stand,//待机
        Run,//跑动
        Jump,//跳跃
        Attack,//攻击
        Skill,//技能
        Retreat,//后撤
        Hit,//受击
        Did,//死亡
    }

    export enum FightUnitSkillState {
        Delay
    }

    export enum FightUnitAction {
        AddPrefab,
        SpineAnimation,//特殊动作指令,每个spine角色不一样
        Delay,//延迟
        HitFly,//预制体,分全体/单体
        GoBack,//受击
    }

    // 战斗事件
    export enum FightEvent {
        Game_Star,
        Game_End,
        Round_Start,
        Round_End,
        Event_Star,
        Event_End
    }
}
