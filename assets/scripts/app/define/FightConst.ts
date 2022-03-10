//战斗action类型，别随便修改，对应技能编辑器数据
export enum FightActionType{
    delay = 0, //延迟
    move, //移动
}

export const FightActionTypeName = new Map()
FightActionTypeName.set(FightActionType.delay, "延迟")
FightActionTypeName.set(FightActionType.move, "移动")

// FightActionTypeName[FightActionType.delay] = "延迟"
// FightActionTypeName[FightActionType.delay] = "移动"