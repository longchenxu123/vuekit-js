// compat.js

/**
 * 获取页面滚动高度（兼容各种浏览器）
 */
 export function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }
  
  /**
   * 获取视口宽高（兼容）
   */
  export function getViewportSize() {
    return {
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    };
  }
  
  /**
   * 注册事件监听器（兼容 IE）
   */
  export function addEvent(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, handler);
    } else {
      element['on' + type] = handler;
    }
  }
  
  /**
   * 移除事件监听器（兼容 IE）
   */
  export function removeEvent(element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, handler);
    } else {
      element['on' + type] = null;
    }
  }
  
  /**
   * 获取元素样式（兼容 IE）
   */
  export function getStyle(element, prop) {
    if (window.getComputedStyle) {
      return window.getComputedStyle(element, null)[prop];
    } else {
      return element.currentStyle ? element.currentStyle[prop] : undefined;
    }
  }
  
  /**
   * requestAnimationFrame 兼容处理
   */
  export const requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           function (callback) {
             return window.setTimeout(callback, 1000 / 60);
           };
  })();
  
  /**
   * cancelAnimationFrame 兼容处理
   */
  export const cancelAnimFrame = (function () {
    return window.cancelAnimationFrame ||
           window.webkitCancelAnimationFrame ||
           window.mozCancelAnimationFrame ||
           function (id) {
             clearTimeout(id);
           };
  })();
  
  /**
   * 判断浏览器是否支持某个 API / 属性
   */
  export function isSupport(feature) {
    return feature in window || feature in document;
  }
  
  /**
   * 判断是否支持 ES6 箭头函数（间接判断 ES6）
   */
  export function isES6Supported() {
    try {
      new Function("(a = 0) => a");
      return true;
    } catch (e) {
      return false;
    }
  }
  
  /**
   * 获取浏览器信息（简单版本）
   */
  export function getBrowserInfo() {
    const ua = navigator.userAgent;
    if (/MSIE|Trident/.test(ua)) return 'IE';
    if (/Edg\//.test(ua)) return 'Edge';
    if (/Chrome/.test(ua)) return 'Chrome';
    if (/Safari/.test(ua) && !/Chrome/.test(ua)) return 'Safari';
    if (/Firefox/.test(ua)) return 'Firefox';
    return 'Unknown';
  }
  
  /**
   * 判断是否是移动端设备
   */
  export function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
  }
  
  /**
   * 判断当前是否为触摸设备
   */
  export function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }
  
  /**
   * 获取兼容的全屏 API
   */
  export function requestFullscreen(el) {
    const dom = el || document.documentElement;
    if (dom.requestFullscreen) return dom.requestFullscreen();
    if (dom.webkitRequestFullscreen) return dom.webkitRequestFullscreen();
    if (dom.mozRequestFullScreen) return dom.mozRequestFullScreen();
    if (dom.msRequestFullscreen) return dom.msRequestFullscreen();
  }
  
  /**
   * 退出全屏
   */
  export function exitFullscreen() {
    if (document.exitFullscreen) return document.exitFullscreen();
    if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
    if (document.mozCancelFullScreen) return document.mozCancelFullScreen();
    if (document.msExitFullscreen) return document.msExitFullscreen();
  }
  
  /**
   * 判断是否处于全屏状态
   */
  export function isFullscreen() {
    return document.fullscreenElement ||
           document.webkitFullscreenElement ||
           document.mozFullScreenElement ||
           document.msFullscreenElement ||
           false;
  }  