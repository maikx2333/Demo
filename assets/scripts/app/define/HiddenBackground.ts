import { ViewProtocol } from "./ViewProtocol";

// 定义非全屏界面不需要隐藏背后的层级
export const HiddenBackground = {};
HiddenBackground[ViewProtocol.LoginView] = 1;
