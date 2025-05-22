/***
 * VueKit 是一个简单好用的 Javascript 开源库 
 * 版本 1.0.0 
 * 作者: lcx
 * 
*/


import { deepClone } from './modules/deepClone';
import { freezeObjectProperties } from './modules/freezeObjectProperties';
import { flatArray , createRandomId} from './modules/flatArray';
import { debounce, advanceDebounce, throttle, throttleOut ,advanceThrottle} from './modules/debounceAndThrottle';
import { _getPathValue , _numberfilter, _pick, _isEmpty, _moneyfilter,
    _formatDate, once, copyToClipboard, downloadFile, deepIntersection,
    capitalize, capitalizeWords, smartCapitalize, isValidUrl,
    deepUnique, truncateString, truncateByVisualWidth,
    bigIntAdd,bigIntSubtract, bigIntMultiply, bigIntDivide,
    getWindowScrollPosition, getScrollPosition, scrollToTop,
    getElementPosition, _enciphered, _decrypt, _retryAsync
} from './modules/comUnits';
import { deepFindTreeNodeDom } from './modules/please';
import { getScrollTop, getViewportSize, removeEvent, getStyle,
    requestAnimFrame, cancelAnimFrame, isSupport, isES6Supported,
    getBrowserInfo, isMobileDevice,isTouchDevice, requestFullscreen,
    exitFullscreen, isFullscreen
} from './modules/compat';

const featrueObj = {
    deepClone,
    freezeObjectProperties,
    flatArray,
    createRandomId,
    debounce,
    advanceDebounce,
    throttle,
    throttleOut,
    advanceThrottle,
    _getPathValue,
    _numberfilter,
    _pick,
    deepFindTreeNodeDom,
    _isEmpty,
    _moneyfilter,
    getScrollTop, getViewportSize, removeEvent, getStyle,
    requestAnimFrame, cancelAnimFrame, isSupport, isES6Supported,
    getBrowserInfo, isMobileDevice,isTouchDevice, requestFullscreen,
    exitFullscreen, isFullscreen,
    _formatDate, once, copyToClipboard, downloadFile, deepIntersection,
    capitalize, capitalizeWords, smartCapitalize, isValidUrl, deepUnique,
    truncateString, truncateByVisualWidth,
    bigIntAdd,bigIntSubtract, bigIntMultiply, bigIntDivide,
    getWindowScrollPosition, getScrollPosition, scrollToTop,
    getElementPosition, _enciphered, _decrypt, _retryAsync
}


;((window, factoryFunObj) => {
    if (typeof define === 'function' && define.amd) { // AMD 模块
        define([], factoryFunObj)
    } else if (typeof module === 'object' && module.exports) { // Commonjs 模块
        module.exports = factoryFunObj();
    } else {
        // 浏览器全局作用域中使用
        window.VueKit = factoryFunObj();
    }
})(
    typeof window !== "undefined" ? window : global,
    function() {
        return featrueObj
    }
)


// es6
export {
    deepClone,
    freezeObjectProperties,
    flatArray,
    createRandomId,
    debounce,
    advanceDebounce,
    throttle,
    throttleOut,
    advanceThrottle,
    _getPathValue,
    _numberfilter,
    _pick,
    deepFindTreeNodeDom,
    _isEmpty,
    _moneyfilter,
    getScrollTop, getViewportSize, removeEvent, getStyle,
    requestAnimFrame, cancelAnimFrame, isSupport, isES6Supported,
    getBrowserInfo, isMobileDevice,isTouchDevice, requestFullscreen,
    exitFullscreen, isFullscreen,
    _formatDate, once, copyToClipboard, downloadFile, deepIntersection,
    capitalize, capitalizeWords, smartCapitalize, isValidUrl, deepUnique,
    truncateString, truncateByVisualWidth,
    bigIntAdd,bigIntSubtract, bigIntMultiply, bigIntDivide,
    getWindowScrollPosition, getScrollPosition, scrollToTop,
    getElementPosition, _enciphered, _decrypt, _retryAsync
};