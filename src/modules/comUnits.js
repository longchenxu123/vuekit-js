import { L_necCodeStringVal, L_decCodeStringVal } from 'lcx_encryption';
/***
 * @description 低版本js 访问深层及对象属性
 * @param {Object} obj - 要访问的对象
 * @param {string} path - 属性路径
 * @param {any} defaultValue - 默认是
 * @returns {any} - 查找到返回的值
 * */
export function _getPathValue(obj, path, defaultValue = undefined) {
  if (!obj || typeof path !== "string") {
    return defaultValue;
  }

  const keys = path.split(".");
  let result = obj;

  for (let key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = result[key];
    } else {
      result = defaultValue;
    }
  }

  return result;
}

/***
 * @description 数值转大写
 * @param {string} input - 要访问的对象
 * @returns {any} - 查找到返回的值
 * */
export function _numberfilter(input) {
  if (input === null || input === undefined) return "零";

  const str = String(input).replace(/^0+/, "").trim();
  if (!/^\d+(\.\d+)?$/.test(str)) return "零";

  const digitChar = "零一二三四五六七八九";
  const unitChar = ["", "十", "百", "千"];
  const bigUnit = ["", "万", "亿", "兆"];

  function convertIntegerPart(numStr) {
    let result = "";
    let zeroFlag = false;
    let unitPos = 0;

    const reversed = numStr.split("").reverse();
    for (let i = 0; i < reversed.length; i++) {
      const digit = parseInt(reversed[i]);
      const unitIndex = i % 4;
      const sectionIndex = Math.floor(i / 4);

      if (digit === 0) {
        zeroFlag = true;
      } else {
        if (zeroFlag) {
          result = digitChar[0] + result;
          zeroFlag = false;
        }
        result = digitChar[digit] + unitChar[unitIndex] + result;
      }

      if (unitIndex === 3 && result[0] !== bigUnit[sectionIndex]) {
        result = bigUnit[sectionIndex] + result;
      }
    }

    result = result.replace(/零+/g, "零");
    result = result.replace(/零(万|亿|兆)/g, "$1");
    result = result.replace(/亿万/, "亿");
    result = result.replace(/零+$/, "");
    if (result.startsWith("一十")) result = result.slice(1); // 处理 10~19 的简化

    return result || "零";
  }

  function convertDecimalPart(decStr) {
    return decStr
      .split("")
      .map((d) => digitChar[parseInt(d)])
      .join("");
  }

  const [integerPart, decimalPart] = str.split(".");
  const integer = convertIntegerPart(integerPart);
  const decimal = decimalPart ? "点" + convertDecimalPart(decimalPart) : "";

  return integer + decimal;
}

/***
 * @description 金额专用函数实现
 * @param {string} input - 要访问的对象
 * @returns {any} - 查找到返回的值
 * */
export function _moneyfilter(input) {
  if (input === null || input === undefined) return "金额错误";

  const num = Number(input);
  if (isNaN(num)) return "金额错误";

  if (Math.abs(num) >= 1e16) return "金额过大"; // 超过兆级别，人工审查

  const digitMap = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
  const unit1 = ["", "拾", "佰", "仟"];
  const unit2 = ["", "万", "亿", "兆"];

  function convertIntegerPart(integerStr) {
    let result = "";
    let len = integerStr.length;
    let zeroFlag = false;
    let unitPos = 0;

    for (let i = 0; i < len; i++) {
      const digit = +integerStr.charAt(i);
      const pos = len - i - 1;
      const unit1Index = pos % 4;
      const unit2Index = Math.floor(pos / 4);

      if (digit === 0) {
        zeroFlag = true;
      } else {
        if (zeroFlag) {
          result += digitMap[0];
          zeroFlag = false;
        }
        result += digitMap[digit] + unit1[unit1Index];
      }

      if (unit1Index === 0 && result.slice(-1) !== unit2[unit2Index]) {
        result += unit2[unit2Index];
      }
    }

    // 清理重复单位和末尾“零”
    result = result.replace(/零+/g, "零");
    result = result.replace(/零(万|亿|兆)/g, "$1");
    result = result.replace(/亿万/, "亿");
    result = result.replace(/零+$/, "");

    return result || "零";
  }

  function convertDecimalPart(decStr) {
    const jiao = +decStr.charAt(0) || 0;
    const fen = +decStr.charAt(1) || 0;

    let result = "";
    if (jiao > 0) result += digitMap[jiao] + "角";
    if (fen > 0) result += digitMap[fen] + "分";

    return result;
  }

  const negative = num < 0;
  const absoluteNum = Math.abs(num);

  const fixedNumStr = absoluteNum.toFixed(2);
  const [intStr, decStr] = fixedNumStr.split(".");

  const intPart = convertIntegerPart(intStr) + "元";
  const decPart = convertDecimalPart(decStr);

  let result = intPart + (decPart ? decPart : "整");
  if (negative) result = "负" + result;

  return result;
}

