/*
 * @Author: liuguoqing
 * @Date: 2022-03-02 12:53:23
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-04 08:50:24
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
export { FileHelper } from "./data/FileHelper"
export { DataBase } from "./data/DataBase"
export { DataParserBase } from "./data/DataParserBase"

// view
export { viewRegisterMgr } from "../app/views/ViewRegisterMgr"