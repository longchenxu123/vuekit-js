/**
 * @description 节点树默认点击 无论层级有多深
 * @param { HTMLElement } eleDom 要查找的dom
 * @param { String } className 类名
 * @param { Array } storageArr 默认值 可不传
 * @returns { HTMLElement } - 查找到返回的dom节点
 * **/
 export function deepFindTreeNodeDom(eleDom, className = 'el-tree-node', storageArr = []) {
    let ele = eleDom.querySelector('.' + className);
    storageArr.push(ele);
    if (ele && ele.querySelector('.el-tree-node__children')) {
        return deepFindTreeNodeDom(ele, className, storageArr)
    } else {
        storageArr = storageArr.filter(item => Boolean(item));
        return storageArr[storageArr.length - 1]
    }
}