/***
 * @description 从源对象中选择指定字段构成新对象
 * @param {object} obj - 源对象
 * @param {string[]} keys - 要提取的键
 * @returns {object} - 新对象
 * */
export function _pick(obj, keys) {
  if (typeof obj !== "object" || obj === null || !Array.isArray(keys))
    return {};

  return keys.reduce((res, key) => {
    if (key in obj) res[key] = obj[key];
    return res;
  }, {});
}

/***
 * @description 判断值是否为空 包含 null 、undefined、空数组、空对象、空字符串
 * @param {object} obj - 源对象
 * @returns {boolean} - 返回 true 表示为空
 * */
export function _isEmpty(value) {
  if (value === null || value === undefined) return true;

  if (typeof value === "string" || Array.isArray(value))
    return value.length === 0;

  if (typeof value === "object") return Object.keys(value).length === 0;

  return false;
}


/**
 * @description  格式化时间（自定义格式）
 * 
 * 
 * **/
export function _formatDate(date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') {
  const pad = (n) => (n < 10 ? '0' + n : n);
  const map = {
    YYYY: date.getFullYear(),
    MM: pad(date.getMonth() + 1),
    DD: pad(date.getDate()),
    HH: pad(date.getHours()),
    mm: pad(date.getMinutes()),
    ss: pad(date.getSeconds()),
  };
  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, match => map[match]);
}


/**
 * @description  只执行一次的函数
 * 
 * 
 * **/
export function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      result = fn.apply(this, args);
      called = true;
    }
    return result;
  };
}


/**
 * @description  复制文本到剪贴板
 * 
 * 
 * **/
export function copyToClipboard(text) {
  return navigator.clipboard
    ? navigator.clipboard.writeText(text)
    : new Promise((resolve, reject) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
          document.execCommand('copy');
          resolve();
        } catch (err) {
          reject(err);
        } finally {
          document.body.removeChild(textarea);
        }
      });
}


/**
 * @description  数组按条件分组
 * **/
export function groupBy(arr, fn) {
  return arr.reduce((acc, item) => {
    const key = typeof fn === 'function' ? fn(item) : item[fn];
    (acc[key] = acc[key] || []).push(item);
    return acc;
  }, {});
}


/**
 * @description  支持各种类型的文件（Blob、字符串 URL、Base64）、自动处理文件名和后缀，兼容现代浏览器与部分旧浏览器（如 IE11）
 * **/
export function downloadFile(data, filename = 'download', mimeType = '') {
  try {
    let blob;

    // 如果是 base64 字符串
    if (typeof data === 'string' && data.startsWith('data:')) {
      const arr = data.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      const u8arr = new Uint8Array(bstr.length);
      for (let i = 0; i < bstr.length; i++) u8arr[i] = bstr.charCodeAt(i);
      blob = new Blob([u8arr], { type: mime });
    }
    // 如果是 URL 字符串
    else if (typeof data === 'string') {
      // 远程资源，尝试 fetch 下载
      fetch(data)
        .then(res => res.blob())
        .then(blob => {
          triggerDownload(blob, filename);
        })
        .catch(err => {
          console.error('下载失败', err);
        });
      return;
    }
    // 如果是 Blob 或 File
    else if (data instanceof Blob) {
      blob = data;
    }
    // 其他不支持的类型
    else {
      console.warn('不支持的下载数据类型');
      return;
    }

    triggerDownload(blob, filename);
  } catch (e) {
    console.error('下载出错', e);
  }
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);

  // 兼容 IE11
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}


/**
 * 通用数组交集函数：支持基础类型、对象、数组等复杂结构
 * @param {Array} arr1 
 * @param {Array} arr2 
 * @returns {Array}
 */
 export function deepIntersection(arr1, arr2) {
  const stringify = (v) => JSON.stringify(v, getCircularReplacer());
  const set2 = new Set(arr2.map(stringify));

  return arr1.filter(item => set2.has(stringify(item)));
}


