/***
 * @author lcx
 * @description 用于扁平化数组 进阶版
 * @param {Object} arrList - 要扁平的数组
 * @param {String} childrenKey - 子集的名称
 * */
export function flatArray(arrList, childrenKey = 'children') {
    if (!Array.isArray(arrList)) {
        throw new Error('flatArray方法第一个参数必须是数组!');
    }

    return arrList.reduce((result, item) => {
        const children = item[childrenKey];
        const rest = Object.fromEntries(
            Object.entries(item).filter(([key]) => key !== childrenKey)
        );
        return [
            ...result,
            rest,
            ...(children && Array.isArray(children) ? flatArray(children, childrenKey) : [])
        ];
    }, []);
}


/**
 * @author lcx
 * @description 生成随机 id
 * */
export function createRandomId() {
    return Number(Math.random().toString().substr(2, 10) + Date.now()).toString(36);
}