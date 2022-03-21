/**
 * @example
 * ```
 * var array = [0, 1, 2, 3, 4];
 * var iterator = new MutableForwardIterator<number>(array);
 * for (iterator.i = 0; iterator.i < array.length; ++iterator.i) {
 *     var item = array[iterator.i];
 *     ...
 * }
 * ```
 * @description 可变的迭代器，迭代器用于遍历中删除元素 fastRemove / fastRemoveAt 建议慎用，数值顺序会改变
 */
 export default class MutableForwardIterator<T> {
    public i = 0;

    constructor (public array: T[]) {
    }

    get length () {
        return this.array.length;
    }

    set length (value: number) {
        this.array.length = value;
        if (this.i >= value) {
            this.i = value - 1;
        }
    }

    /**
     * 
     * @description 根据值从数组中删除(不改变数组顺序)
     * @param value T 数值元素
     */
    public remove (value: T) {
        const index = this.array.indexOf(value);
        if (index >= 0) {
            this.removeAt(index);
        }
    }

    /**
     * 
     * @description 根据值从数组中删除(不改变数组顺序)
     * @param i number 数组索引
     */
    public removeAt (i: number) {
        this.array.splice(i, 1);

        if (i <= this.i) {
            --this.i;
        }
    }

    /**
     * 
     * @description 根据值从数组中删除(慎用,改变数组顺序)
     * @param value T 数值元素
     */
    public fastRemove (value: T) {
        const index = this.array.indexOf(value);
        if (index >= 0) {
            this.fastRemoveAt(index);
        }
    }

    /**
     * 
     * @description 根据值从数组中删除(慎用,改变数组顺序)
     * @param i number 数组索引
     */
    public fastRemoveAt (i: number) {
        const array = this.array;
        array[i] = array[array.length - 1];
        --array.length;

        if (i <= this.i) {
            --this.i;
        }
    }

    /**
     * @description 判断数组元素是否存在
     * @param value T 数值元素
     */
    public has(value:T):boolean{
        let index = this.array.indexOf(value);
        if (index === -1){
            return false;
        }
        return true
    }

    public push (item: T) {
        this.array.push(item);
    }
}