/**
 * 通用数组差集函数：返回 arr1 中有，但 arr2 中没有的项
 * 支持基础类型、对象、数组等复杂结构
 * @param {Array} arr1 
 * @param {Array} arr2 
 * @returns {Array}
 */
 export function deepDifference(arr1, arr2) {
  const stringify = (v) => JSON.stringify(v, getCircularReplacer());
  const set2 = new Set(arr2.map(stringify));

  return arr1.filter(item => !set2.has(stringify(item)));
}



/**
 * 单词首字母大写，其余小写
 * @param {string} str
 * @returns {string}
 */
export function capitalize(str) {
  if (typeof str !== 'string') return '';
  if (!str) return '';

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * 每个单词首字母大写，其他小写（Title Case）
 * @param {string} str
 * @returns {string}
 */
 export function capitalizeWords(str) {
  if (typeof str !== 'string') return '';
  return str
    .split(/\s+/)  // 按空格、制表符等分词
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * 高级首字母大写函数：支持 Unicode、标点符号、混合字符
 * @param {string} str
 * @returns {string}
 */
 export function smartCapitalize(str) {
  if (typeof str !== 'string') return '';

  return str.replace(/\b\p{L}/gu, (match) => match.toUpperCase());
}


/**
 * 判断一个字符串是否是合法 URL（支持绝对 URL）
 * @param {string} str
 * @param {object} options
 * @param {boolean} [options.allowRelative=false] - 是否允许相对 URL（如 /path、./file）
 * @param {boolean} [options.requireProtocol=true] - 是否必须包含 http/https 等协议
 * @returns {boolean}
 */
 export function isValidUrl(str, options = {}) {
  const { allowRelative = false, requireProtocol = true } = options;

  if (typeof str !== 'string' || !str.trim()) return false;

  try {
    const url = new URL(str, 'http://example.com'); // 用于解析相对 URL
    if (requireProtocol && !/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(str)) {
      return false; // 没有协议
    }
    if (!allowRelative && url.origin === 'null') {
      return false; // 是相对地址但不允许
    }
    return true;
  } catch (e) {
    return false;
  }
}




// 处理循环引用
function getCircularReplacer() {
  const seen = new WeakSet();
  return function(key, value) {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return '[Circular]';
      seen.add(value);
    }
    return value;
  };
}

// 处理 "a.b.c" 形式的字段路径
function getValueByPath(obj, path) {
  return path.split('.').reduce((o, key) => o?.[key], obj);
}

/**
 * 通用数组去重函数
 * 支持基础类型、深层结构、自定义规则
 * 
 * @param {Array} arr - 需要去重的数组
 * @param {Function|string} [keySelector] - 可选：用于生成比较 key 的函数或字段名
 * @returns {Array}
 */
 export function deepUnique(arr, keySelector) {
  if (!Array.isArray(arr)) return [];

  const seen = new Set();
  const result = [];

  // 处理 key 获取逻辑
  const getKey = typeof keySelector === 'function'
    ? keySelector
    : typeof keySelector === 'string'
      ? (item) => getValueByPath(item, keySelector)
      : (item) => item;

  for (const item of arr) {
    let rawKey = getKey(item);

    // 对象和数组等复杂结构用 JSON 序列化
    const key = typeof rawKey === 'object' && rawKey !== null
      ? JSON.stringify(rawKey, getCircularReplacer())
      : String(rawKey);

    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }

  return result;
}





/**
 * 字符串裁剪 + 添加省略号
 * @param {string} str - 原始字符串
 * @param {number} maxLength - 最大长度（字符数）
 * @param {object} [options]
 * @param {boolean} [options.preserveWords=false] - 是否避免中途裁剪单词
 * @param {string} [options.ellipsis='...'] - 自定义省略号字符
 * @returns {string}
 */
 export function truncateString(str, maxLength, options = {}) {
  const { preserveWords = false, ellipsis = '...' } = options;

  if (typeof str !== 'string') return '';
  if (typeof maxLength !== 'number' || maxLength <= 0) return '';

  if (str.length <= maxLength) return str;

  const cutoff = maxLength - ellipsis.length;
  if (cutoff <= 0) return ellipsis;

  let truncated = str.slice(0, cutoff);

  if (preserveWords) {
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > 0) {
      truncated = truncated.slice(0, lastSpace);
    }
  }

  return truncated + ellipsis;
}


