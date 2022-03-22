/*
 * @Author: liuguoqing
 * @Date: 2022-03-19 11:17:19
 * @LastEditors: liuguoqing
 * @LastEditTime: 2022-03-20 23:09:19
 * @Description: file content
 */
import { JsonAsset } from "cc";
import { Singleton } from "../../../../framework/components/Singleton";
import { FightData } from "./FightData";
import { FightDataBase } from "./FightDataBase";


export let fightDataMgr:FightDataMgr = null;

export class FightDataMgr extends Singleton{
    
    private _reportData:FightDataBase = null;

    public static init(report:JsonAsset){
        fightDataMgr = FightDataMgr.getInstance<FightDataMgr>();
        fightDataMgr._init(report);
    }

    private _init(report:JsonAsset){
        this.parse<FightData>(report)
    }
    
    /**
     * @description 解析战报
     * @param data 战报数据
     */
    public parse<T extends FightDataBase>(report:JsonAsset) {
        let data = new FightDataBase(report);
        this._reportData = data as T;
    }

    /**
     * getFightData
     */
    public getFightData():FightDataBase {
        return this._reportData
    }

    public destory(){
        FightDataMgr.destoryInstance();
    }

    public clear() {
        fightDataMgr = null;
    }
}

class Parent {
    constructor(protected foo: string) { }

    static create(fooProvider: { foo: string }) {
        return new this(fooProvider.foo)
    }
}

// type ClassParameters<T> = T extends new (...args: infer P) => any ? P : never

// const factory = <T extends typeof Parent>(clas: T, args: { foo: ClassParameters<T>[0] }) =>
//     clas.create(args) as InstanceType<T>

// class Child extends Parent {
//     logFoo() {
//         console.log(this.foo);
//     }
// }


// const instance = Child.create({ foo: 'bar' });

// const result = factory(Child, { foo: 'bar' }).logFoo()

// const expectedError = factory(class A { }, { foo: 'bar' }).logFoo()