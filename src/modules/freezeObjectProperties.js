
/**
 * @author lcx
 * @description 针对 数组 和 对象 的优化方案 
 * @param obj 原始处理的数组对象
 * @param reactiveKeys 要处理的属性数组
 */
export function freezeObjectProperties(obj, reactiveKeys) {
    if (typeof obj !== 'object' || !Array.isArray(obj)) {
        throw new Error('freezeObjectProperties方法, 第一个参数需对象或数组');
    }

    if (!Array.isArray(reactiveKeys)) {
        return Object.freeze(obj);
    }

    if (Array.isArray(obj)) {
        for (let item of obj) {
            let keyArr = Object.keys(item);
            for (let key of keyArr) {
                if (Array.isArray(item[key])) {
                    freezeObjectProperties(item[key], reactiveKeys)
                } else if (reactiveKeys.indexOf(key) === -1) {
                    Object.defineProperty(item, key, {
                        value: item[key],
                        configurable:false,
                    })
                }
            }
        }
    } else {
        for (let key in obj) {
            if (typeof obj[key] === 'object') {
                freezeObjectProperties(obj[key], reactiveKeys)
            } else {
                if (reactiveKeys.indexOf(key) === -1) {
                    Object.defineProperty(obj, key, {
                        value: obj[key],
                        configurable:false,
                    })
                }
            }
        }
    }
}