/**
 * 以视觉宽度为基础进行裁剪，中文算2宽度，英文算1
 * @param {string} str
 * @param {number} maxVisualWidth - 允许的最大视觉宽度
 * @param {object} [options]
 * @param {string} [options.ellipsis='...']
 * @returns {string}
 */
 export function truncateByVisualWidth(str, maxVisualWidth, options = {}) {
  const { ellipsis = '...' } = options;
  const cutoffWidth = maxVisualWidth - getVisualWidth(ellipsis);
  if (cutoffWidth <= 0) return ellipsis;

  let width = 0;
  let result = '';

  for (const char of str) {
    const w = isFullWidth(char) ? 2 : 1;
    if (width + w > cutoffWidth) break;
    result += char;
    width += w;
  }

  return result + ellipsis;
}

function isFullWidth(char) {
  return /[^\x00-\xff]/.test(char); // 中文、日文、韩文、Emoji等
}

function getVisualWidth(str) {
  return Array.from(str).reduce((sum, char) => sum + (isFullWidth(char) ? 2 : 1), 0);
}



function stripSign(num) {
  const str = num.toString().replace(/^0+/, '') || '0';
  return str[0] === '-' ? [str.slice(1), -1] : [str, 1];
}

function compareAbs(a, b) {
  if (a.length !== b.length) return a.length - b.length;
  return a.localeCompare(b);
}



/**
 * 
 * 高精度加法（含负数）
 * 
*/
export function bigIntAdd(a, b) {
  const [aNum, aSign] = stripSign(a);
  const [bNum, bSign] = stripSign(b);

  if (aSign !== bSign) {
    return bigIntSubtract(a, bSign < 0 ? bNum : '-' + bNum);
  }

  let res = '', carry = 0;
  let i = aNum.length - 1, j = bNum.length - 1;

  while (i >= 0 || j >= 0 || carry) {
    const sum = (parseInt(aNum[i--] || '0') + parseInt(bNum[j--] || '0') + carry);
    res = (sum % 10) + res;
    carry = Math.floor(sum / 10);
  }

  return (aSign < 0 ? '-' : '') + res.replace(/^0+/, '') || '0';
}

/**
 * 
 * 高精度减法（含负数）
 * 
*/
export function bigIntSubtract(a, b) {
  const [aNum, aSign] = stripSign(a);
  const [bNum, bSign] = stripSign(b);

  if (aSign !== bSign) {
    return bigIntAdd(a, (bSign < 0 ? '' : '-') + bNum);
  }

  const cmp = compareAbs(aNum, bNum);
  if (cmp === 0) return '0';

  const [big, small, sign] = cmp > 0 ? [aNum, bNum, aSign] : [bNum, aNum, -aSign];
  let res = '', borrow = 0;
  let i = big.length - 1, j = small.length - 1;

  while (i >= 0) {
    let diff = parseInt(big[i]) - (parseInt(small[j--] || '0') + borrow);
    if (diff < 0) {
      diff += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }
    res = diff + res;
    i--;
  }

  return (sign < 0 ? '-' : '') + res.replace(/^0+/, '') || '0';
}


/**
 * 
 * 高精度乘法（含负数）
 * 
*/
export function bigIntMultiply(a, b) {
  const [aNum, aSign] = stripSign(a);
  const [bNum, bSign] = stripSign(b);

  const res = Array(aNum.length + bNum.length).fill(0);

  for (let i = aNum.length - 1; i >= 0; i--) {
    for (let j = bNum.length - 1; j >= 0; j--) {
      const mul = parseInt(aNum[i]) * parseInt(bNum[j]);
      const pos = i + j + 1;
      const sum = mul + res[pos];

      res[pos] = sum % 10;
      res[pos - 1] += Math.floor(sum / 10);
    }
  }

  return (aSign * bSign < 0 ? '-' : '') + res.join('').replace(/^0+/, '') || '0';
}


/**
 * 高精度整数除法（返回商，不含小数）
 * 
*/

export function bigIntDivide(a, b) {
  const [aNum, aSign] = stripSign(a);
  const [bNum, bSign] = stripSign(b);

  if (bNum === '0') throw new Error('除数不能为 0');

  let result = '', remainder = '';

  for (let digit of aNum) {
    remainder += digit;
    remainder = remainder.replace(/^0+/, '') || '0';

    let count = 0;
    while (compareAbs(remainder, bNum) >= 0) {
      remainder = bigIntSubtract(remainder, bNum);
      count++;
    }

    result += count;
  }

  return (aSign * bSign < 0 && result !== '0' ? '-' : '') + result.replace(/^0+/, '') || '0';
}


/**
 * 
 * 获取 window 滚动位置的通用方法
 * 
*/

