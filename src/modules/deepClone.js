/**
 * @description 深度克隆
 * @param {object} obj  要克隆的对象
 * @returns {object}  一个克隆过后的对象
*/

export function deepClone(obj, hash = new WeakMap()) {
    // 如果obj是null或基本数据类型，直接返回
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    // 如果hash中已经存在该对象的克隆，直接返回
    if (hash.has(obj)) {
        return hash.get(obj);
    }
    // 根据obj的类型创建新的对象或数组
    let cloneObj;
    if (Array.isArray(obj)) {
        cloneObj = [];
    } else {
        cloneObj = Object.create(Object.getPrototypeOf(obj));
    }
    // 将原对象和新创建的克隆对象存入hash
    hash.set(obj, cloneObj);
    // 递归复制对象的属性
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key], hash);
        }
    }
    // 特殊类型处理
    if (obj instanceof Date) {
        cloneObj = new Date(obj);
    } else if (obj instanceof RegExp) {
        cloneObj = new RegExp(obj);
    } else if (obj instanceof Error) {
        cloneObj = new obj.constructor(obj.message);
    }
    return cloneObj;
}