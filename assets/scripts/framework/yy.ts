/*
 * @Author: liuguoqing
 * @Date: 2022-03-02 12:53:23
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-06 15:15:22
 * @Description: file content
 */

// core
export { gameMgr } from "./core/GameMgr";

// net
export { httpMgr, HttpMessage } from "./net/HttpMgr";
export type { HttpCallback } from "./net/HttpMgr";
export { netStateMgr } from "./net/NetStateMgr";
export { socketMgr } from "./net/SocketMgr";
export type { SocketCallback } from "./net/SocketMgr";

// components
export { Singleton } from "./components/Singleton"
export { SingletonMgr } from "./components/SingletonMgr"

// listener
export { modelEventMgr,msgEventMgr,viewEventMgr } from "./listener/EventMgr"
export { Message } from "./listener/Message"

// data
export { ResourcesLoader } from "./data/ResourcesLoader"
export { DataBase } from "./data/DataBase";
export type { DataCallback } from "./data/DataBase";
export { DataParserBase } from "./data/DataParserBase"
export { dataMgr } from "./data/DataMgr"
export { dataRegisterMgr,DataRegisterMgr } from "../app/define/DataRegisterMgr"

// view
export { viewRegisterMgr,ViewRegisterMgr } from "../app/define/ViewRegisterMgr"

// ui
export { TableContentLayer } from "./ui/TableContentLayer"
export { TableLayer } from "./ui/TableLayer"
export { ComponentBase } from "./ui/ComponentBase"
export { LayerBase } from "./ui/LayerBase"

// utils
export { functions } from "./utils/functions"
