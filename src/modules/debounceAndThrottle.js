/***
 * @description 基础版防抖函数 (立即执行/延迟执行)
 * @param {Function} fu - 要防抖的函数
 * @param {number} wait - 等待的时间(毫秒)
 * @param {boolean} immediate - 是否立即执行
 * @returns {Function} - 防抖后的函数
 * */
export function debounce(fu, wait = 300, immediate = false) {
    let timer = null;
    return function(...args) {
        if (timer) clearTimeout(timer);

        if (immediate) {
            const call = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, wait);

            if (call) {
                fu.apply(this, args)
            }
        } else {
            timer = setTimeout(() => {
                fu.apply(this, args)
            }, wait);
        }
    }
}


/***
 * @description 高级版防抖函数 (立即执行/延迟执行) 带取消和flush功能
 * @param {Function} fu - 要防抖的函数
 * @param {number} wait - 等待的时间(毫秒)
 * @param {boolean} immediate - 是否立即执行
 * @returns {Function} - 防抖后的函数
 * */

export function advanceDebounce(fu, wait = 300, immediate = false) {
    let timer = null;
    let lastArg = null;
    let lastThis = null;

    function later() {
        const context = lastThis;
        const args = lastArg;

        lastArg = lastThis = this;
        if (!immediate) {
            fu.apply(context, args)
        }
    }

    const debounce = function(...args) {
        lastArg = args;
        lastThis = this;
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(later, wait);
        if (immediate && !wait) {
            fu.apply(this, args);
        }
    }
    debounce.cancel = function() {
        if (timer) {
            clearTimeout(timer);
            timer = lastArg = lastThis = null;
        }
    }
    debounce.flush = function() {
        if (timer) {
            later();
            timer = lastArg = lastThis = null;
        }
    }
    return debounce;
}


/***
 * @description 基础节流函数 (时间戳)
 * @param {Function} fu - 要防抖的函数
 * @param {number} limit - 限制时间(毫秒)
 * @returns {Function} - 防抖后的函数
 * */
export function throttle(fu, limit = 300) {
    let lastExecTime = 0;

    return function(...args) {
        const now = Date.now();

        if (now - lastExecTime >= limit) {
            fu.apply(this, args);
            lastExecTime = now;
        }
    }
}


/***
 * @description 定时器方式 (最后一次一定执行)
 * @param {Function} fu - 要防抖的函数
 * @param {number} limit - 限制时间(毫秒)
 * @returns {Function} - 防抖后的函数
 * */
 export function throttleOut(fu, limit = 300) {
    let timer = null;

    return function(...args) {
        const context = this;
        if (!timer) {
            timer = setTimeout(() => {
                fu.apply(context, args);
                timer = null;
            },limit)
        }
    }
 }
 

 /***
 * @description 进阶版 (立即执行 + 最后一次一定执行)
 * @param {Function} fu - 要防抖的函数
 * @param {number} limit - 限制时间(毫秒)
 * @returns {Function} - 防抖后的函数
 * */
export function advanceThrottle(fu, limit = 300) {
    let timer = null;
    let lastTime = 0;

    return function(...args) {
        const context = this;
        const now = Date.now();

        const remaining = limit - (now - lastTime);
        
        clearTimeout(timer);

        if (remaining <= 0) {
            fu.apply(context, args);
            lastTime = now;
        } else {
            timer = setTimeout(() => {
                fu.apply(context, args);
                lastTime = Date.now();
            }, remaining)
        }
    }
}