export function getWindowScrollPosition() {
  // 兼容所有主流浏览器
  return {
    scrollLeft:
      window.pageXOffset !== undefined
        ? window.pageXOffset
        : (document.documentElement || document.body.parentNode || document.body).scrollLeft,
    scrollTop:
      window.pageYOffset !== undefined
        ? window.pageYOffset
        : (document.documentElement || document.body.parentNode || document.body).scrollTop,
  };
}


/**
 * 获取滚动位置 获取任意滚动容器的滚动位置
 * @param {Window|HTMLElement} target - 目标窗口或元素，默认 window
 * @returns {{scrollLeft:number, scrollTop:number}}
 */
 export function getScrollPosition(target = window) {
  if (target === window) {
    return getWindowScrollPosition();
  }
  // 对于普通元素
  if (target instanceof HTMLElement) {
    return {
      scrollLeft: target.scrollLeft,
      scrollTop: target.scrollTop,
    };
  }
  // 防御性返回，避免异常
  return {
    scrollLeft: 0,
    scrollTop: 0,
  };
}



/**
 * 滚动到顶部
 * @param {Window|HTMLElement} target - 目标，默认 window
 * @param {boolean} smooth - 是否平滑滚动，默认 false
 */
export  function scrollToTop(target = window, smooth = false) {
  if (target === window) {
    if ('scrollTo' in window) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: smooth ? 'smooth' : 'auto',
      });
    } else {
      // 兼容旧浏览器
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  } else if (target instanceof HTMLElement) {
    if (smooth && 'scrollTo' in target) {
      target.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } else {
      target.scrollTop = 0;
      target.scrollLeft = 0;
    }
  } else {
    throw new TypeError('目标必须是 window 或 HTMLElement');
  }
}


/**
 * 获取元素相对于文档的绝对位置和尺寸
 * @param {HTMLElement} el - 目标元素
 * @returns {{top:number, left:number, width:number, height:number, right:number, bottom:number}}
 */
 export function getElementPosition(el) {
  if (!(el instanceof HTMLElement)) {
    throw new TypeError('参数必须是 HTMLElement');
  }
  
  const rect = el.getBoundingClientRect();

  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

  const left = rect.left + scrollLeft;
  const top = rect.top + scrollTop;

  return {
    top,
    left,
    width: rect.width,
    height: rect.height,
    right: left + rect.width,
    bottom: top + rect.height,
  };
}


export function _enciphered(val) {
  return L_necCodeStringVal(val)
}

export function _decrypt(val) {
  return L_decCodeStringVal(val)
}


/**
 * 高级异步重试工具
 * @param {Function} asyncFn - 要执行的异步函数（必须返回 Promise）
 * @param {Object} options - 配置项
 * @param {number} [options.retries=3] - 最大重试次数
 * @param {number} [options.delay=1000] - 初始重试延迟（毫秒）
 * @param {boolean} [options.exponentialBackoff=true] - 是否开启指数退避
 * @param {Function} [options.shouldRetry] - 是否应继续重试的判断函数 (err) => boolean
 * @param {Function} [options.onRetry] - 每次重试回调 (err, attempt)
 * @param {number} [options.timeout=0] - 每次执行超时时间（毫秒），0 表示不设置
 * @param {AbortSignal} [options.signal] - 可选的中止信号（支持取消机制）
 * @returns {Promise<*>}
 */
 export async function _retryAsync(
  asyncFn,
  {
    retries = 3,
    delay = 1000,
    exponentialBackoff = true,
    shouldRetry = () => true,
    onRetry = () => {},
    timeout = 0,
    signal,
  } = {}
) {
  let attempt = 0;

  while (attempt <= retries) {
    // 检查是否被取消
    if (signal?.aborted) {
      throw new Error('重试已被取消');
    }

    try {
      const result = await (timeout > 0
        ? promiseWithTimeout(asyncFn(), timeout)
        : asyncFn());

      return result;
    } catch (err) {
      attempt++;

      if (attempt > retries || !shouldRetry(err)) {
        throw err;
      }

      onRetry(err, attempt);

      const waitTime = exponentialBackoff ? delay * Math.pow(2, attempt - 1) : delay;

      await wait(waitTime);

      // 再次检查是否已取消
      if (signal?.aborted) {
        throw new Error('重试已被取消');
      }
    }
  }
}

/**
 * 延迟函数
 * @param {number} ms
 */
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 包装异步任务，加上超时控制
 * @param {Promise} promise
 * @param {number} timeoutMs
 */
function promiseWithTimeout(promise, timeoutMs) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`请求超时（${timeoutMs}ms）`));
    }, timeoutMs);

    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}
