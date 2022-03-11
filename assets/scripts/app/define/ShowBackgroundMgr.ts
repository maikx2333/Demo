
// 定义非全屏界面不需要隐藏背后的层级
export class ShowBackgroundMgr {
    private static _hiddenMap:Map<string,boolean> = new Map<string,boolean>();

    /**
     * 
     * @description 注册隐藏背景页面
     * @param view 界面名称
     */
    public static regShowBackgroundView(view:string){
        ShowBackgroundMgr._hiddenMap.set(view,true);
    }

    /**
     * @description 检测是否界面需要隐藏背景
     * @param view 界面名称
     */
    public static checkIsShowBlackground(view:string):boolean {
        if (ShowBackgroundMgr._hiddenMap.has(view)){
            return true
        }
        return false
    }
}